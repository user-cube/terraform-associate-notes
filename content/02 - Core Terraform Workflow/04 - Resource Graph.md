---
title: "04 - Resource Graph"
description: "How Terraform builds a dependency graph to determine execution order, parallelism, and resource dependencies."
tags:
  - terraform
  - workflow
---

When `terraform plan` runs, Terraform builds a **resource graph** under the hood — a dependency graph that identifies the order in which resources must be created, modified, or destroyed.

When you reference one resource inside another, you are telling Terraform that a connection exists between them and that a specific execution order is required.

---

## Why the Graph Matters

- **File order is irrelevant** — the order of resource blocks inside a `.tf` file does not matter; Terraform uses the graph to determine the correct execution sequence
- **Parallel execution** — if two resources have no dependency between them, Terraform can create them simultaneously
- **Foundation for understanding dependencies** — the graph is the underlying mechanism behind all resource relationships

---

## Implicit vs Explicit Dependencies

### Implicit Dependencies

Created **automatically** by referencing one resource inside another. Terraform detects the reference and infers the dependency.

```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id   # implicit dependency on aws_vpc.main
  cidr_block = "10.0.1.0/24"
}
```

Terraform sees that `aws_subnet.public` references `aws_vpc.main.id` and automatically ensures the VPC is created first.

### Explicit Dependencies

Defined **manually** using the `depends_on` meta-argument. Used when a dependency exists that Terraform cannot detect through references alone — for example, when a resource depends on the *side effects* of another.

```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-app-data"
}

resource "aws_iam_role_policy" "read_data" {
  name   = "read-data"
  role   = aws_iam_role.app.id
  policy = data.aws_iam_policy_document.read.json

  depends_on = [aws_s3_bucket.data]   # explicit dependency
}
```

> [!tip] Prefer implicit over explicit
> If you can express a dependency through a reference, do so — it is cleaner and more readable. Reserve `depends_on` for cases where no natural reference exists.

---

## Example — Dependency Chain

```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# depends on aws_vpc.main (implicit)
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

# depends on aws_subnet.public (implicit)
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public.id
}

# no dependency on any of the above — created in parallel
resource "aws_s3_bucket" "assets" {
  bucket = "my-app-assets"
}
```

Execution order Terraform derives from the graph:

```
aws_vpc.main
    └── aws_subnet.public
            └── aws_instance.web

aws_s3_bucket.assets   ← created in parallel with aws_vpc.main
```

---

## Parallelism

By default Terraform performs a maximum of **10 operations in parallel**. This can be adjusted with the `-parallelism` flag:

```bash
terraform apply -parallelism=5
```

> [!note] When to use `-parallelism`
> Most users never need to change this. It is mainly useful for **troubleshooting and debugging** — for example, reducing parallelism to isolate a race condition or to avoid hitting API rate limits on a specific provider.

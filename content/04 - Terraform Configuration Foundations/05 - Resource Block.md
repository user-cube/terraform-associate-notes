# Resource Block

A resource block maps a real infrastructure component to a block of Terraform code — the fundamental building block of any Terraform configuration.

Examples by platform:

- **AWS** — Lambda functions, S3 buckets, EKS clusters, EC2 instances
- **Kubernetes** — Pods, PVCs, Secrets, Services
- **GitHub** — Repositories, branches, teams

Resources are the **blueprint** of your infrastructure: they define what gets created and with which configuration. The only thing that changes between resources is the resource type, which depends on the infrastructure component you want to manage.

---

## Syntax

```hcl
resource "<resource_type>" "<resource_name>" {
  argument1 = "value"
  argument2 = "value"
}
```

### Components

- **Resource type** — e.g. `aws_instance`. Determines what infrastructure component Terraform will create. Defined by the provider; always follow the provider's documentation for structure and allowed arguments.
- **Resource name** — e.g. `web`. Must be unique within your Terraform codebase. This is the identifier used to reference the resource across all your configuration files.
- **Arguments** — define how the resource should be created. The provider documentation specifies which are required and which are optional.

---

## Example

```hcl
resource "aws_instance" "web" {
  ami           = "ami-xxxxx"
  instance_type = "t2.small"

  key_name  = "web-key"
  subnet_id = "subnet-xxxx"

  tags = {
    Name = "webserver"
  }
}

resource "aws_instance" "db" {
  ami           = "ami-xxxxx"
  instance_type = "t2.small"

  key_name  = "db-key"
  subnet_id = "subnet-xxxx"

  tags = {
    Name = "db"
  }
}
```

---

## Resource Referencing

Resources can reference each other using the pattern `<resource_type>.<resource_name>.<attribute>`. This becomes increasingly important as your codebase grows, allowing resources to share information without hardcoding values.

```hcl
resource "github_repository" "web" {
  name       = "web"
  visibility = "private"
}

resource "github_branch" "default" {
  repository = github_repository.web.name
  branch     = "main"
}
```

The `aws_instance.web` resource from the example above would be referenced as:

```hcl
aws_instance.web.<attribute>  # e.g. aws_instance.web.public_ip
```

---

## Naming Rules

- Names must be **unique** within the Terraform codebase
- Must start with a **letter or underscore**
- Can contain letters, digits, underscores (`_`), and dashes (`-`)
- Should be **descriptive** — a name like `web` or `db_primary` is far easier to follow than `resource1`

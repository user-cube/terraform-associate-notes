---
title: "03 - Resource Referencing"
description: "How Terraform resources reference each other dynamically."
tags:
  - terraform
  - resources
  - fundamentals
---

# Resource Referencing

Terraform allows resources to reference each other dynamically. Instead of hardcoding values, you can point directly to attributes of other resources — making your code cleaner, less error-prone, and easier to maintain.

For example, when creating a subnet, you can reference the VPC ID from a `aws_vpc` resource you defined elsewhere, rather than copying the value manually.

```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}
```

Here, `aws_subnet.public` references `aws_vpc.main.id` directly — if the VPC ID changes, the subnet picks it up automatically.

## Resource Identifiers

Every resource in Terraform has a unique identifier made up of two parts:

```
<resource_type>.<resource_name>
```

| Part | Example | Description |
|---|---|---|
| `resource_type` | `aws_vpc` | The type of infrastructure resource |
| `resource_name` | `main` | The local name used to reference this resource within the configuration |

To access a specific attribute of a resource:

```
<resource_type>.<resource_name>.<attribute>
```

```hcl
aws_vpc.main.id        # the ID assigned to the VPC after creation
aws_vpc.main.cidr_block  # the CIDR block of the VPC
```

## Automatic Dependency Mapping

When one resource references another, Terraform automatically infers the order in which resources must be created. This is known as the **dependency graph**.

```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id   # Terraform knows this requires aws_vpc.main first
  cidr_block = "10.0.1.0/24"
}
```

In this example, Terraform will always create the VPC before the subnet — no manual ordering required. This makes configurations predictable and safe to apply in any environment.

> [!tip]
> You never need to explicitly define creation order when using resource references. Terraform handles it automatically through the dependency graph.

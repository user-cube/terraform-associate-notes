---
title: "02 - HCL - HashiCorp Configuration Language"
description: "HCL is the language used to write Terraform configuration."
tags:
  - terraform
  - hcl
  - fundamentals
---

# HCL — HashiCorp Configuration Language

HCL is the language we use to communicate with Terraform. It is the **primary interface** for interacting with Terraform and is designed to be simple to read and write.

Terraform is **declarative** — you only need to describe the desired outcome, not the steps to get there. Terraform figures out how to reach that state on its own.

## Syntax

Every HCL configuration is built from **blocks**:

![[blocks.png]]

```hcl
block_type "block_label" "block_label" {
  first_argument  = expression or value
  second_argument = expression or value
  third_argument  = expression or value
}
```

| Element | Description |
|---|---|
| `block_type` | The type of block (e.g. `resource`, `variable`, `output`, `provider`) |
| `block_label` | One or more labels that identify the block (e.g. provider name, resource type, resource name) |
| `argument` | A key-value pair inside the block that configures the resource |

![[resource-composition.png]]

### Example

```hcl
resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name        = var.vpc_name
    Environment = "demo_environment"
    Terraform   = "true"
  }
}
```

- `resource` → block type
- `"aws_vpc"` → first label (resource type)
- `"vpc"` → second label (local name used to reference this resource)
- `cidr_block`, `tags` → arguments

## Style Conventions

| Convention | Detail |
|---|---|
| **Comments** | `#` for single-line comments; also supported for multi-line |
| **Naming** | Use `snake_case` for resource names, variables, and outputs |
| **Indentation** | 2 spaces (no tabs) |
| **Alignment** | Align `=` signs within the same argument group |
| **Blank lines** | Use blank lines inside blocks to group related arguments |

```hcl
resource "aws_vpc" "vpc" {
  # Network configuration
  cidr_block = var.vpc_cidr

  # Metadata
  tags = {
    Name        = var.vpc_name
    Environment = "demo_environment"
    Terraform   = "true"
  }
}
```

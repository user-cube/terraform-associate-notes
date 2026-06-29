# HCL Block Structure

Terraform configuration is written in **HCL (HashiCorp Configuration Language)**, which uses a block-based structure to define infrastructure.

## Why Blocks?

- **Clean and simple** — each block has a single, well-defined purpose
- **Flexible and modular** — only use the blocks you need for your task; nothing is mandatory
- **Reusable** — the same block type can be used multiple times without duplicating or maintaining multiple versions of the same logic

## Common Block Types

### `provider`

Connects your code to the cloud provider you are targeting (AWS, GCP, Azure, etc.).

```hcl
provider "aws" {
  region = "eu-west-1"
}
```

---

### `resource`

Defines the infrastructure Terraform will create, update, or destroy — VMs, databases, networks, etc.

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t3.micro"
}
```

---

### `data`

Fetches information about existing resources that are **not managed** by your Terraform configuration.

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-22.04-amd64-server-*"]
  }
}
```

> Use `data` when you need to reference something that already exists (e.g. a shared VPC, an existing AMI) without importing it into state.

---

### `variable`

Defines reusable input values, avoiding hardcoded values in your configuration.

```hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}
```

Referenced with `var.<name>`:

```hcl
instance_type = var.instance_type
```

---

### `output`

Exposes or shares important information about a resource after deployment.

```hcl
output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.web.public_ip
}
```

Outputs are printed after `terraform apply` and can be read by other modules.

---

### `terraform`

Defines Terraform-specific settings and configuration for the project.

```hcl
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "my-tf-state"
    key    = "prod/terraform.tfstate"
    region = "eu-west-1"
  }
}
```

---

### `module`

References a pre-written group of related resources, allowing you to reuse configuration across projects or environments.

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = "my-vpc"
  cidr = "10.0.0.0/16"
}
```

Modules can come from the [Terraform Registry](https://registry.terraform.io), a Git repo, or a local path.

---

### `import`

Brings existing resources (not yet managed by Terraform) under Terraform management without recreating them.

```hcl
import {
  to = aws_instance.web
  id = "i-0abc123def456"
}
```

> `import` blocks were introduced in Terraform 1.5. Before that, `terraform import` was a CLI-only command. The block approach allows import to be part of your configuration and applied in a single `terraform apply`.

---

## Block Anatomy

Every block follows the same structure:

```
<block_type> "<type_label>" "<name_label>" {
  <argument> = <value>
}
```

Not all blocks require both labels — `terraform` and `provider` often have just one or none:

```hcl
terraform { ... }          # no labels
provider "aws" { ... }     # one label (provider type)
resource "aws_s3_bucket" "my_bucket" { ... }  # two labels
```

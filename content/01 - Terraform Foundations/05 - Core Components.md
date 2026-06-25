---
title: "05 - Core Components"
description: "Overview of the five core components of Terraform: Core, Providers, Resources, State, and Modules."
tags:
  - terraform
  - architecture
---

Terraform is built around five core components that work together to manage infrastructure.

---

## Terraform Core

The **Terraform CLI** itself. It is responsible for understanding what you want to do — reading your configuration files, building a dependency graph, and orchestrating the execution plan. Everything else plugs into Core.

---

## Providers

Providers **extend Terraform's capabilities** and act as a bridge between Terraform and the platforms you want to manage (AWS, Azure, GCP, Kubernetes, etc.).

- Each provider is responsible for **talking directly to the API** of the target platform
- Providers expose resources and data sources that you can use in your configuration
- Installed via `terraform init` and declared in the `terraform` block

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```

---

## Resources

Resources represent the **infrastructure components** you want to build and deploy with Terraform.

- They are the **building blocks of your infrastructure**
- Each resource maps to a real object managed by a provider (e.g. an EC2 instance, an S3 bucket, a DNS record)

```hcl
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-app-bucket"
}
```

---

## State

State is Terraform's **memory** — it keeps track of everything Terraform has created and how those resources are configured.

- Terraform uses state to map your configuration to real-world resources
- It is **mandatory** — Terraform cannot function without it
- By default stored locally in `terraform.tfstate`; in teams it should be stored remotely (e.g. S3, HCP Terraform) with locking enabled

> Without state, Terraform has no way to know what already exists and would attempt to recreate everything on every `apply`.

---

## Modules

Modules are **reusable building blocks** of Terraform configuration.

- They can be shared across teams and called as many times as needed
- The result is always what was previously defined and validated — predictable and consistent
- Modules promote DRY (Don't Repeat Yourself) infrastructure code

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"
}
```

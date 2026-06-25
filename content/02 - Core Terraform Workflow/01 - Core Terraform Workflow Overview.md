---
title: "01 - Core Terraform Workflow Overview"
description: "The three core stages of the Terraform workflow: Write, Plan, and Apply — and the practical steps in between."
tags:
  - terraform
  - workflow
---

The [HashiCorp-defined core workflow](https://developer.hashicorp.com/terraform/intro/core-workflow) consists of three stages:

---

## The Three Core Stages

### 1. Write

Write your declarative configuration — define what infrastructure you want to exist.

```hcl
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = "t3.micro"
}
```

### 2. Plan

Terraform compares your written configuration against what **actually exists** in the current state and shows exactly what will happen — what will be created, updated, or destroyed.

```bash
terraform plan
```

> **Nothing changes at this stage.** This is purely a preview. Use it to review and validate before committing to any changes.

### 3. Apply

Terraform executes the changes described in the plan and brings the real infrastructure in line with your configuration.

```bash
terraform apply
```

---

## The Practical Workflow

While Write → Plan → Apply is the official model, there are intermediate steps required in practice:

```
WRITE → INIT → PLAN → APPLY
```

| Step | Command | Why it's needed |
|---|---|---|
| **Write** | — | Define your desired infrastructure in `.tf` files |
| **Init** | `terraform init` | Download the providers and modules your code depends on — without this, `plan` will fail |
| **Plan** | `terraform plan` | Preview what Terraform will do; review before applying |
| **Apply** | `terraform apply` | Execute the changes and provision the infrastructure |

### Why `init` comes before `plan`

Terraform needs the provider plugins (e.g. the AWS provider) to be present locally before it can parse and evaluate your configuration. Running `terraform init` downloads them into the `.terraform/` directory. This only needs to be done once per working directory, or whenever you add new providers or modules.

---

## Destroy

There is also a fourth command used to tear down all managed resources:

```bash
terraform destroy
```

This is the reverse of `apply` — Terraform removes everything it is tracking in state.

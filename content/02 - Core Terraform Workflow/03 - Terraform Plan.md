---
title: "03 - Terraform Plan"
description: "How terraform plan works, reading the output, and saving plans for deterministic applies."
tags:
  - terraform
  - workflow
  - cli
---

> [!tip] Reference
> [HashiCorp Docs — terraform plan](https://developer.hashicorp.com/terraform/tutorials/cli/plan)

`terraform plan` shows exactly what Terraform will do **without applying any changes** to the infrastructure — this is known as a **dry run**.

> [!important] First contact with the cloud provider
> `terraform plan` is the first step in the workflow that **communicates directly with the cloud provider**. Neither `terraform init` nor writing configuration makes any API calls.

---

## Reading the Output

Terraform uses symbols to indicate what will happen to each resource:

| Symbol | Meaning |
|:---:|---|
| `+` | Resource will be **created** |
| `-` | Resource will be **destroyed** |
| `~` | Resource will be **modified** in place |
| `-/+` | Resource will be **destroyed and recreated** (force replacement) |

---

## Example Output

```bash
terraform plan
```

```
data.aws_ami.ubuntu: Reading...
data.aws_ami.ubuntu: Read complete after 0s [id=ami-055744c75048d8296]

Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # random_pet.instance will be created
  + resource "random_pet" "instance" {
      + id        = (known after apply)
      + length    = 2
      + separator = "-"
    }

  # module.ec2-instance.aws_instance.main will be created
  + resource "aws_instance" "main" {
      # ...
    }

Plan: 4 to add, 0 to change, 0 to destroy.
```

---

## What Happens Under the Hood

1. **Refreshes state** — Terraform reads the current state of your infrastructure to get an accurate baseline
2. **Compares configuration vs reality** — identifies what needs to be created, updated, or destroyed
3. **Generates the execution plan** — shows the diff without touching anything

> [!warning] Removed code = destroyed resource
> If Terraform is managing a resource and you delete its configuration block, `terraform plan` will show that resource scheduled for destruction. Terraform always drives infrastructure towards what is declared — nothing more, nothing less.

---

## Saving a Plan

By default, running `terraform apply` after `terraform plan` is **not guaranteed to apply exactly what the plan showed** — state could have changed in between.

To ensure the apply is an exact match, save the plan to a file:

```bash
terraform plan -out "tfplan"
```

This allows the plan to be:
- **Saved** for later
- **Reviewed** by the team (e.g. in a PR or approval workflow)
- **Applied with confidence** — no surprises

To apply the saved plan:

```bash
terraform apply tfplan
```

> [!tip] CI/CD best practice
> In automated pipelines, always use `-out` to decouple the plan and apply steps. This is the standard pattern in HCP Terraform and most CI/CD workflows.

---
title: "07 - Terraform Validate"
description: "How terraform validate checks configuration syntax and structure without contacting providers."
tags:
  - terraform
  - workflow
  - cli
---

`terraform validate` checks your Terraform configuration for **syntax errors and structural validity** — without making any API calls or connecting to a provider.

---

## What It Does

- Verifies that the configuration is syntactically correct HCL
- Ensures resource blocks, arguments, and references are structurally valid
- Catches errors **before** running `terraform plan` or `terraform apply`

> [!important] Syntax only — not execution
> `terraform validate` does not verify whether your configuration will succeed when applied. It only validates from a syntax and structure perspective. Provider-level errors (invalid resource arguments, missing permissions, non-existent AMIs, etc.) are only caught at plan or apply time.

---

## What It Does Not Do

- Does **not** contact the cloud provider
- Does **not** check if resources exist or if credentials are valid
- Does **not** guarantee a successful `terraform apply`

All validation is done **locally**, using the provider schemas downloaded during `terraform init`.

---

## Requires `terraform init` First

`terraform validate` needs the provider schemas to validate resource configurations. These schemas are downloaded when you run `terraform init` — without them, validate cannot check whether resource arguments are correct for the given provider.

```bash
terraform init
terraform validate
```

---

## Example Output

Valid configuration:

```
Success! The configuration is valid.
```

Invalid configuration:

```
╷
│ Error: Missing required argument
│
│   on main.tf line 5, in resource "aws_instance" "web":
│    5: resource "aws_instance" "web" {
│
│ The argument "ami" is required, but no definition was found.
╵
```

---

## When to Use It

- As a **quick sanity check** after writing or editing configuration
- In **CI/CD pipelines** as an early gate before running plan
- When **refactoring** configuration to catch structural regressions fast

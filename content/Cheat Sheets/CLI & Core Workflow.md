---
title: "CLI & Core Workflow"
description: "Essential Terraform CLI commands, block types, flags, and the core Write → Plan → Apply workflow."
tags:
  - terraform
  - cli
  - cheatsheet
---

## Core Workflow

The standard Terraform developer workflow follows five stages:

| Stage | Command | Description |
|---|---|---|
| **Write** | — | Develop your Terraform configuration files |
| **Init** | `terraform init` | Download providers and modules |
| **Plan** | `terraform plan` | Preview changes before modifying real-world resources |
| **Apply** | `terraform apply` | Execute changes to your infrastructure |
| **Destroy** | `terraform destroy` | Tear down all managed resources |

```
WRITE → INIT → PLAN → APPLY → DESTROY
```

---

## HCL Block Types

| Block | Purpose |
|---|---|
| `resource` | Creates and manages infrastructure objects |
| `data` | Reads existing external data |
| `variable` | Parameterizes configuration |
| `output` | Exposes values after apply |
| `locals` | Computed intermediate values |
| `terraform` | Settings, backend & `required_providers` |
| `module` | Consume repeatable packages |
| `provider` | Configure a provider |

---

## Essential CLI Commands

```bash
terraform init      # Initialize working directory
terraform fmt       # Format files to canonical style
terraform validate  # Check config syntax & logic
terraform plan      # Preview execution plan
terraform apply     # Apply changes to infrastructure
terraform destroy   # Destroy managed resources
terraform output    # Read output values
terraform console   # Interactive expression evaluation
terraform graph     # Generate dependency graph
terraform providers # Show required providers
```

---

## Useful Flags

| Flag | Description |
|---|---|
| `-auto-approve` | Skip confirmation prompt |
| `-target=<resource>` | Apply to specific resource only |
| `-var="key=value"` | Set variable inline |
| `-var-file=<file>` | Load variable file |
| `-refresh-only` | Update state, no infrastructure changes |
| `-out=plan.out` | Save plan to file |

---

## Variable Definition Precedence

Variables are loaded in this order — **later sources override earlier ones**:

```
ENV (TF_VAR_*) → terraform.tfvars → *.auto.tfvars → -var-file flag → -var flag
```

- CLI `-var` and `-var-file` always override file-based and environment definitions
- Auto-loaded files (`*.auto.tfvars`, `terraform.tfvars`) are processed in alphabetical order

---

## Environment Variables

| Variable | Description |
|---|---|
| `TF_LOG` | Log level: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR` |
| `TF_LOG_PATH` | Write logs to a file |
| `TF_VAR_<name>` | Set an input variable |

---

## HCP Terraform (Cloud Backend)

```hcl
terraform {
  cloud {
    organization = "my-org"
    workspaces {
      name = "my-app"
    }
  }
}
```

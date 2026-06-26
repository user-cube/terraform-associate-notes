---
title: "01 - Terraform CLI Introduction"
description: "Overview of the Terraform CLI, command structure, workflow mapping, subcommands, and environment variables."
tags:
  - terraform
  - cli
---

The Terraform CLI ensures **consistency and repeatability** across all workflows. It provides a simple interface for managing infrastructure through commands, and all commands follow the same structural pattern.

---

## Command Structure

Every Terraform command follows the same form:

```bash
terraform <subcommand> [options or flags]
```

| Part | Example | Role |
|---|---|---|
| Invocation point | `terraform` | The CLI binary |
| Subcommand | `plan` | The operation to run |
| Options / flags | `-out=planfile` | Optional modifiers |

Full example:

```bash
terraform plan -out=planfile
```

---

## Workflow Mapping

The core Terraform workflow maps directly to CLI commands:

| Step | Command | Notes |
|---|---|---|
| **Write** | — | No dedicated command; write HCL in your editor |
| | `terraform validate` | Syntax check (requires `init` first) |
| | `terraform fmt` | Auto-format to Terraform style conventions |
| **Init** | `terraform init` | Downloads providers and modules, configures backend |
| **Plan** | `terraform plan` | Preview changes — no infrastructure is modified |
| **Apply** | `terraform apply` | Applies the plan and makes real infrastructure changes |
| **Destroy** | `terraform destroy` | Removes managed infrastructure and clears state entries |

> [!tip] Validate and format before init
> Running `terraform fmt` and `terraform validate` early catches issues before they reach `plan` or `apply`. `validate` needs the provider schemas from `init`, but `fmt` works without it.

---

## Subcommands Reference

| Subcommand | Purpose |
|---|---|
| `apply` | Create or update infrastructure |
| `console` | Interactive expression evaluation |
| `destroy` | Destroy managed infrastructure |
| `fmt` | Reformat configuration to canonical style |
| `force-unlock` | Manually release a stuck state lock |
| `get` | Download and install modules |
| `graph` | Generate a visual dependency graph |
| `import` | Import existing infrastructure into state |
| `init` | Initialize the working directory |
| `login` | Authenticate to HCP Terraform |
| `logout` | Remove stored credentials for HCP Terraform |
| `modules` | Show module calls in the configuration |
| `output` | Show output values from the state |
| `plan` | Preview changes before applying |
| `providers` | Show required providers |
| `show` | Show state or a saved plan |
| `state` | Advanced state management |
| `test` | Run module tests |
| `validate` | Check configuration for syntax errors |
| `version` | Show the Terraform version |
| `workspace` | Manage workspaces |

---

## Environment Variables

Terraform supports environment variables to pass configuration without hardcoding values in `.tf` files. This is useful for:

- Keeping **secrets and credentials** (API keys, access tokens) out of source code
- Changing **Terraform behaviour** without modifying any configuration files

### Logging

```bash
export TF_LOG=DEBUG
```

Controls the verbosity of Terraform's log output. Valid levels: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`.

### Input Variables

```bash
export TF_VAR_something="my-value"
```

Terraform automatically reads `TF_VAR_*` environment variables as input variable values — no need to pass them via `-var` flags or `.tfvars` files.

### Provider Credentials

Many providers read credentials from environment variables, keeping them out of `.tf` files entirely. Example for AWS:

```bash
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
```

> [!tip] Keep secrets out of code
> Environment variables are the standard way to pass sensitive values to Terraform. Never hardcode API keys, passwords, or tokens in `.tf` files — they will end up in version control.

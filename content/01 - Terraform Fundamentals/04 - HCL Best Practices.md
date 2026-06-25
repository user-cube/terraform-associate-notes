---
title: "04 - HCL Best Practices"
description: "Best practices for writing, organising, and maintaining Terraform HCL code."
---

## File Types

Terraform uses two main file extensions:

- **`.tf`** — configuration files (resources, variables, outputs, providers, etc.)
- **`.tfvars`** — variable value files (used to pass values to input variables)

---

## File Organisation

Organise resources into dedicated files by concern. A typical project structure looks like:

```
.
├── main.tf          # Core resources
├── variables.tf     # Input variable declarations
├── outputs.tf       # Output values
├── providers.tf     # Provider configuration
├── versions.tf      # terraform {} block and required_providers
└── terraform.tfvars # Variable values (not committed if sensitive)
```

Keeping outputs in `outputs.tf`, variables in `variables.tf`, etc. makes the codebase predictable and easier to navigate for new team members.

---

## Formatting

Always keep code formatted to canonical style using:

```bash
terraform fmt
```

- Run `terraform fmt -recursive` to format all files in subdirectories
- Run `terraform fmt -check` in CI to fail the pipeline if files are not formatted
- Ideally, the pipeline also applies `terraform fmt` and commits the result automatically if a diff is detected

---

## Validation

After formatting, validate the configuration syntax and logic:

```bash
terraform validate
```

Include this in every CI pipeline alongside `fmt`.

---

## Avoid Hardcoded Values

Prefer variables over hardcoded literals. This makes configurations reusable across environments.

**Avoid:**
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}
```

**Prefer:**
```hcl
variable "ami_id" {
  description = "AMI to use for the web instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.instance_type
}
```

---

## Documentation

Document your code to support long-term maintenance and team onboarding:

- Add `description` to every `variable` and `output` block
- Use inline comments (`#`) to explain non-obvious decisions
- Maintain a `README.md` at the root of each module

```hcl
variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
}

output "instance_id" {
  description = "ID of the provisioned EC2 instance"
  value       = aws_instance.web.id
}
```

---

## Editor Setup

Using the right editor tooling catches issues before you even run Terraform:

- **VS Code** — [HashiCorp Terraform extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform): syntax highlighting, auto-format on save, validation, go-to-definition
- **JetBrains IDEs** — [Terraform & HCL plugin](https://plugins.jetbrains.com/plugin/7808-terraform-and-hcl): linting, autocompletion, refactoring support
- **Neovim / Vim** — `terraform-ls` language server via `nvim-lspconfig`

Configure your editor to **run `terraform fmt` on save** so formatting is never a manual step.

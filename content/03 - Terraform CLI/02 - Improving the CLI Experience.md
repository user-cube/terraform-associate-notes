---
title: "02 - Improving the Terraform CLI Experience"
description: "Built-in help, autocomplete, Oh My Zsh plugin, and terraform fmt for a better local workflow."
tags:
  - terraform
  - cli
---

## Built-in Help

Terraform provides documentation for every command directly in the terminal — no need to leave your local environment.

General help:

```bash
terraform --help
```

Command-specific help:

```bash
terraform plan --help
```

This shows all available flags and options for that subcommand.

---

## Autocomplete

Terraform supports shell autocomplete across most common shells. Install it with:

```bash
terraform -install-autocomplete
```

This adds the necessary completion script to your shell's configuration file.

---

## Oh My Zsh Plugin

For users of [Oh My Zsh](https://ohmyz.sh/), the `terraform` plugin includes autocomplete and a set of useful aliases:

```bash
# Add to your .zshrc plugins list:
plugins=(... terraform)
```

Common aliases provided by the plugin:

| Alias | Command |
|---|---|
| `tfi` | `terraform init` |
| `tfp` | `terraform plan` |
| `tfa` | `terraform apply` |

> [!tip] Editor plugins
> It is also worth installing the relevant Terraform extension for your editor (VS Code, IntelliJ, etc.). These typically provide syntax highlighting, HCL formatting on save, and inline documentation for providers and resources.

---

## `terraform fmt`

`terraform fmt` rewrites your Terraform configuration files to follow the **canonical style and formatting conventions** defined by HashiCorp — indentation, alignment of `=` signs, spacing, etc.

```bash
terraform fmt
```

By default, it only processes `.tf` files in the **current directory**. To also format all subdirectories:

```bash
terraform fmt -recursive
```

### Enforcing Format in CI/CD

Running `terraform fmt` manually is not enough on a team — format drift creeps in over time. The recommended approach is to enforce it in your pipeline:

```bash
terraform fmt -check
```

`-check` exits with a non-zero code if any files are not formatted correctly, without modifying them. Use this to **block merges** when formatting is off.

Two common CI strategies:

| Strategy | How |
|---|---|
| Block the merge | Run `terraform fmt -check` in CI; fail the pipeline if files are unformatted |
| Auto-fix in CI | Run `terraform fmt -recursive` in CI and commit the result |

> [!tip] Recommended approach
> Blocking the merge is generally preferred — it keeps formatting ownership with the author and avoids auto-commits from CI bots.

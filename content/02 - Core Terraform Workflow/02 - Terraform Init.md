---
title: "02 - Terraform Init"
description: "What terraform init does, when to run it, the lock file, and the .terraform directory."
tags:
  - terraform
  - workflow
  - cli
---

> [!tip] Reference
> [HashiCorp Docs — terraform init](https://developer.hashicorp.com/terraform/tutorials/cli/init)

`terraform init` is the **first command to run in every Terraform project** — it is the foundation that everything else depends on.

---

## What It Does

- **Downloads providers and modules** declared in your configuration — the equivalent of fetching your project's dependencies
- **Configures the backend** — defines where state will be stored, whether locally or remotely
- **Creates or updates the lock file** (`.terraform.lock.hcl`) with the exact versions in use

---

## When to Run It

| Situation | Behaviour |
|---|---|
| Starting a new project | Full initialisation |
| Adding a new provider | Downloads the new provider only |
| Removing or updating a provider version | Updates only what changed |
| Adding, removing, or updating a module | Downloads or updates that module only |

Terraform is smart about this — it only touches what has changed and leaves everything else as-is.

---

## The Lock File — `.terraform.lock.hcl`

Terraform **manages this file automatically**. It is created or updated every time `terraform init` runs.

- **Locks the exact versions** of providers in use, ensuring consistency across all environments and team members
- Lives in the **working directory** alongside your `.tf` files
- **Should be committed to version control** — this allows the team to review version changes together, and any version bumps can be audited in pull requests

> [!warning] Never edit this file manually
> It is fully managed by Terraform. To upgrade versions, use `terraform init -upgrade`.

---

## Example — `terraform init -upgrade`

```bash
terraform init -upgrade
```

```
Initializing the backend...
Upgrading modules...
- ec2-instance in modules/aws-ec2-instance
Downloading registry.terraform.io/joatmon08/hello/random 6.0.0 for hello...
- hello in .terraform/modules/hello

Initializing provider plugins...
- Finding hashicorp/aws versions matching "6.2.0"...
- Finding hashicorp/random versions matching ">= 3.0.1, 3.6.1"...
- Using previously-installed hashicorp/aws v6.2.0
- Installing hashicorp/random v3.6.1...
- Installed hashicorp/random v3.6.1 (signed by HashiCorp)

Terraform has made some changes to the provider dependency selections recorded
in the .terraform.lock.hcl file. Review those changes and commit them to your
version control system if they represent changes you intended to make.

Terraform has been successfully initialized!
```

---

## The `.terraform` Directory

`terraform init` also creates a `.terraform/` directory in your working directory:

```
.terraform/
├── modules/
└── providers/
```

| Directory | Purpose |
|---|---|
| `.terraform/providers/` | Cached provider binaries (platform-specific) |
| `.terraform/modules/` | Downloaded module source code |

> [!important] Do not commit `.terraform/` to version control
> - It can be very large depending on the project
> - It is **platform-specific** (different binaries for macOS, Windows, Linux)
> - It can always be recreated by running `terraform init`

Add it to `.gitignore`:

```
.terraform/
```

> [!tip] Troubleshooting tip
> If something inside `.terraform/` becomes corrupted or you want a clean slate, you can safely delete the entire directory and re-run `terraform init` to rebuild it from scratch.

---
title: "05 - Terraform Apply"
description: "How terraform apply works, state locking, apply variants, and best practices."
tags:
  - terraform
  - workflow
  - cli
---

> [!tip] Reference
> [HashiCorp Docs — terraform apply](https://developer.hashicorp.com/terraform/tutorials/cli/apply)

`terraform apply` is where **real changes happen** — Terraform communicates with the provider APIs and the infrastructure is modified.

---

## How It Works

1. **Translates configuration into API calls** — Terraform takes your HCL code and converts it into the appropriate API calls for each provider
2. **Runs a plan first** — by default, `terraform apply` always executes a plan before making any changes
3. **Prompts for confirmation** — after showing the plan, Terraform waits for you to confirm before proceeding
4. **Respects the resource graph** — resources are created, modified, or destroyed in the correct dependency order, with parallelism where possible
5. **Updates state incrementally** — every change (creation, modification, destruction) is reflected in the state file as it happens

---

## State Locking

When `terraform apply` runs, Terraform **locks the state file** for the duration of the operation.

- Prevents simultaneous modifications from multiple people or automated processes
- Avoids state file corruption
- The lock is released automatically when the apply completes or fails

> [!warning] No automatic rollback
> If a resource fails to apply partway through, Terraform does **not** roll back the changes already made. You must decide whether to fix the issue and re-apply, or destroy everything and start fresh.

---

## Apply Variants

### Standard

```bash
terraform apply
```

Runs a fresh plan, shows the output, and prompts for confirmation before applying.

---

### Apply a Saved Plan

```bash
terraform apply myplan.tfplan
```

Applies a previously saved plan file directly — **skips the planning phase entirely** and does not prompt for approval. Guarantees that exactly what was reviewed gets applied.

---

### Auto Approve

```bash
terraform apply -auto-approve
```

Skips the approval prompt but still shows the plan output. More dangerous than the above — use with care.

---

### CI/CD Pipelines

```bash
terraform apply -auto-approve -input=false
```

Combines two flags:
- `-auto-approve` — skips the confirmation prompt
- `-input=false` — disables all interactive prompts, preventing automation from hanging

> [!warning] Use with caution in production
> This combination is intended for **automated workflows where changes have been pre-approved** by a human (e.g. after a plan was reviewed and merged via PR). It should not be used casually by humans applying to production.

---

## Best Practices

### Before Applying

- Carefully review the plan output — never blindly approve
- Confirm you are targeting the correct environment and workspace
- Ensure changes have been tested in lower environments before hitting production

### During Apply

- Re-read the plan shown at the start of the apply
- Watch for any unexpected changes
- Be patient with large apply operations — interrupting mid-apply can leave infrastructure in a partial state

### After Applying

- Verify the changes were applied as expected
- Ensure the updated configuration is committed to version control
- Document significant infrastructure changes for the team

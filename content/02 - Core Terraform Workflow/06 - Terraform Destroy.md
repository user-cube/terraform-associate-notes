---
title: "06 - Terraform Destroy"
description: "How terraform destroy works, destroy methods, targeted destroy, and the resource graph in reverse."
tags:
  - terraform
  - workflow
  - cli
---

> [!tip] Reference
> [HashiCorp Docs — terraform destroy](https://developer.hashicorp.com/terraform/tutorials/oci-get-started/oci-destroy)

`terraform destroy` removes all infrastructure resources managed by Terraform in the current working directory.

> [!warning] Irreversible operation
> Destroyed resources are permanently deleted. Always review the destroy plan carefully before confirming — there is no undo.

---

## Destroy Methods

### `terraform destroy` command

```bash
terraform destroy
```

Generates a destroy plan, shows it, and prompts for confirmation before proceeding. The plan uses the `-` symbol to indicate resources that will be destroyed:

```
Terraform will perform the following actions:

  # oci_core_subnet.dev will be destroyed
  - resource "oci_core_subnet" "dev" {
      - cidr_block   = "172.16.0.0/24" -> null
      - display_name = "Dev subnet" -> null
      ...
    }

  # oci_core_vcn.internal will be destroyed
  - resource "oci_core_vcn" "internal" {
      - cidr_block   = "172.16.0.0/20" -> null
      - display_name = "My internal VCN" -> null
      ...
    }

Plan: 0 to add, 0 to change, 2 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value:
```

---

### Remove the code and run `terraform apply`

An alternative to the `terraform destroy` command — delete the resource block from your `.tf` files and run `terraform apply`. Terraform drives infrastructure towards what is declared; if a resource is no longer in the configuration, it will be destroyed.

> [!tip] Preferred in GitOps workflows
> This approach integrates naturally with version control. The destroy is triggered by the code change, which means it goes through the normal review and approval process rather than being a manual out-of-band command.

---

## Resource Graph in Reverse

Just like `terraform apply`, `terraform destroy` respects the resource graph — but in **reverse creation order**. Resources that depend on others are destroyed first before their dependencies are removed.

```
Creation order:        Destroy order:
aws_vpc.main           aws_instance.web
  └── aws_subnet         └── aws_subnet
        └── aws_instance       └── aws_vpc
```

Resources with no dependencies between them are destroyed **in parallel**.

---

## Targeted Destroy

To destroy a specific resource without affecting everything else:

```bash
terraform destroy -target=<resource_name>
```

Example:

```bash
terraform destroy -target=aws_instance.web
```

> [!warning] Remember to remove the code
> If you destroy a resource with `-target` but leave its configuration block in your `.tf` files, Terraform will attempt to recreate it the next time `terraform apply` runs. Always remove the code for resources you intend to permanently destroy.

---

## State Cleanup

Once resources are destroyed, they are removed from the state file. This keeps the state in sync with the actual infrastructure.

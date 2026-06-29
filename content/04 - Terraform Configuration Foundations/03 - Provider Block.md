# Provider Block

## What is a Provider?

The Terraform core does not know how to interact with cloud providers or their services. Providers act as a **translation interface** between your Terraform code and the target platform — they implement the API calls and authentication required to interact with those platforms.

This model allows Terraform to focus exclusively on its core functionality without dealing with provider-specific details. That separation is what makes Terraform highly powerful and flexible.

Provider blocks are defined in HCL and extend Terraform's capabilities by connecting your code to any API-driven platform. They also define the **scope and boundaries** of what Terraform can manage — each provider brings its own set of resource types and data sources. Without those resources, Terraform would not be able to create or manage infrastructure.

Providers can be maintained by **HashiCorp**, **partners**, or the **community**. Terraform core and providers follow independent release cycles.

---

## Block Syntax

```hcl
provider "name" {
  arg1 = "arg1"
  arg2 = "arg2"
}
```

- **`name`** — must exactly match the provider name as defined by its developers (found in the Terraform Registry documentation)
- **`args`** — arguments specified by the provider to configure it, including authentication

---

## Examples

```hcl
provider "aws" {
  region  = "us-east-2"
  profile = "prod"
}

provider "azurerm" {
  features {}

  tenant_id       = "tenant-id"
  subscription_id = "subscription-id"
  client_id       = "client-id"
  client_secret   = "client-secret"
}
```

---

## Authentication

Credentials should **never be hardcoded** directly in the provider block. Use secure alternatives instead:

- Environment variables
- Shared credentials files (e.g. managed with [SOPS](https://github.com/getsops/sops))
- IAM roles (instance profiles, IRSA, etc.)
- HashiCorp Vault

Each provider implements its own authentication mechanism:

| Provider | Common Auth Method |
|---|---|
| AWS | Access key + secret, or IAM role |
| Azure | Service Principal (client ID + secret) |
| GitHub | Personal access token or OAuth token |

**Best practices:**
- Rotate credentials regularly
- Follow the principle of least privilege
- Implement credentials lifecycle management
- Use a secrets manager rather than files or env vars wherever possible

---

## Provider Lifecycle

Terraform handles provider provisioning automatically through its plugin system — you don't interact with the provider's GitHub repo directly:

1. Terraform reads the provider declared in your configuration
2. Checks the local plugin cache; if not found, downloads from the registry
3. Verifies integrity using checksums
4. Initializes the provider with your configuration

---

## Pinning Provider Versions

Always pin provider versions to ensure your code remains compatible with your codebase over time:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}
```

> Provider versions are pinned in the `terraform` block, not in the `provider` block itself. The `provider` block handles configuration; versioning is a Terraform-level concern.

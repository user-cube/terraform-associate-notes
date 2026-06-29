# Configure Multiple Providers

Terraform supports multiple instances of the same provider in a single configuration. This is useful when you need to work across multiple regions, multiple accounts, or even multiple cloud platforms simultaneously.

Since a provider block is tied to a single configuration (e.g. one AWS region), you use the `alias` argument to define additional instances.

## Defining Aliased Providers

```hcl
provider "aws" {
  alias  = "dev"
  region = "us-east-1"
}

provider "aws" {
  alias  = "prod"
  region = "us-west-1"
}
```

Each aliased provider is fully independent and can have its own configuration — different regions, different accounts, different credentials, etc.

## Using Aliased Providers in Resources

Reference an aliased provider using `provider = <provider_name>.<alias>`:

```hcl
resource "aws_s3_bucket" "dev_bucket" {
  provider = aws.dev
  bucket   = "my-dev-bucket"
}

resource "aws_s3_bucket" "prod_bucket" {
  provider = aws.prod
  bucket   = "my-prod-bucket"
}
```

## Default Provider

If no `alias` is defined, that provider instance becomes the **default**. Resources that don't explicitly specify a `provider` argument will use it automatically:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "my-non-aliased-bucket"
}
```

> When you define aliased providers alongside a default, Terraform uses the un-aliased block as the default. If **all** provider blocks have an alias, there is no default and every resource must explicitly declare which provider to use.

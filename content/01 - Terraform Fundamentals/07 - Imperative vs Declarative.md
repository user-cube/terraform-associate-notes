---
title: "07 - Imperative vs Declarative"
description: "The difference between imperative and declarative approaches to infrastructure, and why Terraform uses declarative."
tags:
  - terraform
  - iac
---

## Imperative

In an **imperative** approach you describe **how to get to the desired result** — you write the steps, in order, that the system must follow.

```bash
# Example: imperative approach with AWS CLI
aws ec2 create-vpc --cidr-block 10.0.0.0/16
aws ec2 create-subnet --vpc-id vpc-123 --cidr-block 10.0.1.0/24
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway ...
```

You are responsible for knowing the current state, handling errors, and ensuring idempotency yourself.

---

## Declarative

In a **declarative** approach you describe **what the final result should look like** — the tool figures out the steps to get there.

```hcl
# Example: declarative approach with Terraform
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}
```

You define the desired end state. Terraform calculates what needs to be created, updated, or destroyed to reach it.

---

## Why Declarative is Easier to Maintain

| | Imperative | Declarative |
|---|---|---|
| Focus | Steps to reach the goal | The goal itself |
| Error-prone | More — order and state matter | Less — idempotent by design |
| Drift detection | Manual | Automatic (`terraform plan`) |
| Readability | Harder to see intent | Configuration = documentation |

- **Simpler to maintain** — you only need to update what you want the result to be, not rewrite the steps
- **Less error-prone** — you don't need to think about ordering, dependencies, or what already exists
- **Idempotent** — running `terraform apply` multiple times always converges to the same state

---

## How Terraform Applies This

With Terraform you only define the desired final state. Terraform then:

1. Reads the current state (from state file)
2. Compares it with your configuration
3. Calculates the diff
4. Applies only the changes needed to reach the desired state

> You never need to write "create this if it doesn't exist, update it if it does, skip it if it's already correct" — Terraform handles all of that automatically.

---

## Native Cloud Tools (Non-Agnostic)

Each major cloud provider offers its own native IaC tool. Unlike Terraform, these are **not cloud-agnostic** — they only work within their own ecosystem:

| Tool | Provider | Approach |
|---|---|---|
| **CloudFormation** | AWS | Declarative (YAML/JSON) |
| **ARM Templates / Bicep** | Azure | Declarative |
| **Deployment Manager** | GCP | Declarative (YAML) |
| **Pulumi** | Multi-cloud | Declarative (code-first) |

The main trade-off: native tools have deeper integration with their respective cloud, but using them locks you into that provider. Terraform's agnostic approach lets you manage resources across multiple clouds with a single workflow.

---

## Complementary Tools

Terraform focuses on **provisioning infrastructure** (creating and managing cloud resources). Other tools complement it by handling what happens *on* that infrastructure:

| Tool | Category | Approach | Role alongside Terraform |
|---|---|---|---|
| **Ansible** | Configuration management | Imperative (playbooks) | Configure OS, install packages, manage services on provisioned VMs |
| **Puppet** | Configuration management | Declarative | Enforce desired state on servers over time |
| **Chef** | Configuration management | Imperative (recipes) | Similar to Ansible, Ruby-based |
| **Packer** | Image building | Declarative | Build machine images (AMIs, etc.) that Terraform then deploys |
| **Helm** | Kubernetes package manager | Declarative | Deploy applications onto Kubernetes clusters provisioned by Terraform |

A common pattern is to use **Terraform to provision the infrastructure** and **Ansible (or similar) to configure it** — each tool doing what it does best.

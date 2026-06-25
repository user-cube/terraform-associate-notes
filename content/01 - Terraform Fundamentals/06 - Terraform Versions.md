---
title: "06 - Terraform Versions"
description: "Overview of the three Terraform flavours: Community, HCP Terraform, and Terraform Enterprise."
tags:
  - terraform
  - hcp
---

Terraform comes in three different flavours, each suited to different use cases and team sizes.

---

## Terraform Community

- **Command-line based** — the open-source CLI tool
- **Free** and available to install locally on any machine
- The foundation that all other flavours are built on

---

## HCP Terraform

> Formerly known as **Terraform Cloud**. HCP stands for **HashiCorp Cloud Platform**.

A **SaaS version** of Terraform that adds collaborative and operational features on top of the community edition:

- **Remote state management** — state is stored and locked centrally, no manual S3/backend setup
- **Private registry** — host and share internal modules and providers across your organisation
- **Policy as code** — enforce compliance rules using Sentinel or OPA before changes are applied
- **Remote runs** — plan and apply execute in HCP's infrastructure, not on your local machine
- **VCS integration** — trigger runs automatically from GitHub, GitLab, etc.

---

## Terraform Enterprise

A **self-hosted** version of Terraform that combines everything from Community and HCP Terraform, but runs **within your own infrastructure** — whether on-premises, private cloud, or public cloud managed by your organisation.

- All the features of HCP Terraform
- Full control over data residency and network access
- Suited to organisations with strict compliance or air-gapped requirements

---

## Comparison

| Feature | Community | HCP Terraform | Enterprise |
|---|:---:|:---:|:---:|
| CLI | ✓ | ✓ | ✓ |
| Remote state | — | ✓ | ✓ |
| Private registry | — | ✓ | ✓ |
| Policy as code | — | ✓ | ✓ |
| Self-hosted | ✓ | — | ✓ |
| Managed by HashiCorp | — | ✓ | — |
| Cost | Free | Free tier + paid | Paid |

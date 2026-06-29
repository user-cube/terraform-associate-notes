---
title: "01 - Terraform File Structure and Organization"
description: "How to structure Terraform projects across multiple files — conventions, common filenames, and generated files."
tags:
  - terraform
  - configuration
  - organization
---

À medida que a infraestrutura cresce, manter todos os recursos, variáveis e outputs num único ficheiro torna-se difícil de ler e manter. A prática comum é dividir o código Terraform em múltiplos ficheiros mais pequenos, agrupados por responsabilidade.

> [!note] O Terraform não impõe nenhuma estrutura de ficheiros
> Os ficheiros `.tf` dentro do mesmo directório são processados em conjunto como se fossem um único ficheiro. Podes referenciar recursos entre ficheiros sem qualquer configuração adicional — o Terraform resolve as dependências automaticamente.

---

## Ficheiros Comuns

| Ficheiro | Conteúdo |
|---|---|
| `main.tf` | Recursos primários da infraestrutura |
| `variables.tf` | Declaração de todas as variáveis de input |
| `outputs.tf` | Outputs para o terminal ou como inputs para outros módulos |
| `providers.tf` | Declaração e configuração dos providers |
| `terraform.tfvars` | Valores atribuídos às variáveis (geralmente no `.gitignore`) |

### Estrutura típica de um projecto

```
.
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── terraform.tfvars
├── .terraform.lock.hcl
└── .terraform/
```

---

## Ficheiros Gerados Automaticamente

### `terraform.tfstate`

Ficheiro de state gerado pelo Terraform para registar o estado actual da infraestrutura gerida. Não é editado manualmente.

> [!note]
> Este ficheiro não existe localmente quando se usa **remote state** (e.g. S3, Terraform Cloud) — o state é guardado e gerido remotamente.

### `terraform.tfstate.backup`

Cópia de segurança do state anterior, criada automaticamente antes de cada `terraform apply`. Permite recuperar o estado caso algo corra mal durante a aplicação.

### `.terraform.lock.hcl`

Regista as versões exactas dos providers instalados, garantindo que toda a equipa usa as mesmas versões.

> [!important] Deve ser incluído no controlo de versões
> Ao contrário do `terraform.tfstate`, o `.terraform.lock.hcl` **deve ser commitado** no repositório para garantir consistência entre ambientes e membros da equipa.

### `.terraform/`

Directório criado pelo `terraform init`. Contém os binários dos providers descarregados e os módulos em cache. Deve ser ignorado pelo `.gitignore`.

---

## `.gitignore` Recomendado

```gitignore
# State files
terraform.tfstate
terraform.tfstate.backup

# Variable values (podem conter dados sensíveis)
*.tfvars
*.tfvars.json

# Provider plugins e cache
.terraform/

# Ficheiros de override (uso local)
override.tf
override.tf.json
*_override.tf
*_override.tf.json
```

> [!warning] `terraform.tfvars` e segredos
> O ficheiro `terraform.tfvars` pode conter valores sensíveis como passwords ou tokens. Garante que está no `.gitignore` antes de fazer o primeiro commit.

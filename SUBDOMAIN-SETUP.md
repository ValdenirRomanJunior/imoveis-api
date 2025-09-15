# Sistema de Subdomínios Automáticos - Standi

## Visão Geral

Este sistema implementa a criação automática de subdomínios na Vercel quando um cliente se cadastra no sistema Standi. Cada cliente recebe automaticamente um subdomínio no formato `[companyName].standi.com.br` e pode adicionar um domínio personalizado.

## Arquitetura

### Backend (Spring Boot)
- **VercelDomainService**: Integração com API da Vercel
- **DomainController**: Endpoints para gerenciar domínios
- **TenantService**: Criação automática de subdomínio no cadastro
- **Account Entity**: Armazena informações de domínio

### Frontend (React)
- **SubdomainRouter**: Detecta subdomínios e roteia adequadamente
- **DomainManager**: Interface para gerenciar domínios personalizados
- **Roteamento**: Suporte a `/site/:companyName` para templates públicos

## Configuração

### 1. Variáveis de Ambiente

Adicione as seguintes variáveis no seu ambiente:

```bash
# Desenvolvimento (application-dev.properties)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_project_id_here
VERCEL_TEAM_ID=your_team_id_here

# Produção (Heroku Config Vars)
VERCEL_TOKEN=seu_token_da_vercel
VERCEL_PROJECT_ID=id_do_projeto_vercel
VERCEL_TEAM_ID=id_do_time_vercel
```

### 2. Configuração da Vercel

#### 2.1 Obter Token da Vercel
1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Crie um novo token com escopo completo
3. Copie o token gerado

#### 2.2 Configurar Domínio Principal
1. No projeto Vercel, adicione o domínio `standi.com.br`
2. Adicione o domínio wildcard `*.standi.com.br`
3. Configure os nameservers para `ns1.vercel-dns.com` e `ns2.vercel-dns.com`

#### 2.3 Obter IDs do Projeto e Time
```bash
# Listar projetos
vercel projects list

# Listar times
vercel teams list
```

### 3. Configuração DNS

Para o domínio principal `standi.com.br`:

```
Tipo: NS
Nome: @
Valor: ns1.vercel-dns.com

Tipo: NS
Nome: @
Valor: ns2.vercel-dns.com
```

## Fluxo de Funcionamento

### 1. Cadastro de Cliente

1. Cliente se cadastra no sistema
2. `TenantService.insert()` é chamado
3. Automaticamente cria subdomínio via `VercelDomainService.createSubdomain()`
4. Subdomínio fica disponível em `[companyName].standi.com.br`

### 2. Acesso ao Site Público

#### Via Subdomínio
- URL: `https://empresa.standi.com.br`
- Redireciona para: `/site/empresa`
- Renderiza: Template público da empresa

#### Via Rota Direta
- URL: `https://standi.com.br/site/empresa`
- Renderiza: Template público da empresa

### 3. Domínio Personalizado

1. Cliente acessa interface de gerenciamento
2. Adiciona domínio personalizado (ex: `meusite.com.br`)
3. Sistema adiciona domínio na Vercel via API
4. Cliente configura DNS apontando para `cname.vercel-dns.com`
5. Sistema verifica e ativa o domínio

## Endpoints da API

### Gerenciamento de Domínios

```http
# Adicionar domínio personalizado
POST /api/domains/custom/{accountId}
Content-Type: application/json
{
  "domain": "meusite.com.br"
}

# Verificar domínio
POST /api/domains/verify/{accountId}
Content-Type: application/json
{
  "domain": "meusite.com.br"
}

# Remover domínio personalizado
DELETE /api/domains/custom/{accountId}
Content-Type: application/json
{
  "domain": "meusite.com.br"
}

# Obter informações de domínio
GET /api/domains/info/{accountId}

# Listar todos os domínios (admin)
GET /api/domains/list
```

## Componentes Frontend

### SubdomainRouter

Detecta automaticamente subdomínios e roteia para o template correto:

```tsx
import SubdomainRouter from '../components/SubdomainRouter';

// Envolver as rotas
<BrowserRouter>
  <SubdomainRouter>
    <Routes>
      {/* suas rotas */}
    </Routes>
  </SubdomainRouter>
</BrowserRouter>
```

### DomainManager

Interface para gerenciar domínios personalizados:

```tsx
import DomainManager from '../components/DomainManager';

// Usar no painel administrativo
<DomainManager accountId={accountId} />
```

## Estrutura de Arquivos

```
backend/
├── src/main/java/com/dynamous/imoveis/
│   ├── services/
│   │   └── VercelDomainService.java
│   ├── controllers/
│   │   └── DomainController.java
│   └── entities/
│       └── Account.java (campos domain, customDomain)
├── src/main/resources/
│   ├── application-dev.properties
│   └── application-prod.properties

frontend/
├── src/
│   ├── components/
│   │   ├── SubdomainRouter.tsx
│   │   └── DomainManager/
│   │       ├── index.tsx
│   │       └── styles.ts
│   ├── pages/Site/
│   │   └── (template público)
│   └── routes/
│       └── index.tsx
```

## Testes

### 1. Teste Local

```bash
# Backend
cd backend
./mvnw spring-boot:run

# Frontend
cd frontend
npm start

# Testar subdomínio localmente
http://localhost:3000/site/empresa
```

### 2. Teste de Produção

1. Deploy na Vercel
2. Cadastrar nova empresa
3. Verificar se subdomínio foi criado
4. Acessar `https://empresa.standi.com.br`

## Troubleshooting

### Problemas Comuns

1. **Subdomínio não criado**
   - Verificar token da Vercel
   - Verificar logs do backend
   - Verificar configuração de DNS

2. **Domínio personalizado não funciona**
   - Verificar configuração CNAME
   - Aguardar propagação DNS (até 48h)
   - Verificar status na Vercel

3. **Roteamento não funciona**
   - Verificar configuração do vercel.json
   - Verificar SubdomainRouter
   - Verificar rotas do React Router

### Logs Importantes

```bash
# Backend - Criação de subdomínio
"Subdomínio criado com sucesso: empresa.standi.com.br"

# Backend - Erro na Vercel
"Erro ao criar subdomínio: [erro]"

# Frontend - Detecção de subdomínio
console.log('Subdomínio detectado:', subdomain);
```

## Segurança

- Token da Vercel deve ser mantido seguro
- Validação de domínios antes de adicionar
- Autenticação necessária para gerenciar domínios
- Rate limiting nas APIs da Vercel

## Monitoramento

- Logs de criação/remoção de domínios
- Métricas de uso de subdomínios
- Alertas para falhas na API da Vercel
- Monitoramento de propagação DNS

## Próximos Passos

1. Implementar cache para consultas de domínio
2. Adicionar métricas e analytics
3. Implementar backup de configurações
4. Adicionar suporte a SSL personalizado
5. Implementar webhook da Vercel para atualizações

---

**Desenvolvido para Standi - Sistema Imobiliário**

Para dúvidas ou suporte, consulte a documentação da API da Vercel: https://vercel.com/docs/rest-api
# 🌐 Configuração de Domínio Personalizado - Standi

## Como Funciona o Sistema Atual

### 📋 Estrutura Atual

**Aplicação Principal:** `https://app.standi.com.br`
- Esta é a aplicação administrativa onde os clientes fazem login
- Contém o painel de controle, cadastro de imóveis, leads, etc.

**Sites Públicos dos Clientes:**
- **Subdomínio padrão:** `https://[slug-cliente].app.standi.com.br`
- **Rota interna:** `/site/:companyName` (para desenvolvimento)
- **Domínio personalizado:** `https://www.cliente.com.br` (configurável)

### 🔄 Fluxo de Detecção de Domínio

O sistema detecta automaticamente como o cliente está acessando:

1. **Subdomínio (padrão):** `cliente1.app.standi.com.br`
   - Extrai o slug "cliente1" do hostname
   - Carrega configurações do tema diretamente

2. **Domínio personalizado:** `www.minhaImobiliaria.com.br`
   - Chama API `/api/accounts/resolve-domain/{domain}`
   - Backend retorna o slug correspondente
   - Carrega configurações do tema usando o slug

3. **Desenvolvimento:** `localhost:3000/site/cliente1`
   - Usa o parâmetro da URL diretamente

## 📝 Passos para o Cliente Configurar Domínio Personalizado

### Pré-requisitos
- ✅ Conta ativa no Standi
- ✅ Domínio próprio registrado
- ✅ Acesso ao painel de DNS do provedor

### Passo 1: Configurar no Painel Standi

1. **Acesse:** `https://app.standi.com.br`
2. **Faça login** com suas credenciais
3. **Navegue para:** Menu → **"Editor de Temas"**
4. **Clique na aba:** **"Configurações"**
5. **Localize o campo:** **"Domínio Personalizado"**
6. **Digite seu domínio:** `www.minhaImobiliaria.com.br`
7. **Clique em:** **"Salvar Alterações"**

### Passo 2: Configurar DNS

#### Opção A: Registro CNAME (Recomendado)
```
Tipo: CNAME
Nome/Host: www
Valor/Destino: [seu-slug].app.standi.com.br
TTL: 3600 (ou padrão)
```

#### Opção B: Registro A (Alternativo)
```
Tipo: A
Nome/Host: www
Valor/IP: [IP do servidor Netlify]
TTL: 3600 (ou padrão)
```

### Passo 3: Configuração por Provedor

#### 🔹 Registro.br
1. Acesse o painel do Registro.br
2. Vá em "DNS" → "Zona DNS"
3. Adicione o registro CNAME conforme acima
4. Salve as alterações

#### 🔹 GoDaddy
1. Acesse "Meus Produtos" → "DNS"
2. Clique em "Adicionar" → "CNAME"
3. Configure conforme especificado
4. Salve

#### 🔹 Cloudflare
1. Acesse o painel do Cloudflare
2. Vá em "DNS" → "Records"
3. Clique "Add record"
4. Configure o CNAME
5. **Importante:** Desative o proxy (nuvem cinza)

#### 🔹 Locaweb
1. Acesse "Painel de Controle" → "DNS"
2. Vá em "Gerenciar DNS"
3. Adicione o registro CNAME
4. Confirme as alterações

### Passo 4: Aguardar Propagação

⏱️ **Tempo de propagação:** 2 a 24 horas

**Verificar propagação:**
```bash
# No terminal/prompt
nslookup www.seudominio.com.br
```

### Passo 5: Verificação Final

1. **Teste o acesso:** `https://www.seudominio.com.br`
2. **Verifique se carrega:** Seu site personalizado
3. **Confirme SSL:** Certificado válido (automático)
4. **Teste funcionalidades:** Navegação, formulários, etc.

## 🔧 Configurações Técnicas Atuais

### Backend (Spring Boot)
- **Endpoint:** `/api/accounts/resolve-domain/{domain}`
- **Função:** Resolve domínio → slug do cliente
- **Integração:** Netlify API para SSL automático

### Frontend (React)
- **Detecção automática:** Hostname → slug
- **Fallback:** Rota `/site/:companyName`
- **Tema dinâmico:** Carregado via API

### Netlify Integration
- **SSL automático:** Certificados Let's Encrypt
- **CDN global:** Performance otimizada
- **Domínios customizados:** Gerenciamento automático

## ❗ Problemas Comuns

### Domínio não carrega
- ✅ Verificar configuração DNS
- ✅ Aguardar propagação completa
- ✅ Confirmar domínio no painel Standi

### SSL não funciona
- ✅ Aguardar ativação automática (até 24h)
- ✅ Verificar se CNAME está correto
- ✅ Contatar suporte se persistir

### Site carrega mas sem tema
- ✅ Verificar se domínio foi salvo no painel
- ✅ Confirmar se tema foi configurado
- ✅ Limpar cache do navegador

## 📞 Suporte

**Em caso de dúvidas:**
- 📧 Email: suporte@standi.com.br
- 📱 WhatsApp: [número do suporte]
- 🕐 Horário: Segunda a Sexta, 9h às 18h

---

**✨ Após a configuração, seu site estará disponível em seu domínio personalizado com SSL automático e performance otimizada!**
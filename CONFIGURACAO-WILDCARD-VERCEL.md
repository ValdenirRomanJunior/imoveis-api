# Configuração de Wildcard Domain na Vercel

## Problema Atual
O sistema está redirecionando para a home ao invés de mostrar o tema do cliente no subdomínio `companyName.standi.com.br`.

## Solução: Configurar Wildcard Domain

Baseado na documentação oficial da Vercel para multi-tenant applications, precisamos configurar um wildcard domain.

### Passos para Configuração:

1. **Acessar o Painel da Vercel**
   - Entre no projeto no painel da Vercel
   - Vá para Settings > Domains

2. **Adicionar Domínio Wildcard**
   - Clique em "Add Domain"
   - Adicione: `*.standi.com.br`
   - Isso permitirá que qualquer subdomínio (cliente.standi.com.br) seja roteado para o mesmo projeto

3. **Configurar DNS (se necessário)**
   - Se o domínio não estiver usando os nameservers da Vercel:
   - Adicione um registro CNAME: `*` apontando para o domínio da Vercel
   - Ou migre os nameservers para: `ns1.vercel-dns.com` e `ns2.vercel-dns.com`

4. **Verificar Certificado SSL**
   - A Vercel automaticamente gerará certificados SSL para cada subdomínio
   - Isso pode levar alguns minutos após a configuração

### Como Funciona:

1. **Usuário acessa**: `cliente.standi.com.br`
2. **Vercel roteia**: Para o mesmo projeto React
3. **SubdomainRouter detecta**: O hostname e extrai "cliente"
4. **React Router navega**: Para `/site/cliente`
5. **Componente Site**: Carrega o tema personalizado do cliente

### Logs de Debug:

Adicionei logs temporários no SubdomainRouter para debugar:
- Hostname detectado
- Partes do domínio
- Subdomínio extraído
- Navegação realizada

### Após Configuração:

1. Teste acessando um subdomínio: `https://teste.standi.com.br`
2. Verifique os logs no console do navegador
3. Confirme se o redirecionamento para `/site/teste` está funcionando
4. Remova os logs de debug do SubdomainRouter

### Referências:
- [Vercel Multi-tenant Documentation](https://vercel.com/docs/multi-tenant/domain-management)
- [Domain Management for Multi-tenant](https://vercel.com/docs/multi-tenant/domain-management)
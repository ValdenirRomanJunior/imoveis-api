## Diagnóstico
- O loop de requisições após login é causado por dois pontos no `Dashboard`:
  - `navigate('/dashboard')` dentro de `useEffect` após sucesso do refresh faz navegação para a mesma rota, provocando remount/re-render e novo refresh.
  - `ErrorBoundary FallbackComponent={Dashboard}` re-renderiza o próprio componente em caso de erro, criando recursão infinita.
- Contribuintes adicionais:
  - `refresh_token` retorna 204 mesmo sem usuário autenticado (`AuthController`), validando falso-positivo na UI.
  - Interceptor de `axios` grava um token placeholder e envia `Authorization` sem `Bearer` quando não há token.

## Correções Propostas
1. Remover navegação redundante no refresh do Dashboard
- Arquivo: `frontend/src/pages/Dashboard/index.tsx`
- Trocar o método local `refreshTokenUser` para apenas atualizar o token e não chamar `navigate('/dashboard')` quando já estiver na Dashboard; usar `refreshToken()` silenciosamente.
- Localização: linhas 52–61 e uso no `useEffect` linhas 63–65.

2. Corrigir o Fallback do ErrorBoundary
- Arquivo: `frontend/src/pages/Dashboard/index.tsx`
- Substituir `ErrorBoundary FallbackComponent={Dashboard}` por `FallbackComponent={PageNotFoundDashboard}`.
- Localização: linha 172.

3. Ajustar interceptor de requisições
- Arquivo: `frontend/src/utils/requests.ts`
- Remover gravação de token placeholder e só setar `Authorization` quando existir; garantir prefixo `Bearer ` adequado.
- Localização: linhas 15–18 (placeholder) e 21–29 (headers).

4. Endurecer o endpoint de refresh no backend
- Arquivo: `backend/src/main/java/com/dynamous/imoveis/controllers/AuthController.java`
- Retornar 401 (`UNAUTHORIZED`) quando `UserService.authenticated()` for `null`, em vez de 204.
- Localização: linhas 57–58.

## Validação
- Fluxo: fazer login como tenant/account, abrir Dashboard.
- Verificar no Network:
  - `POST /auth/refresh_token` executa 1 vez na montagem e não repete.
  - Nenhuma navegação para a mesma rota é disparada.
  - Em caso de erro no Dashboard, o fallback exibe `PageNotFoundDashboard` sem recursão.
- Confirmar que chamadas dos cards (properties/leads/published) não entram em retry infinito; tratar 403 exibindo mensagem.

## Observações
- Datas: há inconsistência de `SimpleDateFormat` com `HH` vs `hh` em `TenantService`, mas não é a causa do loop; podemos padronizar em uma etapa posterior.
- Segurança: remover cabeçalhos CORS no cliente; o servidor já os define.

## Próximos Passos
- Implementar as alterações acima e testar em ambiente local.
- Se desejar, padronizar formatação de datas no backend e revisar verificação de trial/expiração no `SubscriptionInterceptor` para evitar falsos 403 por timezone.
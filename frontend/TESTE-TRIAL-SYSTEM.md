# 🧪 Guia de Teste - Sistema de Trial

Este documento explica como testar o sistema de controle de período de testes implementado.

## 📋 Componentes Implementados

### 1. **useTrialStatus Hook**
- Localização: `src/hooks/useTrialStatus.ts`
- Função: Calcula o status do trial baseado na `endDate` do usuário
- Retorna: `isActive`, `isExpired`, `daysRemaining`, `endDate`

### 2. **TrialWarningBanner**
- Localização: `src/components/TrialWarningBanner/`
- Função: Exibe banner de aviso durante o período ativo do trial
- Tipos visuais: `info` (>7 dias), `warning` (3-7 dias), `critical` (≤3 dias)

### 3. **TrialExpiredModal**
- Localização: `src/components/TrialExpiredModal/`
- Função: Modal de bloqueio quando o trial expira
- Comportamento: Bloqueia completamente o acesso à aplicação

## 🔧 Como Testar

### Método 1: Console do Navegador

1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Use as funções disponíveis:

```javascript
// Trial ativo com 15 dias restantes
setTrialScenario("active")

// Trial com aviso (5 dias restantes)
setTrialScenario("warning")

// Trial crítico (2 dias restantes)
setTrialScenario("critical")

// Trial expirado
setTrialScenario("expired")

// Restaurar usuário original
restoreOriginalUser()
```

4. Recarregue a página após cada comando para ver as mudanças

### Método 2: Modificação Manual

Edite o localStorage diretamente:

```javascript
// No console do navegador
const testUser = {
  id: 'test-user-id',
  slug: 'Usuario Teste',
  email: 'teste@exemplo.com',
  lastName: 'Sobrenome',
  endDate: '2024-01-15T10:00:00.000Z', // Ajuste a data conforme necessário
  perfis: ['TENANT']
};

localStorage.setItem('user', JSON.stringify(testUser));
// Recarregue a página
```

## 📊 Cenários de Teste

### ✅ Trial Ativo (>7 dias)
- **Banner**: Azul (info) - "Você tem X dias restantes..."
- **Modal**: Não aparece
- **Acesso**: Liberado

### ⚠️ Trial com Aviso (3-7 dias)
- **Banner**: Amarelo (warning) - "Seu período expira em X dias."
- **Modal**: Não aparece
- **Acesso**: Liberado

### 🚨 Trial Crítico (≤3 dias)
- **Banner**: Vermelho (critical) - "Seu período expira em X dias!"
- **Modal**: Não aparece
- **Acesso**: Liberado

### 🔒 Trial Expirado
- **Banner**: Não aparece
- **Modal**: Aparece e bloqueia o acesso
- **Acesso**: Bloqueado

## 🎯 Funcionalidades a Testar

### Banner de Aviso
- [ ] Aparece apenas durante trial ativo
- [ ] Cores corretas para cada período
- [ ] Mensagens dinâmicas baseadas nos dias
- [ ] Botão "Ver Planos" funciona
- [ ] Botão de fechar funciona
- [ ] Banner desaparece após ser fechado

### Modal de Expiração
- [ ] Aparece apenas quando trial expirado
- [ ] Bloqueia completamente o acesso
- [ ] Lista de benefícios visível
- [ ] Botão "Ver Planos e Assinar" funciona
- [ ] Botão "Comparar Planos" funciona (se implementado)
- [ ] Modal não pode ser fechado (comportamento esperado)

### Integração no Dashboard
- [ ] Hook `useTrialStatus` funciona corretamente
- [ ] Componentes renderizam condicionalmente
- [ ] Redirecionamento para `/plans` funciona
- [ ] Não interfere com outras funcionalidades

## 🐛 Possíveis Problemas

1. **Banner não aparece**: Verifique se `user.endDate` existe
2. **Modal não bloqueia**: Verifique se `trialStatus.isExpired` é true
3. **Datas incorretas**: Verifique formato ISO da `endDate`
4. **Redirecionamento falha**: Verifique se a rota `/plans` existe

## 📝 Notas Importantes

- O sistema depende da propriedade `endDate` do usuário
- Datas devem estar no formato ISO string
- O helper de teste é apenas para desenvolvimento
- Remova o import do helper antes de produção
- O sistema funciona com localStorage para testes

## 🚀 Próximos Passos

1. Testar todos os cenários listados
2. Verificar responsividade dos componentes
3. Testar integração com sistema de pagamento
4. Implementar testes automatizados
5. Remover helper de teste antes de produção
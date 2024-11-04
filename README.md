# Organiza - SaaS para Gestão de Listas de Compras em Grupo

**Organiza** é um sistema SaaS multi-tenant que permite a criação e o gerenciamento de listas de compras para grupos informais, como amigos ou familiares. Com ele, os usuários podem formar grupos colaborativos para planejar e acompanhar compras de maneira organizada e eficiente. O sistema permite definir diferentes níveis de permissão para cada papel, garantindo controle sobre as ações permitidas, como criar, editar ou finalizar listas de compras.

---

## Funcionalidades

### Funcionalidades Gerais

- **Criar conta de usuário com e-mail e senha**
  - Formulário de cadastro para novos usuários, com validação de e-mail e senha.
  - Armazenamento seguro dos dados do usuário e envio de e-mail de confirmação, se necessário.

- **Realizar login**
  - Formulário de login para autenticação de usuários.
  - Validação das credenciais e estabelecimento de sessão ou geração de token JWT.

- **Recuperar senha**
  - Formulário para solicitação de recuperação de senha com envio de e-mail seguro.
  - Página para redefinição de senha e atualização dos dados no banco de dados.

---

### Funcionalidades de Grupos

- **Criar grupo**
  - Formulário para criação de grupo, incluindo nome e descrição.
  - Armazenamento do grupo no banco de dados e atribuição do usuário como Líder.

- **Visualizar grupo**
  - Página de detalhes do grupo, com informações de nome, descrição, membros e listas.
  - Exibição das permissões e ações disponíveis com base no papel do usuário.

- **Editar grupo (somente Líder e Organizador)**
  - Formulário para atualização do nome e descrição do grupo.
  - Atualização das informações do grupo no banco de dados.

---

### Funcionalidades de Membros

- **Convidar membros**
  - Formulário para envio de convite por e-mail com função especificada (Líder, Organizador, Participante ou Observador).
  - Armazenamento do convite até que o usuário aceite.

- **Cancelar convite**
  - Opção para cancelamento de convites pendentes, com remoção do banco de dados.

- **Listar membros do grupo**
  - Lista de membros com filtros por nome e função.

- **Alterar função de membro (somente Líder)**
  - Opção para o Líder modificar a função de um membro, com notificação do membro.

- **Ativar/desativar membro (somente Líder)**
  - Ação para ativar ou desativar membros, com atualização de status e feedback visual.

- **Atualizar informações de membros**
  - Líder e Organizador podem atualizar informações de qualquer membro.
  - Participantes e Observadores podem atualizar apenas suas próprias informações.

---

### Funcionalidades de Listas de Compras

- **Criar listas de compras**
  - Formulário para criar listas de compras, incluindo nome e descrição.
  - Armazenamento das listas no banco de dados, associadas ao grupo.

- **Editar listas de compras**
  - Edição de nome, descrição e status da lista por Líder e Organizador.

- **Visualizar listas de compras**
  - Exibição de todas as listas do grupo, permitindo acesso a detalhes e status.

- **Adicionar itens à lista de compras (somente Líder e Organizador)**
  - Formulário para adição de novos itens à lista, com atualização no banco de dados.

- **Dar check/uncheck em itens da lista**
  - Ação de check/uncheck para cada item, permitindo que Participantes e superiores marquem/desmarquem itens.

- **Finalizar lista de compras**
  - Lógica para finalização automática da lista quando todos os itens estiverem marcados.
  - Opção para finalização manual por Líder ou Organizador.

---

### Outras Funcionalidades e Detalhes

- **Notificações**
  - Sistema de notificações para eventos importantes, como convites aceitos e listas finalizadas.
  - Configuração de e-mails e, opcionalmente, notificações dentro do app.

- **Perfil de usuário**
  - Página de perfil para atualização de informações pessoais, com restrições conforme o papel do usuário.

---

## Permissões por Papel

| Função                             | Líder | Organizador | Participante | Observador |
|------------------------------------|-------|-------------|--------------|------------|
| Convidar membros                   | ✅    | ❌          | ❌           | ❌         |
| Cancelar convite                   | ✅    | ❌          | ❌           | ❌         |
| Atualizar grupo                    | ✅    | ❌          | ❌           | ❌         |
| Desativar grupo                    | ✅    | ❌          | ❌           | ❌         |
| Listar membros                     | ✅    | ✅          | ✅           | ✅         |
| Alterar função de membro           | ✅    | ❌          | ❌           | ❌         |
| Remover membro do grupo            | ✅    | ❌          | ❌           | ❌         |
| Criar listas                       | ✅    | ✅          | ❌           | ❌         |
| Editar listas                      | ✅    | ✅          | ❌           | ❌         |
| Ver listas                         | ✅    | ✅          | ✅           | ✅         |
| Finalizar lista                    | ✅    | ✅          | ❌           | ❌         |
| Remover lista                      | ✅    | ✅          | ❌           | ❌         |
| Dar check/uncheck em itens         | ✅    | ✅          | ✅           | ❌         |
| Ver itens                          | ✅    | ✅          | ✅           | ✅         |
| Editar itens                       | ✅    | ✅          | ❌           | ❌         |

### Condições
- **Líder**: Pode alterar o papel de outros membros dentro do grupo e remover membros do grupo.
- **Todos os usuários**: Podem atualizar apenas suas próprias informações.

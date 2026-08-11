# O VÉU — ROADMAP DO PROJETO

Arquivo de memória do projeto. Serve para recarregar o contexto do assistente e continuar o trabalho do mesmo ponto, sem perder decisões, regras e estado atual.

---

## 1. O QUE É O PROJETO

Ficha de personagem digital (single page, só navegador) para a One Shot de RPG **O Véu**.

- NÃO é um app de mestre: não explica regras, não interpreta, não sugere ações.
- Funciona em celular (prioridade) e computador.
- Dados salvos automaticamente no navegador (localStorage).
- Para rodar: abrir `C:\Users\pipel\o-veu\index.html` (ou servir a pasta).

---

## 2. REGRAS NÃO-NEGOCIÁVEIS

1. Não inventar classes, habilidades, atributos, itens, valores de dano nem regras de combate.
2. Quando uma informação ainda não foi definida, deixar um campo preparado em vez de inventar solução.
3. O app trata os dados da ficha como dados; não interpreta regras do RPG.
4. Conteúdo do jogo (classes, habilidades, itens) só entra a partir do que o usuário fornecer.

---

## 3. ESTRUTURA DE ARQUIVOS (em `C:\Users\pipel\o-veu\`)

| Arquivo | Função |
|---------|--------|
| `index.html` | Estrutura da ficha (seções, ids dos campos) |
| `style.css` | Visual mobile-first (tema escuro de ficha de RPG, CSS variables, botões 48px) |
| `data.js` | **DADOS DO JOGO** — ponto de extensão. Preenchido manualmente pelo usuário |
| `app.js` | Lógica: estado, rendering, eventos, persistência (IIFE vanilla JS, sem build) |

---

## 4. ESTADO ATUAL DA IMPLEMENTAÇÃO

### Concluído
- **Interface por abas**: Ficha (Identidade/Atributos/Recursos/Habilidade), Equipamento (Armas/Itens), Registro (NPCs/Lugares), Anotações. Transição com animação.
- **NPCs**: lista resumida clicável; "Adicionar NPC" abre uma **caixa de nota** (modal) para escrever nome + informações e salvar. Tocar num NPC reabre a mesma caixa para **editar**; excluir dentro da caixa.
- **Lugares**: idem NPCs, com nome + anotações na caixa de nota (modal).
- **Tabela de rolagem D20**: botão "i" no topo abre modal com a tabela de resultados (dados em `DATA.diceTable`), com ícones pixel art de status.
- **Aba de personagens**: múltiplas fichas armazenadas no navegador (overlay "Personagens" no topo). Criar, abrir, excluir. Migração automática da ficha única antiga. Nome do personagem aparece no topo.
- **Ícones pixel art** (gerados via canvas com `image-rendering: pixelated`): coração na Vida, cérebro no Stress, pessoa, espada, livro, lápis, "i" de informação e status da tabela D20.
- Identidade: campo Nome + seletor de Classe (7 classes). Descrição da classe aparece ao selecionar. Ao escolher a classe, a **Vida máxima** é preenchida automaticamente com a Vida inicial da classe (Investigador 8, Ex-militar 12, Médico 9, Ocultista 8, Jornalista 9, Fazendeiro 11, Sobrevivente 10).
- Atributos: **distribuição com botões** (−2, −1, 0, +1, +2) para os 5 atributos (Força, Agilidade, Intelecto, Percepção, Presença). O app impede valores repetidos automaticamente; tocar num valor usado por outro atributo move o valor para o atual. Ao completar a distribuição, os atributos **travam** e passam a aparecer só em **forma resumida** ("Força +2 · Agilidade +1 ..."), com botão discreto "Editar atributos" para correção durante a criação.
- Recursos: Vida e Stress com ícone, botões − / + e **um único campo com o valor final** (sem mostrar cálculo). Máximo da **Vida** definido automaticamente pela classe; **Stress** não tem máximo (sobe livre pelos botões /+/−, mínimo 0). Abaixo de cada recurso, linha resumo "Classe · X de vida / X de estresse".
- Habilidade: seleção única (radio) das 3 habilidades da classe escolhida; a escolhida aparece destacada na ficha.
- Armas: catálogo com 33 armas fornecidas (Improvisadas, Armas brancas, Armas de fogo, Outras). Seletor agrupado em "**Podem ser improvisadas**" (★) e "**Não podem ser improvisadas**"; armas ambíguas (Armas brancas/Outras) aparecem nas duas listas, por nome, sem estrela. Na ficha, armas improvisáveis exibem estrela pixel art. Opção "Nova arma personalizada". Lista editável/removível.
- Itens: ao selecionar a classe, os **itens iniciais da classe** são adicionados automaticamente à ficha (uma única vez por classe — controlado por `grantedItems`). Lista continua editável (Nome, Quantidade, Descrição), adicionar/remover manualmente.
- Anotações: área de texto livre, salva automaticamente.
- Botão "Limpar ficha atual" (no overlay de Personagens, com confirmação).
- Persistência automática em localStorage (chave `o-veu.ficha.v1`).
- **Normalização de fichas ao carregar**: toda ficha é preenchida com `merge(defaultState(), data)` — campos ausentes (ex.: `npcs`/`places` em personagens antigos) são adicionados automaticamente, evitando quebras.

### Pendente (aguardando conteúdo do usuário)
- Nada pendente no momento. Itens comuns/improvisados pré-definidos do jogo (fora dos iniciais de classe) podem ser adicionados em `items.comuns` / `items.improvisados` se o usuário fornecer.

---

## 5. SCHEMA DO `data.js`

```js
window.DATA = {

  // Cada classe: { id, name, description, initialHp, initialItems: [nomes], abilities: [ { id, name, description } ] }
  classes: [ /* 7 classes preenchidas */ ],

  // Cada atributo: { id, name, description }
  // attributeValues: valores de distribuição (cada um usado uma única vez)
  attributeValues: [-2, -1, 0, 1, 2],
  attributes: [ /* forca, agilidade, intelecto, percepcao, presenca */ ],

  // Categorias fixas de distância (não alterar)
  weaponDistances: ["Muito Perto", "Perto", "Distante", "Muito Distante"],

  // Catálogo de armas: { id, name, distance, damage, category }
  weapons: [ /* 33 armas preenchidas */ ],

  // Itens pré-definidos: { id, name, quantity, description } (ainda vazios)
  items: {
    comuns: [],
    improvisados: []
  },

  // Tabela de rolagem D20 (mostrada no modal de informação)
  diceTable: [ { min, max, label, description, icon } ]
};
```

### Classes já definidas (ids)
`investigador`, `ex-militar`, `medico`, `ocultista`, `jornalista`, `fazendeiro`, `sobrevivente` — cada uma com 3 habilidades completas.

---

## 6. ESTADO SALVO

### Store (localStorage `o-veu.store.v2`)

```js
{
  activeId: "",                    // id do personagem ativo
  characters: [
    { id, createdAt, data: { /* ficha completa do personagem */ } }
  ]
}
```

### Ficha de cada personagem (`data`)

```js
{
  identity: { name: "", classId: "" },
  attributes: { /* id do atributo: valor atribuído (-2 a +2) */ },
  resources: { hp: { current, max }, stress: { current, max } },
  abilityId: "",
  weapons: [ { id, name, distance, damage } ],
  items: [ { id, name, quantity, description } ],
  grantedItems: [ /* ids de classes cujos itens iniciais já foram adicionados */ ],
  npcs: [ { id, name, info } ],
  places: [ { id, name, notes } ],
  notes: ""
}
```

Nota: a chave antiga `o-veu.ficha.v1` foi migrada automaticamente para `o-veu.store.v2` na primeira execução.

---

## 7. PRÓXIMOS PASSOS / FILA

1. Ajustes de interface conforme feedback do usuário.

---

## 8. DECISÕES DE IMPLEMENTAÇÃO

- Vanilla JS sem framework/build: ideal para "só no navegador" e fácil de editar.
- UI em português (pt-BR).
- Fonte 16px nos inputs para evitar zoom automático no iOS.
- Eventos delegados nos contêineres de Armas/Itens (re-render não perde foco ao digitar).
- Seção Habilidade re-renderiza quando a classe muda; habilidade salva é invalidada se não pertencer à classe.
- Ícones em pixel art desenhados em canvas (mapas de string + paleta), nunca emoji de sistema.
- Botões com gradiente/sombra e estados ativos (pressionar/escala) para toque agradável no celular.

---

## 9. PROTOCOLO DE RECARGA DE CONTEXTO

Se o contexto do assistente estiver próximo de esgotar:
1. Atualizar este arquivo com o estado mais recente (arquivos alterados, decisões novas, pendências).
2. Continuar a partir da seção "7. PRÓXIMOS PASSOS".

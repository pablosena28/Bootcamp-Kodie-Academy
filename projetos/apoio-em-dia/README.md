# Apoio em Dia

**Desafio 3 — Tecnologia para o Impacto Social | Bootcamp Kodie Academy**

MVP para organizar pedidos de apoio em um pré-vestibular social, inspirado na experiência de coordenação do autor.

**Integrante:** Pablo Matheus Sena dos Santos.

## Aplicação

[Abrir o Apoio em Dia](https://apoio-em-dia-pablo.royalkiwi66.chatgpt.site)

A aplicação hospedada está pública e pode ser aberta sem login no ChatGPT. Use somente dados fictícios na demonstração. O código também permite executar o MVP localmente.

## Descrição para a entrega

O problema identificado é a dispersão de pedidos de material, monitoria e apoio à frequência em mensagens e conversas, dificultando o acompanhamento pela coordenação. Os públicos afetados são estudantes, educadores e coordenadores de pré-vestibulares sociais. O Apoio em Dia centraliza os pedidos em um formulário, armazena os registros e executa uma triagem automática com responsável, prioridade e prazo. Uma fila com filtros, indicadores e histórico acompanha cada atendimento até a resolução. Espera-se reduzir o retrabalho e facilitar o encaminhamento e o acompanhamento dos pedidos; o impacto real ainda deverá ser avaliado em um piloto.

## Funcionalidades

- Formulário com validação no navegador e no servidor.
- Banco de dados persistente SQLite/D1; dados locais ficam no diretório `.wrangler`.
- Workflow automático de triagem na criação de cada registro.
- Status Novo → Em atendimento → Resolvido, com reabertura.
- Histórico de movimentações e notas de acompanhamento.
- Busca, filtros, indicadores de pendência, prioridade e atraso.
- Exportação em CSV e exemplos fictícios para demonstração.

## Workflow principal

| Categoria | Responsável | Prioridade | Prazo |
| --- | --- | --- | --- |
| Dificuldade de frequência | Coordenação | Alta | 24 horas |
| Acessibilidade | Coordenação | Alta | 24 horas |
| Material de estudo | Equipe pedagógica | Normal | 48 horas |
| Monitoria | Educadores | Normal | 48 horas |
| Outros | Coordenação | Normal | 72 horas |

O servidor salva o pedido e o evento de triagem em uma transação. Os prazos são demonstrativos. Não há envio externo de mensagens nem integração com e-mail. Pedidos vencidos são identificados ao consultar o painel.

## Como executar no computador

Pré-requisitos: **Node.js 22.13 ou superior**, npm e Git. Para desenvolvimento local, não é necessária conta Cloudflare.

```bash
git clone https://github.com/pablosena28/Bootcamp-Kodie-Academy.git
cd Bootcamp-Kodie-Academy/projetos/apoio-em-dia
npm install
npm run db:prepare
npm run dev
```

Abra **http://127.0.0.1:5173**. A preparação do banco aplica as migrações ao banco local e deve acontecer antes do primeiro uso. O identificador em `wrangler.local.jsonc` é apenas um placeholder para desenvolvimento local.

1. Clique em **Carregar exemplos** para ver três pedidos fictícios, ou registre um novo pedido.
2. Para verificar o workflow, escolha **Dificuldade de frequência** e confira responsável, prioridade e prazo.
3. Abra o pedido e veja o evento de triagem no histórico.
4. Inicie e conclua o atendimento; recarregue a página para conferir a persistência.

Se aparecer erro de tabela inexistente, pare o servidor, execute novamente `npm run db:prepare` nesta pasta e reinicie `npm run dev`.

## Verificação

```bash
npm run typecheck
npm test
npm run build
```

Checagem de tipos, teste das regras de triagem, build e aplicação das migrações locais verificados. Na aplicação hospedada, foram testados cadastro, persistência, transições, histórico e carregamento dos exemplos. A interface não passou por uma inspeção visual automatizada.

## Organização do código

- `app/page.tsx`: formulário, fila, painel e documentação do projeto.
- `app/api/requests/route.ts`: operações do banco e mudanças de status.
- `lib/workflow.ts`: regras de triagem e transições permitidas.
- `db/schema.ts` e `drizzle/`: esquema e migrações.
- `tests/workflow.mjs`: verificações das regras.
- `vite.config.ts`, `worker.ts` e `wrangler.local.jsonc`: execução local.

## Tecnologias e apoio de IA

React, TypeScript, CSS, Vinext/Vite, SQLite/D1 e Drizzle. A primeira versão foi criada na plataforma Sites com apoio de IA; esta pasta traz uma configuração independente para execução local. Não foram usados Bubble ou Make. O autor deve compreender e demonstrar as regras e o funcionamento do MVP.

## Limites do MVP

Use somente dados fictícios. O protótipo não possui perfis separados de estudante e coordenação; a versão hospedada é uma demonstração pública. Uma implantação real exige autorização por perfil e procedimentos adequados para os dados dos estudantes. GitHub Pages não executa este backend; não abra o projeto como um simples arquivo HTML.

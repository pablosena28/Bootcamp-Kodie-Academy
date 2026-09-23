# Ruas do Rio — História dos Logradouros Cariocas

Aplicação React para consultar logradouros do município do Rio de Janeiro e apresentar, quando disponível na base local, uma síntese sobre a origem de seus nomes.

O projeto combina uma **API pública de endereços** com uma **base histórica local**, deixando explícita a diferença entre os dados retornados pela API e o conteúdo histórico curado.

## Problemática

Informações sobre endereços estão disponíveis em APIs públicas, mas a consulta normalmente apresenta apenas dados operacionais, como CEP e bairro. Ao mesmo tempo, os nomes das ruas registram diferentes camadas da memória urbana.

A proposta do projeto é aproximar essas duas dimensões em uma interface simples: localizar um logradouro e, quando ele estiver catalogado, conhecer a origem de sua denominação.

## Objetivo

Desenvolver uma aplicação responsiva em React + Vite que:

- consuma uma API pública;
- organize os resultados em componentes reutilizáveis;
- permita busca, filtros, favoritos e visualização de detalhes;
- trate carregamento, erro e ausência de resultados;
- associe dados da API a uma base histórica local.

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- Fetch API
- localStorage
- ViaCEP

## API utilizada

A aplicação utiliza a API pública **ViaCEP** para buscar logradouros por:

- UF: RJ
- município: Rio de Janeiro
- nome do logradouro informado pelo usuário

Documentação: https://viacep.com.br/

A explicação histórica **não é produzida pela ViaCEP**. Ela vem do arquivo local:

`src/data/streetOrigins.js`

## Funcionalidades

- busca de logradouros na API;
- visualização de CEP e bairro;
- associação com a origem histórica quando catalogada;
- filtro por categoria da origem;\n- filtro territorial por Centro, Zona Norte, Zona Sul, Zona Sudoeste e Zona Oeste;
- favoritos persistidos no navegador;
- painel de detalhes;
- link para pesquisa do endereço no OpenStreetMap;
- estados de carregamento, erro e busca vazia;
- layout responsivo.

## Base histórica

A base local contém **100 logradouros**, distribuídos de forma equilibrada entre cinco recortes territoriais usados pela interface: **Centro, Zona Norte, Zona Sul, Zona Sudoeste e Zona Oeste**, com 20 registros em cada grupo.

Os resumos históricos são conteúdo inicial de estudo. O próprio sistema identifica essa condição e recomenda validação em fontes institucionais antes de uso acadêmico. A aplicação não inventa uma origem para nomes que ainda não estejam catalogados.\n\nNo projeto, **Zona Sudoeste** é uma categoria operacional para reunir principalmente Barra da Tijuca, Recreio dos Bandeirantes e Jacarepaguá. Ela não é apresentada como uma divisão administrativa oficial do município.

Essa decisão permite ampliar a base progressivamente sem confundir dado da API com interpretação histórica.

## Arquitetura

```text
src/
├── components/
│   ├── CategoryFilter.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── StatusMessage.jsx
│   ├── StreetCard.jsx
│   ├── StreetDetails.jsx
│   └── StreetList.jsx
├── data/
│   └── streetOrigins.js
├── services/
│   └── viacep.js
├── utils/
│   └── text.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Executar localmente

Entre na pasta do projeto:

```bash
cd projetos/ruas-do-rio
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Publicação

A aplicação está publicada na Vercel:

**https://ruas-do-rio.vercel.app/**

## Uso de Inteligência Artificial

A IA foi utilizada como ferramenta de apoio ao planejamento da solução, arquitetura de componentes, revisão de acessibilidade e organização do código.

### Prompt utilizado

> "Quero desenvolver uma aplicação React que permita pesquisar logradouros do município do Rio de Janeiro e consultar informações sobre a origem de seus nomes, combinando uma API pública de endereços com uma base histórica local. Como organizar a arquitetura, os componentes, os estados e as interações sem misturar os dados da API com o conteúdo histórico?"

### Objetivo

Utilizei o prompt para definir a arquitetura antes da implementação, separar a camada de consulta da API da base histórica e planejar componentes, estados e comportamentos da interface.

## Decisões de desenvolvimento

A aplicação não tenta atribuir automaticamente uma origem histórica a todos os resultados. Quando não existe correspondência na base local, informa que a origem ainda não foi documentada.

Essa solução reduz o risco de apresentar conteúdo histórico não verificado e permite ampliar o catálogo de forma controlada.

## Autor

**Pablo Matheus Sena dos Santos**

GitHub: [@pablosena28](https://github.com/pablosena28)

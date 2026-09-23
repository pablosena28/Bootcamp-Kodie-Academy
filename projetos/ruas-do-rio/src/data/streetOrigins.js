export const streetOrigins = [
  {
    id: 'avenida-rio-branco',
    name: 'Avenida Rio Branco',
    area: 'Centro',
    category: 'Personalidade',
    previousName: 'Avenida Central',
    origin:
      'Aberta como Avenida Central no início do século XX, passou a se chamar Avenida Rio Branco em 1912, em homenagem ao Barão do Rio Branco, José Maria da Silva Paranhos Júnior.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'avenida-presidente-vargas',
    name: 'Avenida Presidente Vargas',
    area: 'Centro',
    category: 'Personalidade',
    previousName: '',
    origin:
      'O nome homenageia Getúlio Vargas, presidente do Brasil no período em que a avenida foi inaugurada, em 1944.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'praca-tiradentes',
    name: 'Praça Tiradentes',
    area: 'Centro',
    category: 'Personalidade',
    previousName: '',
    origin:
      'O nome atual homenageia Joaquim José da Silva Xavier, Tiradentes, personagem associado à Inconfidência Mineira.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'rua-primeiro-de-marco',
    name: 'Rua Primeiro de Março',
    area: 'Centro',
    category: 'Data histórica',
    previousName: '',
    origin:
      'O nome registra a data de 1º de março de 1870, associada ao encerramento da Guerra do Paraguai.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'praca-xv-de-novembro',
    name: 'Praça XV de Novembro',
    area: 'Centro',
    category: 'Data histórica',
    previousName: '',
    origin:
      'A denominação faz referência a 15 de novembro de 1889, data da Proclamação da República no Brasil.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'rua-sete-de-setembro',
    name: 'Rua Sete de Setembro',
    area: 'Centro',
    category: 'Data histórica',
    previousName: '',
    origin:
      'O nome remete a 7 de setembro de 1822, data tradicionalmente associada à Independência do Brasil.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'avenida-princesa-isabel',
    name: 'Avenida Princesa Isabel',
    area: 'Copacabana',
    category: 'Personalidade',
    previousName: '',
    origin:
      'A via recebeu o nome de Princesa Isabel, integrante da família imperial brasileira e regente que sancionou a Lei Áurea em 1888.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
  {
    id: 'avenida-republica-do-chile',
    name: 'Avenida República do Chile',
    area: 'Centro',
    category: 'Lugar',
    previousName: '',
    origin:
      'A denominação homenageia a República do Chile e integra a tradição carioca de nomear vias com referências a países e repúblicas americanas.',
    sourceNote:
      'Síntese histórica inicial para fins didáticos. Recomenda-se validação em fonte institucional antes de uso acadêmico.',
  },
]

export const categories = [
  'Todos',
  ...Array.from(new Set(streetOrigins.map((street) => street.category))),
]

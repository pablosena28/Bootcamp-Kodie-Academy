const SOURCE_NOTE =
  'Curadoria histórica inicial para fins didáticos. A associação do nome foi elaborada para o projeto e deve ser validada em fonte institucional antes de uso acadêmico.'

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const RAW_STREETS = [
  // Centro — 20
  ['Avenida Rio Branco', 'Centro', 'Centro', 'Personalidade', 'Aberta como Avenida Central, passou a homenagear o Barão do Rio Branco, José Maria da Silva Paranhos Júnior.', 'Avenida Central'],
  ['Avenida Presidente Vargas', 'Centro', 'Centro', 'Personalidade', 'Homenageia Getúlio Vargas, presidente do Brasil no período em que a avenida foi inaugurada, em 1944.', ''],
  ['Rua Primeiro de Março', 'Centro', 'Centro', 'Data histórica', 'Registra 1º de março de 1870, data associada ao encerramento da Guerra do Paraguai.', ''],
  ['Rua Sete de Setembro', 'Centro', 'Centro', 'Data histórica', 'Remete a 7 de setembro de 1822, data tradicionalmente associada à Independência do Brasil.', ''],
  ['Praça XV de Novembro', 'Centro', 'Centro', 'Data histórica', 'A denominação atual faz referência a 15 de novembro de 1889, data da Proclamação da República.', ''],
  ['Praça Tiradentes', 'Centro', 'Centro', 'Personalidade', 'Homenageia Joaquim José da Silva Xavier, Tiradentes, personagem associado à Inconfidência Mineira.', ''],
  ['Avenida República do Chile', 'Centro', 'Centro', 'Lugar', 'Homenageia a República do Chile e integra a tradição de referências a países americanos na toponímia carioca.', ''],
  ['Avenida República do Paraguai', 'Centro', 'Centro', 'Lugar', 'Homenageia a República do Paraguai.', ''],
  ['Rua do Ouvidor', 'Centro', 'Centro', 'Instituição ou função', 'O nome remete ao cargo colonial de ouvidor e à presença histórica dessa função administrativa na área central.', ''],
  ['Rua da Carioca', 'Centro', 'Centro', 'Topônimo', 'O nome remete ao antigo topônimo Carioca, historicamente associado ao rio, ao largo e à identidade da cidade.', ''],
  ['Rua Uruguaiana', 'Centro', 'Centro', 'Evento ou lugar', 'A denominação remete a Uruguaiana, no Rio Grande do Sul, e ao episódio militar da rendição de Uruguaiana durante a Guerra do Paraguai.', ''],
  ['Rua Buenos Aires', 'Centro', 'Centro', 'Lugar', 'Homenageia Buenos Aires, capital da Argentina.', ''],
  ['Rua do Lavradio', 'Lapa', 'Centro', 'Personalidade', 'A denominação está associada ao título de Marquês do Lavradio, ligado à administração colonial do Rio de Janeiro.', ''],
  ['Rua dos Inválidos', 'Lapa', 'Centro', 'Instituição ou função', 'O nome é associado à antiga presença, na região, de instalações ligadas ao amparo de militares inválidos.', ''],
  ['Rua da Alfândega', 'Centro', 'Centro', 'Instituição ou função', 'O nome deriva da função portuária e fiscal da Alfândega, central para a área comercial do antigo Rio.', ''],
  ['Rua da Assembleia', 'Centro', 'Centro', 'Instituição ou função', 'A denominação se relaciona à presença histórica da Assembleia e de instituições políticas na região central.', ''],
  ['Rua da Quitanda', 'Centro', 'Centro', 'Instituição ou função', 'O nome preserva a memória das antigas quitandas e do comércio miúdo estabelecido na área.', ''],
  ['Rua Visconde do Rio Branco', 'Centro', 'Centro', 'Personalidade', 'Homenageia José Maria da Silva Paranhos, Visconde do Rio Branco, político e diplomata do Império.', ''],
  ['Rua Senador Dantas', 'Centro', 'Centro', 'Personalidade', 'Homenageia Manuel Pinto de Sousa Dantas, político do Império e senador.', ''],
  ['Rua Evaristo da Veiga', 'Centro', 'Centro', 'Personalidade', 'Homenageia Evaristo da Veiga, jornalista, livreiro e político do século XIX.', ''],

  // Zona Sul — 20
  ['Avenida Atlântica', 'Copacabana', 'Zona Sul', 'Lugar', 'O nome faz referência ao oceano Atlântico, diante do qual a avenida se estende.', ''],
  ['Avenida Nossa Senhora de Copacabana', 'Copacabana', 'Zona Sul', 'Religioso', 'A denominação preserva a invocação de Nossa Senhora de Copacabana, ligada à origem do nome do bairro.', ''],
  ['Rua Barata Ribeiro', 'Copacabana', 'Zona Sul', 'Personalidade', 'Homenageia Cândido Barata Ribeiro, médico, professor e político que foi prefeito do então Distrito Federal.', ''],
  ['Rua Siqueira Campos', 'Copacabana', 'Zona Sul', 'Personalidade', 'Homenageia Antônio de Siqueira Campos, militar associado ao movimento tenentista.', ''],
  ['Rua Figueiredo Magalhães', 'Copacabana', 'Zona Sul', 'Personalidade', 'Antropônimo dedicado a Figueiredo Magalhães, nome ligado à história urbana de Copacabana.', ''],
  ['Rua Santa Clara', 'Copacabana', 'Zona Sul', 'Religioso', 'A denominação utiliza o nome de Santa Clara, referência da tradição cristã.', ''],
  ['Rua Dias Ferreira', 'Leblon', 'Zona Sul', 'Personalidade', 'Antropônimo em homenagem à personalidade registrada na toponímia como Dias Ferreira.', ''],
  ['Rua Ataulfo de Paiva', 'Leblon', 'Zona Sul', 'Personalidade', 'Homenageia Ataulfo Nápoles de Paiva, magistrado e jurista brasileiro.', ''],
  ['Rua Visconde de Pirajá', 'Ipanema', 'Zona Sul', 'Personalidade', 'A denominação homenageia o titular do Viscondado de Pirajá.', ''],
  ["Rua Garcia d'Ávila", 'Ipanema', 'Zona Sul', 'Personalidade', 'Homenageia Garcia d’Ávila, nome associado à colonização portuguesa e à Casa da Torre na Bahia.', ''],
  ['Rua Farme de Amoedo', 'Ipanema', 'Zona Sul', 'Personalidade', 'Homenageia Farme de Amoedo, médico e professor ligado à história da medicina no Brasil.', ''],
  ['Rua Prudente de Morais', 'Ipanema', 'Zona Sul', 'Personalidade', 'Homenageia Prudente de Morais, presidente da República entre 1894 e 1898.', ''],
  ['Avenida Epitácio Pessoa', 'Lagoa', 'Zona Sul', 'Personalidade', 'Homenageia Epitácio Pessoa, presidente da República entre 1919 e 1922.', ''],
  ['Avenida Borges de Medeiros', 'Lagoa', 'Zona Sul', 'Personalidade', 'Homenageia Antônio Augusto Borges de Medeiros, político gaúcho de longa atuação pública.', ''],
  ['Rua Jardim Botânico', 'Jardim Botânico', 'Zona Sul', 'Instituição ou função', 'A denominação deriva do Jardim Botânico do Rio de Janeiro, instituição e referência geográfica da região.', ''],
  ['Rua Voluntários da Pátria', 'Botafogo', 'Zona Sul', 'Evento ou lugar', 'Homenageia os Voluntários da Pátria, corpos de combatentes mobilizados durante a Guerra do Paraguai.', ''],
  ['Rua São Clemente', 'Botafogo', 'Zona Sul', 'Religioso', 'A denominação utiliza o nome de São Clemente, referência da tradição cristã.', ''],
  ['Rua Marquês de Abrantes', 'Flamengo', 'Zona Sul', 'Personalidade', 'Homenageia Miguel Calmon du Pin e Almeida, Marquês de Abrantes, político do Império.', ''],
  ['Rua Paissandu', 'Flamengo', 'Zona Sul', 'Evento ou lugar', 'O nome remete a Paysandú, no Uruguai, e aos conflitos platinos do século XIX.', ''],
  ['Rua Senador Vergueiro', 'Flamengo', 'Zona Sul', 'Personalidade', 'Homenageia Nicolau Pereira de Campos Vergueiro, político do período imperial.', ''],

  // Zona Norte — 20
  ['Rua Conde de Bonfim', 'Tijuca', 'Zona Norte', 'Personalidade', 'A denominação homenageia o titular do título nobiliárquico Conde de Bonfim.', ''],
  ['Rua Haddock Lobo', 'Tijuca', 'Zona Norte', 'Personalidade', 'Homenageia Roberto Jorge Haddock Lobo, médico e político ligado ao Rio de Janeiro no século XIX.', ''],
  ['Rua Mariz e Barros', 'Maracanã', 'Zona Norte', 'Personalidade', 'Homenageia Mariz e Barros, nome associado à Marinha do Brasil e à Guerra do Paraguai.', ''],
  ['Rua Maxwell', 'Vila Isabel', 'Zona Norte', 'Personalidade', 'A denominação deriva do sobrenome Maxwell, incorporado à toponímia local como antropônimo.', ''],
  ['Rua Barão de Mesquita', 'Tijuca', 'Zona Norte', 'Personalidade', 'Homenageia o titular do título de Barão de Mesquita.', ''],
  ['Rua Uruguai', 'Tijuca', 'Zona Norte', 'Lugar', 'O nome faz referência ao Uruguai, país sul-americano.', ''],
  ['Rua José Higino', 'Tijuca', 'Zona Norte', 'Personalidade', 'Homenageia José Higino Duarte Pereira, jurista, professor e político brasileiro.', ''],
  ['Avenida Maracanã', 'Maracanã', 'Zona Norte', 'Topônimo', 'O nome deriva do topônimo Maracanã, de origem indígena e associado a uma ave da família dos psitacídeos.', ''],
  ['Rua São Francisco Xavier', 'Tijuca', 'Zona Norte', 'Religioso', 'A denominação homenageia São Francisco Xavier, missionário jesuíta do século XVI.', ''],
  ['Boulevard Vinte e Oito de Setembro', 'Vila Isabel', 'Zona Norte', 'Data histórica', 'Remete a 28 de setembro de 1871, data da Lei do Ventre Livre.', ''],
  ['Rua Teodoro da Silva', 'Vila Isabel', 'Zona Norte', 'Personalidade', 'Antropônimo dedicado a Teodoro da Silva, nome preservado na memória urbana de Vila Isabel.', ''],
  ['Rua Visconde de Santa Isabel', 'Vila Isabel', 'Zona Norte', 'Personalidade', 'A denominação homenageia o titular do Viscondado de Santa Isabel.', ''],
  ['Rua Barão de São Francisco', 'Vila Isabel', 'Zona Norte', 'Personalidade', 'Homenageia o titular do título de Barão de São Francisco.', ''],
  ['Rua Dias da Cruz', 'Méier', 'Zona Norte', 'Personalidade', 'Antropônimo dedicado a Dias da Cruz, nome ligado à formação urbana da região do Méier.', ''],
  ['Rua Hermengarda', 'Méier', 'Zona Norte', 'Personalidade', 'A denominação deriva do nome próprio Hermengarda, preservado como antropônimo na toponímia local.', ''],
  ['Rua Arquias Cordeiro', 'Méier', 'Zona Norte', 'Personalidade', 'Homenageia Arquias Cordeiro, antropônimo incorporado à malha viária da Zona Norte.', ''],
  ['Rua Carolina Machado', 'Madureira', 'Zona Norte', 'Personalidade', 'A denominação preserva o nome Carolina Machado como referência pessoal na toponímia suburbana.', ''],
  ['Estrada do Portela', 'Madureira', 'Zona Norte', 'Topônimo', 'O nome é associado ao antigo topônimo Portela e à formação histórica dessa área de Madureira.', ''],
  ['Rua João Vicente', 'Madureira', 'Zona Norte', 'Personalidade', 'Antropônimo dedicado a João Vicente, nome preservado na toponímia da região.', ''],
  ['Rua Clarimundo de Melo', 'Encantado', 'Zona Norte', 'Personalidade', 'Homenageia Clarimundo de Melo, antropônimo ligado à história urbana dos subúrbios cariocas.', ''],

  // Zona Sudoeste — 20
  ['Avenida das Américas', 'Barra da Tijuca', 'Zona Sudoeste', 'Lugar', 'O nome faz referência às Américas e à integração continental presente na nomenclatura moderna da Barra.', ''],
  ['Avenida Ayrton Senna', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Ayrton Senna, piloto brasileiro tricampeão mundial de Fórmula 1.', ''],
  ['Avenida Lúcio Costa', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Lúcio Costa, arquiteto e urbanista responsável pelo plano-piloto da Barra da Tijuca.', ''],
  ['Avenida Embaixador Abelardo Bueno', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Abelardo Bueno, diplomata brasileiro lembrado pelo título de embaixador.', ''],
  ['Avenida Salvador Allende', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Salvador Allende, médico e presidente do Chile entre 1970 e 1973.', ''],
  ['Avenida Armando Lombardi', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Antropônimo dedicado a Armando Lombardi, nome incorporado à urbanização da Barra da Tijuca.', ''],
  ['Avenida Olegário Maciel', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Olegário Maciel, político mineiro e presidente de Minas Gerais no início da década de 1930.', ''],
  ['Avenida Érico Veríssimo', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Érico Veríssimo, escritor brasileiro e autor de O Tempo e o Vento.', ''],
  ['Avenida do Pepê', 'Barra da Tijuca', 'Zona Sudoeste', 'Personalidade', 'Homenageia Pedro Paulo Guise Carneiro Lopes, conhecido como Pepê, esportista ligado à história da Barra.', ''],
  ['Estrada do Joá', 'Joá', 'Zona Sudoeste', 'Topônimo', 'O nome deriva do topônimo Joá, tradicional na região e associado a vocabulário de origem indígena.', ''],
  ['Estrada dos Bandeirantes', 'Jacarepaguá', 'Zona Sudoeste', 'Evento ou lugar', 'A denominação remete aos bandeirantes e às expedições coloniais conhecidas como bandeiras.', ''],
  ['Estrada de Jacarepaguá', 'Jacarepaguá', 'Zona Sudoeste', 'Topônimo', 'O nome deriva de Jacarepaguá, topônimo de origem tupi tradicionalmente associado à presença de jacarés e áreas alagadas.', ''],
  ['Avenida Geremário Dantas', 'Freguesia', 'Zona Sudoeste', 'Personalidade', 'Homenageia Geremário Dantas, antropônimo associado à história urbana de Jacarepaguá.', ''],
  ['Estrada do Tindiba', 'Taquara', 'Zona Sudoeste', 'Topônimo', 'O nome deriva do topônimo Tindiba, de tradição indígena e preservado na região de Jacarepaguá.', ''],
  ['Estrada do Gabinal', 'Freguesia', 'Zona Sudoeste', 'Topônimo', 'A denominação preserva o antigo topônimo Gabinal na malha viária de Jacarepaguá.', ''],
  ['Estrada do Pau-Ferro', 'Freguesia', 'Zona Sudoeste', 'Natureza', 'O nome faz referência ao pau-ferro, árvore brasileira de madeira densa e resistente.', ''],
  ['Estrada do Cafundá', 'Taquara', 'Zona Sudoeste', 'Topônimo', 'O nome preserva Cafundá, topônimo popular associado historicamente à ideia de lugar afastado.', ''],
  ['Avenida Canal de Marapendi', 'Barra da Tijuca', 'Zona Sudoeste', 'Topônimo', 'A denominação deriva do Canal de Marapendi e do sistema lagunar que estrutura a paisagem da Barra.', ''],
  ['Avenida Gilka Machado', 'Recreio dos Bandeirantes', 'Zona Sudoeste', 'Personalidade', 'Homenageia Gilka Machado, poeta brasileira nascida no Rio de Janeiro.', ''],
  ['Avenida Genaro de Carvalho', 'Recreio dos Bandeirantes', 'Zona Sudoeste', 'Personalidade', 'Homenageia Genaro de Carvalho, artista brasileiro ligado às artes visuais.', ''],

  // Zona Oeste — 20
  ['Avenida Brasil', 'Zona Oeste', 'Zona Oeste', 'Lugar', 'A denominação homenageia o Brasil e reforça o caráter nacional da principal via de integração da cidade.', ''],
  ['Avenida Santa Cruz', 'Realengo', 'Zona Oeste', 'Religioso', 'O nome deriva do antigo caminho em direção à Fazenda de Santa Cruz e preserva uma referência cristã no topônimo.', ''],
  ['Estrada do Mendanha', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'A denominação deriva do Mendanha, topônimo associado ao maciço, ao bairro e à paisagem da Zona Oeste.', ''],
  ['Estrada do Monteiro', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'O nome preserva Monteiro, antigo topônimo e antropônimo associado à ocupação rural da região.', ''],
  ['Estrada do Cabuçu', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'A denominação deriva de Cabuçu, topônimo de origem indígena preservado na Zona Oeste.', ''],
  ['Estrada da Posse', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'O nome está ligado ao antigo topônimo Posse, associado à ocupação e à posse de terras na região.', ''],
  ['Estrada do Campinho', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'A denominação deriva de Campinho, forma diminutiva associada a um antigo lugar de campo aberto.', ''],
  ['Estrada do Mato Alto', 'Guaratiba', 'Zona Oeste', 'Natureza', 'O nome é descritivo da paisagem e remete a uma área historicamente identificada como Mato Alto.', ''],
  ['Estrada da Pedra', 'Santa Cruz', 'Zona Oeste', 'Natureza', 'A denominação deriva de uma referência geográfica à pedra e aos marcos naturais da área.', ''],
  ['Estrada do Magarça', 'Guaratiba', 'Zona Oeste', 'Topônimo', 'O nome preserva Magarça, topônimo tradicional da área de Guaratiba.', ''],
  ['Estrada do Pré', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'A denominação preserva Pré, antigo topônimo local cuja identificação histórica detalhada requer pesquisa documental específica.', ''],
  ['Estrada da Cachamorra', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'O nome deriva de Cachamorra, topônimo tradicional preservado na região de Campo Grande.', ''],
  ['Estrada do Rio A', 'Campo Grande', 'Zona Oeste', 'Natureza', 'A denominação está associada ao hidrônimo Rio A, referência hidrográfica local.', ''],
  ['Estrada da Caroba', 'Campo Grande', 'Zona Oeste', 'Natureza', 'O nome faz referência à caroba, denominação popular de árvores encontradas no Brasil.', ''],
  ['Rua Felipe Cardoso', 'Santa Cruz', 'Zona Oeste', 'Personalidade', 'Antropônimo dedicado a Felipe Cardoso, nome incorporado à toponímia central de Santa Cruz.', ''],
  ['Rua Fonseca', 'Bangu', 'Zona Oeste', 'Personalidade', 'A denominação utiliza o sobrenome Fonseca como antropônimo na malha urbana de Bangu.', ''],
  ['Rua Viúva Dantas', 'Campo Grande', 'Zona Oeste', 'Personalidade', 'O nome preserva a referência a uma mulher identificada historicamente como Viúva Dantas na memória local.', ''],
  ['Rua Campo Grande', 'Campo Grande', 'Zona Oeste', 'Topônimo', 'A denominação repete o topônimo Campo Grande, nome histórico do bairro e da extensa área da Zona Oeste.', ''],
  ['Rua Augusto de Vasconcelos', 'Campo Grande', 'Zona Oeste', 'Personalidade', 'Homenageia Augusto de Vasconcelos, antropônimo ligado à história urbana de Campo Grande.', ''],
  ['Rua Coronel Agostinho', 'Campo Grande', 'Zona Oeste', 'Personalidade', 'A denominação homenageia o personagem conhecido pelo título de Coronel Agostinho, preservado na toponímia local.', ''],
]

export const streetOrigins = RAW_STREETS.map(
  ([name, area, region, category, origin, previousName]) => ({
    id: slugify(name),
    name,
    area,
    region,
    category,
    previousName,
    origin,
    sourceNote: SOURCE_NOTE,
  }),
)

export const categories = [
  'Todos',
  ...Array.from(new Set(streetOrigins.map((street) => street.category))),
]

export const regions = [
  'Todas',
  'Centro',
  'Zona Norte',
  'Zona Sul',
  'Zona Sudoeste',
  'Zona Oeste',
]

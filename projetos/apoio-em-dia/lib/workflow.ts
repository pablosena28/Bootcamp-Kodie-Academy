export const rules:Record<string,{owner:string,priority:string,hours:number}>={
'Material de estudo':{owner:'Equipe pedagógica',priority:'Normal',hours:48},
'Monitoria':{owner:'Educadores',priority:'Normal',hours:48},
'Dificuldade de frequência':{owner:'Coordenação',priority:'Alta',hours:24},
'Acessibilidade':{owner:'Coordenação',priority:'Alta',hours:24},
'Outros':{owner:'Coordenação',priority:'Normal',hours:72}};
export function triage(category:string,now=new Date()){const rule=rules[category];if(!rule)throw new Error('Categoria inválida.');return {...rule,due:new Date(now.getTime()+rule.hours*3600000).toISOString()}}
export const transitions:Record<string,string[]>={'Novo':['Em atendimento'],'Em atendimento':['Resolvido'],'Resolvido':['Em atendimento']};

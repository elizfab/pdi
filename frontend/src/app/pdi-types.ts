export interface HeroData {
  nome: string;
  cargoAtual: string;
  area: string;
  ano: number;
  fraseImpacto: string;
  fraseImpactoCurta: string;
  descricaoCurta: string;
  avatarIniciais: string;
}

export interface PerfilData {
  nome: string;
  cargo: string;
  areaAtuacao: string;
  experiencia: string;
  tecnologiasPrincipais: string[];
  caracteristicas: string[];
  valores: string[];
  proposito: string;
  textoApresentacao: string;
  perguntasPreenchimento: string[];
}

export interface JornadaData {
  ondeComecei: string;
  ondeEstou: string;
  principaisMudancas: string;
  principaisAprendizados: string;
  principaisConquistas: string;
}

export interface Indicador {
  label: string;
  valor: string;
  sufixo: string;
  icone: string;
}

export interface TrajetoriaItem {
  ano: string;
  empresa: string;
  cargo: string;
  descricao: string;
  aprendizados: string;
  tecnologias: string[];
  conquistas: string;
}

export interface Conquista {
  titulo: string;
  data: string;
  categoria: string;
  descricao: string;
  status: string;
  impacto: string;
  _cat?: string;
}

export interface EntregaProfissional {
  projeto: string;
  problema: string;
  solucao: string;
  resultado: string;
  impacto: string;
  tecnologias: string[];
  metricas: string;
}

export interface EntregaVida {
  titulo: string;
  descricao: string;
}

export interface Meta {
  meta: string;
  prazo: string;
  prioridade: string;
  status: string;
  progresso: number;
  proximaAcao: string;
  categoria?: string;
  motivo?: string;
  comoAlcancar?: string;
  indicadorSucesso?: string;
}

export interface MetasProfissionais {
  curto: Meta[];
  medio: Meta[];
  longo: Meta[];
}

export interface MetasPessoais {
  curto: Meta[];
  medio: Meta[];
  longo: Meta[];
}

export interface FamiliaData {
  familia: string;
  filhos: string;
  experienciasQueQuero: string;
  objetivosFamiliares: string[];
  perguntas: string[];
}

export interface Sonho {
  titulo: string;
  categoria: string;
  porque: string;
  prazo: string;
  primeiroPasso: string;
  status: string;
}

export interface SonhoStatus {
  emoji: string;
  label: string;
}

export interface JornadaComparativa {
  antes: string;
  hoje: string;
  proximoNivel: string;
}

export interface MatrizItem {
  competencia: string;
  situacaoAtual: string;
  objetivo: string;
  acao: string;
  prazo: string;
  status: string;
}

export interface Estudo {
  nome: string;
  categoria: string;
  data: string;
  status: string;
  progresso: number;
  link: string;
}

export interface VisaoFuturo {
  umAno: string;
  tresAnos: string;
  cincoAnos: string;
  dezAnos: string;
}

export interface PlanoAcaoItem {
  tarefa: string;
  categoria: string;
  prazo: string;
  prioridade: string;
  status: string;
  dependencia: string;
  resultadoEsperado: string;
}

export interface DashboardData {
  metasConcluidas: number;
  metasEmAndamento: number;
  conquistas: number;
  projetos: number;
  certificacoes: number;
  metasPorCategoria: { categoria: string; valor: number }[];
  prazos: { categoria: string; valor: number }[];
}

export interface LinksData {
  curriculo: string;
  linkedin: string;
  github: string;
  portfolio: string;
  email: string;
}

export interface PdiData {
  hero: HeroData;
  perfil: PerfilData;
  jornada: JornadaData;
  indicadores: Indicador[];
  trajetoria: TrajetoriaItem[];
  conquistas: Record<string, Conquista[]>;
  perguntaConquista: string;
  entregasProfissionais: EntregaProfissional[];
  entregasVida: EntregaVida[];
  metasProfissionais: MetasProfissionais;
  metasPessoais: MetasPessoais;
  perguntasMetas: string[];
  familia: FamiliaData;
  sonhos: Sonho[];
  statusSonho: Record<string, SonhoStatus>;
  jornadaComparativa: JornadaComparativa;
  matrizCompetencias: MatrizItem[];
  estudos: Estudo[];
  visaoFuturo: VisaoFuturo;
  planoAcao: PlanoAcaoItem[];
  dashboard: DashboardData;
  links: LinksData;
}

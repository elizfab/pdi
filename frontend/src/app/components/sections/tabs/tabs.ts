import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import {
  Conquista,
  DashboardData,
  EntregaProfissional,
  EntregaVida,
  Estudo,
  FamiliaData,
  HeroData,
  Indicador,
  JornadaComparativa,
  JornadaData,
  MatrizItem,
  MetasPessoais,
  MetasProfissionais,
  PerfilData,
  PlanoAcaoItem,
  Sonho,
  SonhoStatus,
  TrajetoriaItem,
  VisaoFuturo,
} from '../../../pdi-types';
import { Conquistas } from '../conquistas/conquistas';
import { Entregas } from '../entregas/entregas';
import { Evolucao } from '../evolucao/evolucao';
import { Familia } from '../familia/familia';
import { Inicio } from '../inicio/inicio';
import { JornadaComparativaSection } from '../jornada-comparativa/jornada-comparativa';
import { Metas } from '../metas/metas';
import { PlanoAcao } from '../plano-acao/plano-acao';
import { Sobre } from '../sobre/sobre';
import { Sonhos } from '../sonhos/sonhos';
import { Trajetoria } from '../trajetoria/trajetoria';

interface PdiTab {
  id: string;
  label: string;
}

@Component({
  selector: 'pdi-tabs',
  standalone: true,
  imports: [
    CommonModule,
    LucideChevronLeft,
    LucideChevronRight,
    Inicio,
    Sobre,
    Trajetoria,
    Conquistas,
    Entregas,
    Metas,
    Familia,
    Sonhos,
    PlanoAcao,
    JornadaComparativaSection,
    Evolucao,
  ],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class PdiTabs implements OnInit, AfterViewInit {
  @Input() hero!: HeroData;
  @Input() perfil!: PerfilData;
  @Input() jornada!: JornadaData;
  @Input() indicadores!: Indicador[];
  @Input() trajetoria!: TrajetoriaItem[];
  @Input() conquistas!: Record<string, Conquista[]>;
  @Input() perguntaConquista!: string;
  @Input() entregasProfissionais!: EntregaProfissional[];
  @Input() entregasVida!: EntregaVida[];
  @Input() metasProfissionais!: MetasProfissionais;
  @Input() metasPessoais!: MetasPessoais;
  @Input() perguntaMeta!: string;
  @Input() familia!: FamiliaData;
  @Input() sonhos!: Sonho[];
  @Input() statusSonho!: Record<string, SonhoStatus>;
  @Input() planoAcao!: PlanoAcaoItem[];
  @Input() jornadaComparativa!: JornadaComparativa;
  @Input() dashboard!: DashboardData;
  @Input() matriz!: MatrizItem[];
  @Input() estudos!: Estudo[];
  @Input() visao!: VisaoFuturo;

  @Output() openModal = new EventEmitter<{ title: string; fields: [string, string][] }>();

  @ViewChild('tabBar') tabBar?: ElementRef<HTMLElement>;

  active = signal('inicio');
  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  tabs: PdiTab[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Apresentação' },
    { id: 'trajetoria', label: 'Trajetória' },
    { id: 'conquistas', label: 'Conquistas' },
    { id: 'entregas', label: 'Entregas' },
    { id: 'metas-profissionais', label: 'Carreira' },
    { id: 'metas-pessoais', label: 'Pessoal' },
    { id: 'familia', label: 'Família' },
    { id: 'sonhos', label: 'Sonhos' },
    { id: 'plano-acao', label: 'Execução' },
    { id: 'jornada', label: 'Jornada' },
    { id: 'painel', label: 'Painel' },
    { id: 'evolucao', label: 'Evolução' },
  ];

  ngOnInit(): void {
    const hash = window.location.hash.replace('#', '');
    if (this.tabs.some((t) => t.id === hash)) {
      this.active.set(hash);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateScroll());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScroll();
  }

  updateScroll(): void {
    const el = this.tabBar?.nativeElement;
    if (!el) {
      return;
    }
    this.canScrollLeft.set(el.scrollLeft > 1);
    this.canScrollRight.set(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  scrollTabs(dir: 1 | -1): void {
    const el = this.tabBar?.nativeElement;
    if (el) {
      el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: 'smooth' });
    }
  }

  select(id: string): void {
    this.active.set(id);
    history.replaceState(null, '', `#${id}`);
    // Mantém a aba ativa visível quando a barra tem scroll horizontal.
    document
      .getElementById(`tab-${id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Navegação por teclado (padrão WAI-ARIA tabs): setas, Home e End.
  onTabKeydown(event: KeyboardEvent): void {
    const ids = this.tabs.map((t) => t.id);
    const current = ids.indexOf(this.active());
    let next = -1;

    if (event.key === 'ArrowRight') {
      next = (current + 1) % ids.length;
    } else if (event.key === 'ArrowLeft') {
      next = (current - 1 + ids.length) % ids.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = ids.length - 1;
    }

    if (next >= 0) {
      event.preventDefault();
      this.select(ids[next]);
      document.getElementById(`tab-${ids[next]}`)?.focus();
    }
  }

  isActive(id: string): boolean {
    return this.active() === id;
  }
}

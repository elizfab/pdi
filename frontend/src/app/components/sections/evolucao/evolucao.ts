import { Component, ElementRef, Input, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardData, Estudo, LinksData, MatrizItem, VisaoFuturo } from '../../../pdi-types';
import { PdiService } from '../../../pdi.service';
import { ChartBars } from '../../shared/chart-bars/chart-bars';

@Component({
  selector: 'pdi-evolucao',
  imports: [CommonModule, ChartBars],
  templateUrl: './evolucao.html',
  styleUrl: './evolucao.css'
})
export class Evolucao implements AfterViewInit {
  @Input() variant: 'painel' | 'evolucao' | 'all' = 'all';
  @Input() dashboard!: DashboardData;
  @Input() matriz!: MatrizItem[];
  @Input() estudos!: Estudo[];
  @Input() visao!: VisaoFuturo;

  statusPillStyle = (s: string) => this.pdi.statusPillStyle(s);

  dashValues: { label: string; value: string }[] = [];
  roadmap: { label: string; text: string }[] = [];

  private readonly host = inject(ElementRef);

  constructor(private pdi: PdiService) {}

  ngOnInit(): void {
    this.dashValues = [
      { label: 'Metas concluídas', value: this.dashboard.metasConcluidas + '%' },
      { label: 'Metas em andamento', value: String(this.dashboard.metasEmAndamento) },
      { label: 'Conquistas', value: String(this.dashboard.conquistas) },
      { label: 'Projetos', value: String(this.dashboard.projetos) },
      { label: 'Certificações', value: String(this.dashboard.certificacoes) }
    ];

    this.roadmap = [
      { label: '1 ano', text: this.visao.umAno },
      { label: '3 anos', text: this.visao.tresAnos },
      { label: '5 anos', text: this.visao.cincoAnos },
      { label: '10 anos', text: this.visao.dezAnos }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.host.nativeElement
        .querySelectorAll('.goal-progress-fill[data-target]')
        .forEach((el: Element) => {
          const target = el.getAttribute('data-target');
          if (target) (el as HTMLElement).style.width = target + '%';
        });
    }, 100);
  }
}

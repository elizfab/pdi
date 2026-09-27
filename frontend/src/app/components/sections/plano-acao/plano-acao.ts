import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoAcaoItem } from '../../../pdi-types';
import { PdiService } from '../../../pdi.service';
import { FilterBar } from '../../shared/filter-bar/filter-bar';

@Component({
  selector: 'pdi-plano-acao',
  imports: [CommonModule, FilterBar],
  templateUrl: './plano-acao.html',
  styleUrl: './plano-acao.css'
})
export class PlanoAcao {
  @Input() items!: PlanoAcaoItem[];

  filter = 'todas';
  priorityClass = (p: string) => this.pdi.priorityBadgeClass(p);
  statusPillStyle = (s: string) => this.pdi.statusPillStyle(s);

  filters = [
    { value: 'todas', label: 'Todas' },
    { value: 'Não iniciado', label: 'Não iniciado' },
    { value: 'Em andamento', label: 'Em andamento' },
    { value: 'Concluído', label: 'Concluído' },
    { value: 'Pausado', label: 'Pausado' }
  ];

  constructor(private pdi: PdiService) {}

  filtered(): PlanoAcaoItem[] {
    return this.filter === 'todas' ? this.items : this.items.filter((t) => t.status === this.filter);
  }

  onFilterChange(value: string): void {
    this.filter = value;
  }
}

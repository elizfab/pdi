import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conquista } from '../../../pdi-types';
import { PdiService } from '../../../pdi.service';
import { FilterBar } from '../../shared/filter-bar/filter-bar';

@Component({
  selector: 'pdi-conquistas',
  imports: [CommonModule, FilterBar],
  templateUrl: './conquistas.html',
  styleUrl: './conquistas.css'
})
export class Conquistas implements OnInit {
  @Input() conquistas!: Record<string, Conquista[]>;
  @Input() pergunta!: string;
  @Output() openModal = new EventEmitter<{ title: string; fields: [string, string][] }>();

  conquistasFlat: Conquista[] = [];
  filter = 'todas';
  statusBadgeClass = (s: string) => this.pdi.statusBadgeClass(s);

  filters = [
    { value: 'todas', label: 'Todas' },
    { value: 'profissionais', label: 'Profissionais' },
    { value: 'pessoais', label: 'Pessoais' },
    { value: 'financeiras', label: 'Financeiras' },
    { value: 'familiares', label: 'Familiares' }
  ];

  constructor(private pdi: PdiService) {}

  ngOnInit(): void {
    this.conquistasFlat = [];
    Object.keys(this.conquistas).forEach((cat) => {
      this.conquistas[cat].forEach((item) => {
        this.conquistasFlat.push({ ...item, _cat: cat });
      });
    });
  }

  filteredItems(): Conquista[] {
    return this.filter === 'todas'
      ? this.conquistasFlat
      : this.conquistasFlat.filter((c) => c._cat === this.filter);
  }

  onFilterChange(value: string): void {
    this.filter = value;
  }

  open(c: Conquista): void {
    this.openModal.emit({
      title: c.titulo,
      fields: [
        ['Categoria', c.categoria],
        ['Data', c.data],
        ['Status', c.status],
        ['Impacto', c.impacto],
        ['Descrição', c.descricao]
      ]
    });
  }
}

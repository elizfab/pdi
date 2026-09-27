import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideRocket, LucideSparkles, LucideSprout, LucideTarget, LucideTrophy } from '@lucide/angular';
import { Sonho, SonhoStatus } from '../../../pdi-types';
import { FilterBar } from '../../shared/filter-bar/filter-bar';

@Component({
  selector: 'pdi-sonhos',
  imports: [CommonModule, FilterBar, LucideRocket, LucideSparkles, LucideSprout, LucideTarget, LucideTrophy],
  templateUrl: './sonhos.html',
  styleUrl: './sonhos.css'
})
export class Sonhos {
  @Input() sonhos!: Sonho[];
  @Input() statusMap!: Record<string, SonhoStatus>;

  filter = 'todas';

  filters = [
    { value: 'todas', label: 'Todos' },
    { value: 'Profissional', label: 'Profissional' },
    { value: 'Pessoal', label: 'Pessoal' },
    { value: 'Financeiro', label: 'Financeiro' },
    { value: 'Viagem', label: 'Viagem' },
    { value: 'Casa', label: 'Casa' },
    { value: 'Aprendizado', label: 'Aprendizado' }
  ];

  filtered(): Sonho[] {
    return this.filter === 'todas' ? this.sonhos : this.sonhos.filter((s) => s.categoria === this.filter);
  }

  onFilterChange(value: string): void {
    this.filter = value;
  }
}

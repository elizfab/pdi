import { Injectable } from '@angular/core';
import { PdiData } from './pdi-types';
import { PDI_DATA } from './pdi-data';

@Injectable({
  providedIn: 'root'
})
export class PdiService {
  readonly data: PdiData = PDI_DATA;

  statusBadgeClass(status: string): string {
    const map: Record<string, string> = {
      'Concluído': 'badge-green',
      'Em andamento': 'badge-blue',
      'Não iniciado': 'badge-yellow',
      'Pausado': 'badge-pink',
      'Planejado': 'badge-orange'
    };
    return map[status] || 'badge-orange';
  }

  priorityBadgeClass(priority: string): string {
    const map: Record<string, string> = { 'Alta': 'badge-pink', 'Média': 'badge-yellow', 'Baixa': 'badge-blue' };
    return map[priority] || 'badge-orange';
  }

  statusPillStyle(status: string): string {
    const map: Record<string, { bg: string; fg: string }> = {
      'Concluído': { bg: '#43A047', fg: '#fff' },
      'Em andamento': { bg: '#1976D2', fg: '#fff' },
      'Não iniciado': { bg: '#FFCA28', fg: '#5c4300' },
      'Pausado': { bg: '#EC407A', fg: '#fff' },
      'Planejado': { bg: '#FF6200', fg: '#fff' }
    };
    const s = map[status] || { bg: '#90A4AE', fg: '#fff' };
    return `background:${s.bg};color:${s.fg};`;
  }
}

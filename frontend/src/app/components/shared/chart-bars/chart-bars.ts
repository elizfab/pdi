import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  categoria: string;
  valor: number;
}

@Component({
  selector: 'pdi-chart-bars',
  imports: [CommonModule],
  templateUrl: './chart-bars.html',
  styleUrl: './chart-bars.css'
})
export class ChartBars implements OnChanges {
  @Input() data: ChartData[] = [];

  palette = ['#FF6200', '#EC407A', '#1976D2', '#43A047', '#FFCA28'];
  bars: { label: string; value: number; pct: number; color: string }[] = [];

  ngOnChanges(): void {
    this.render();
  }

  private render(): void {
    const values = this.data.map(d => d.valor);
    const max = Math.max(1, ...values);

    this.bars = this.data.map((item, i) => ({
      label: item.categoria,
      value: item.valor,
      pct: Math.round((item.valor / max) * 100),
      color: this.palette[i % this.palette.length]
    }));
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrajetoriaItem } from '../../../pdi-types';

@Component({
  selector: 'pdi-trajetoria',
  imports: [CommonModule],
  templateUrl: './trajetoria.html',
  styleUrl: './trajetoria.css'
})
export class Trajetoria {
  @Input() items!: TrajetoriaItem[];
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntregaProfissional, EntregaVida } from '../../../pdi-types';

@Component({
  selector: 'pdi-entregas',
  imports: [CommonModule],
  templateUrl: './entregas.html',
  styleUrl: './entregas.css'
})
export class Entregas {
  @Input() profissionais!: EntregaProfissional[];
  @Input() vida!: EntregaVida[];
}

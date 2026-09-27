import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowRight } from '@lucide/angular';
import { JornadaComparativa as JornadaComparativaData } from '../../../pdi-types';

@Component({
  selector: 'pdi-jornada-comparativa',
  imports: [CommonModule, LucideArrowRight],
  templateUrl: './jornada-comparativa.html',
  styleUrl: './jornada-comparativa.css'
})
export class JornadaComparativaSection {
  @Input() data!: JornadaComparativaData;
}

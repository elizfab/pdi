import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideChevronDown } from '@lucide/angular';
import { HeroData, Indicador, JornadaData, PerfilData } from '../../../pdi-types';

@Component({
  selector: 'pdi-sobre',
  imports: [CommonModule, LucideChevronDown],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {
  @Input() hero!: HeroData;
  @Input() perfil!: PerfilData;
  @Input() jornada!: JornadaData;
  @Input() indicadores!: Indicador[];

  readonly jornadaOpen = signal(false);

  toggleJornada(): void {
    this.jornadaOpen.update((open) => !open);
  }
}

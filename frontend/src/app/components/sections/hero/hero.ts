import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroData } from '../../../pdi-types';

@Component({
  selector: 'pdi-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  @Input() data!: HeroData;
}

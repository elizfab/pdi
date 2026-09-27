import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliaData } from '../../../pdi-types';

@Component({
  selector: 'pdi-familia',
  imports: [CommonModule],
  templateUrl: './familia.html',
  styleUrl: './familia.css'
})
export class Familia {
  @Input() data!: FamiliaData;
}

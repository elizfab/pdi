import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideHeart } from '@lucide/angular';
import { LinksData } from '../../../pdi-types';

@Component({
  selector: 'pdi-footer',
  imports: [CommonModule, LucideHeart],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  @Input() ano!: number;
  @Input() links!: LinksData;

  linkItems = [
    { key: 'curriculo' as const, label: 'Currículo' },
    { key: 'linkedin' as const, label: 'LinkedIn' },
    { key: 'github' as const, label: 'GitHub' },
    { key: 'portfolio' as const, label: 'Portfólio' },
    { key: 'email' as const, label: 'E-mail' }
  ];
}

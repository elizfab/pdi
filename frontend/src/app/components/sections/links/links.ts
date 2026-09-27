import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideFileText, LucideGlobe, LucideMail } from '@lucide/angular';
import { LinksData } from '../../../pdi-types';

@Component({
  selector: 'pdi-links',
  imports: [CommonModule, LucideFileText, LucideGlobe, LucideMail],
  templateUrl: './links.html',
  styleUrl: './links.css'
})
export class Links {
  @Input() data!: LinksData;

  items = [
    { key: 'curriculo' as const, label: 'Currículo', icon: 'file', color: 'var(--dark)' },
    { key: 'linkedin' as const, label: 'LinkedIn', icon: 'linkedin', color: 'var(--blue)' },
    { key: 'github' as const, label: 'GitHub', icon: 'github', color: '#24292e' },
    { key: 'portfolio' as const, label: 'Portfólio', icon: 'globe', color: 'var(--pink)' },
    { key: 'email' as const, label: 'E-mail', icon: 'mail', color: 'var(--orange)' }
  ];
}

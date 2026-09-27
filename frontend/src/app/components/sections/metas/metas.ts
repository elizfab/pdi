import { Component, ElementRef, Input, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, MetasPessoais, MetasProfissionais } from '../../../pdi-types';
import { PdiService } from '../../../pdi.service';

@Component({
  selector: 'pdi-metas',
  imports: [CommonModule],
  templateUrl: './metas.html',
  styleUrl: './metas.css'
})
export class Metas implements AfterViewInit {
  @Input() variant: 'prof' | 'pessoal' | 'all' = 'all';
  @Input() profissionais!: MetasProfissionais;
  @Input() pessoais!: MetasPessoais;
  @Input() pergunta!: string;

  private readonly host = inject(ElementRef);

  constructor(private pdi: PdiService) {}

  priorityClass = (p: string) => this.pdi.priorityBadgeClass(p);
  statusClass = (s: string) => this.pdi.statusBadgeClass(s);

  ngAfterViewInit(): void {
    this.animateProgressBars();
  }

  animateProgressBars(): void {
    setTimeout(() => {
      this.host.nativeElement
        .querySelectorAll('.goal-progress-fill[data-target]')
        .forEach((el: Element) => {
          const target = el.getAttribute('data-target');
          if (target) (el as HTMLElement).style.width = target + '%';
        });
    }, 100);
  }
}

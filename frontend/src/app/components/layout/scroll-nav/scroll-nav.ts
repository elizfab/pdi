import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideChevronDown, LucideChevronUp } from '@lucide/angular';

/**
 * Navegação rápida da página: botão fixo à direita que desce
 * seção por seção (início → seções → conexão → footer) e, ao
 * chegar no footer, passa a subir seção por seção.
 */
@Component({
  selector: 'pdi-scroll-nav',
  imports: [CommonModule, LucideChevronDown, LucideChevronUp],
  templateUrl: './scroll-nav.html',
  styleUrl: './scroll-nav.css'
})
export class ScrollNav {
  readonly direction = signal<'down' | 'up'>('down');

  private targets(): HTMLElement[] {
    const els: HTMLElement[] = [];
    for (const id of ['inicio', 'secoes', 'links', 'fim']) {
      const el = document.getElementById(id);
      if (el) {
        els.push(el);
      }
    }
    return els;
  }

  private currentIndex(sections: HTMLElement[]): number {
    const headerH =
      document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 80;
    const anchor = window.scrollY + headerH + 16;
    let idx = 0;
    sections.forEach((el, i) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= anchor) {
        idx = i;
      }
    });
    return idx;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const sections = this.targets();
    if (!sections.length) {
      return;
    }
    const idx = this.currentIndex(sections);
    if (idx >= sections.length - 1) {
      this.direction.set('up');
    } else if (idx === 0) {
      this.direction.set('down');
    }
  }

  goNext(): void {
    const sections = this.targets();
    if (!sections.length) {
      return;
    }
    const idx = this.currentIndex(sections);
    const last = sections.length - 1;

    if (this.direction() === 'down') {
      if (idx >= last) {
        this.direction.set('up');
        this.scrollTo(sections[last - 1]);
      } else {
        this.scrollTo(sections[idx + 1]);
      }
    } else {
      if (idx <= 0) {
        this.direction.set('down');
        this.scrollTo(sections[1] ?? sections[0]);
      } else {
        this.scrollTo(sections[idx - 1]);
      }
    }
  }

  private scrollTo(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

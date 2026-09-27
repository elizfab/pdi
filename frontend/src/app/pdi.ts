import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { PdiService } from './pdi.service';
import { PdiData } from './pdi-types';

import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { ScrollProgress } from './components/layout/scroll-progress/scroll-progress';
import { BackToTop } from './components/layout/back-to-top/back-to-top';
import { Modal } from './components/shared/modal/modal';

import { Hero } from './components/sections/hero/hero';
import { PdiTabs } from './components/sections/tabs/tabs';
import { Links } from './components/sections/links/links';

interface ModalPayload {
  title: string;
  fields: [string, string][];
}

@Component({
  selector: 'app-pdi',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer,
    ScrollProgress,
    BackToTop,
    Modal,
    Hero,
    PdiTabs,
    Links,
  ],
  templateUrl: './pdi.html',
})
export class Pdi implements OnInit, AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  private readonly pdi = inject(PdiService);
  private readonly title = inject(Title);

  data!: PdiData;

  readonly isDark = signal(false);

  modalOpen = false;
  modalTitle = '';
  modalFields: { label: string; value: string }[] = [];

  private previousTitle = '';
  private logoEl: HTMLLinkElement | null = null;
  private previouslogo = '';

  ngOnInit(): void {
    this.data = this.pdi.data;
    this.previousTitle = this.title.getTitle();
    this.title.setTitle('PDI — Elizabete Sousa Fabri | Plano de Desenvolvimento Individual');
    this.swaplogo('/images/icons/ef.svg');
    this.loadPdiStyles();
    this.initDarkMode();
  }

  ngAfterViewInit(): void {
    this.initRevealOnScroll();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    if (this.previousTitle) {
      this.title.setTitle(this.previousTitle);
    }
    if (this.logoEl && this.previouslogo) {
      this.logoEl.href = this.previouslogo;
    }
  }

  // pdi.scss é buildada como folha separada (inject:false em angular.json)
  // e carregada sob demanda apenas nesta rota.
  private loadPdiStyles(): void {
    if (document.querySelector('link[data-pdi-styles]')) {
      return;
    }
    /* Evita FOUC: esconde o app ate o pdi.css carregar — sem isso a
       pagina renderiza sem estilo (tudo a esquerda) no primeiro paint */
    const host = this.host.nativeElement as HTMLElement;
    host.style.visibility = 'hidden';
    const reveal = () => {
      host.style.visibility = '';
    };

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pdi.css';
    link.setAttribute('data-pdi-styles', '');
    link.addEventListener('load', reveal, { once: true });
    link.addEventListener('error', reveal, { once: true });
    window.setTimeout(reveal, 2000);
    document.head.appendChild(link);
  }

  private swaplogo(href: string): void {
    this.logoEl = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    if (!this.logoEl) {
      return;
    }
    this.previouslogo = this.logoEl.href;
    this.logoEl.href = href;
  }

  toggleDarkMode(): void {
    this.isDark.update((value) => !value);
    try {
      localStorage.setItem('pdi-theme', this.isDark() ? 'dark' : 'light');
    } catch {
      // localStorage indisponível
    }
  }

  printPage(): void {
    window.print();
  }

  onOpenModal(payload: ModalPayload): void {
    this.modalTitle = payload.title;
    this.modalFields = payload.fields.map(([label, value]) => ({ label, value }));
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  onCloseModal(): void {
    this.modalOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.modalOpen) {
      this.onCloseModal();
    }
  }

  private initDarkMode(): void {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('pdi-theme');
    } catch {
      // localStorage indisponível
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.isDark.set((saved ?? (prefersDark ? 'dark' : 'light')) === 'dark');
  }

  private initRevealOnScroll(): void {
    const targets: NodeListOf<HTMLElement> =
      this.host.nativeElement.querySelectorAll('[data-anim]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((t) => io.observe(t));
  }
}

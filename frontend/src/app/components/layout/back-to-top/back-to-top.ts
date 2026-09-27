import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowUp } from '@lucide/angular';

@Component({
  selector: 'pdi-back-to-top',
  imports: [CommonModule, LucideArrowUp],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.css'
})
export class BackToTop {
  visible = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible = window.scrollY > 480;
  }

  goToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pdi-scroll-progress',
  imports: [CommonModule],
  templateUrl: './scroll-progress.html',
  styleUrl: './scroll-progress.css'
})
export class ScrollProgress {
  width = '0%';

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    this.width = pct + '%';
  }
}

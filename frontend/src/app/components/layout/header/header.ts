import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideMoon, LucidePrinter, LucideSun } from '@lucide/angular';

@Component({
  selector: 'pdi-header',
  standalone: true,
  imports: [CommonModule, LucideMoon, LucidePrinter, LucideSun],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() ano = new Date().getFullYear();
  @Input() iniciais = 'EF';
  @Input() isDark = false;

  readonly homeHref = 'https://elizabetesousafabri.com.br/';
  @Output() toggleDark = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onPrint(): void {
    this.print.emit();
  }
}

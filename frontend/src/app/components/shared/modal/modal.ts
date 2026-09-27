import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ModalField {
  label: string;
  value: string;
}

@Component({
  selector: 'pdi-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() title = '';
  @Input() fields: ModalField[] = [];
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'modalOverlay') {
      this.close.emit();
    }
  }
}

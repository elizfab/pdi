import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FilterOption {
  value: string;
  label: string;
}

@Component({
  selector: 'pdi-filter-bar',
  imports: [CommonModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css'
})
export class FilterBar {
  @Input() options: FilterOption[] = [];
  @Input() active = '';
  @Output() filterChange = new EventEmitter<string>();

  select(value: string): void {
    this.filterChange.emit(value);
  }
}

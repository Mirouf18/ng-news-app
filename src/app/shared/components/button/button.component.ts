import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = '';
  @Input() href?: string;
  @Input() target?: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() className = 'primary';
  @Output() clicked = new EventEmitter<Event>();

  onClick(e: Event) {
    if (this.href) {
      e.preventDefault();
      e.stopPropagation();
      this.clicked.emit(e);
    } else {
      this.clicked.emit(e);
    }
  }
}

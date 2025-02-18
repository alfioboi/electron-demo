import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-backward-icon',
  standalone: true,
  imports: [],
  template: `
    <button class="btn mr-2" type="button" (click)="backWardClicked()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
      </svg>
    </button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackwardIconComponent {
  @Output() backWardClick: EventEmitter<void> = new EventEmitter<void>();

  backWardClicked() {
    this.backWardClick.emit();
  }
}

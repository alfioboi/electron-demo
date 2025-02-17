import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {PageTitleComponent} from "./page-title.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  template: `
    <app-page-title [title]="title"></app-page-title>
    <p>
      contact works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  title = signal('Contacts');
}

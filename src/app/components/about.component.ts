import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {PageTitleComponent} from "./page-title.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  template: `
    <app-page-title [title]="title" />
    <p>
      about works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  title = signal('About us');
}

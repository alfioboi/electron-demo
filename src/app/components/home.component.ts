import {Component, signal} from '@angular/core';
import {ChangeDetectionStrategy} from "@angular/core";
import {PageTitleComponent} from "./page-title.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  template: `
    <app-page-title [title]="title"></app-page-title>
    <p>
      home works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly title = signal('HomePage')
}

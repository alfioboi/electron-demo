import {Component, signal} from '@angular/core';
import {ChangeDetectionStrategy} from "@angular/core";
import {PageTitleComponent} from "./page-title.component";
import {SlideComponent} from "./slide.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageTitleComponent,
    SlideComponent
  ],
  template: `
    <app-page-title [title]="title"></app-page-title>
    <app-slide>
      <div slot="header">Fino a qui ci passa</div>
      <div slot="content">Fino a qui ci passa</div>
      <div slot="footer">Fino a qui ci passa</div>
    </app-slide>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly title = signal('HomePage')
}

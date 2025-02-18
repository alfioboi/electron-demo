import {Component, signal} from '@angular/core';
import {ChangeDetectionStrategy} from "@angular/core";
import {SlideCoverComponent} from "./slide-cover.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SlideCoverComponent
  ],
  template: `
    @switch (page()) {
      @case (1) {
        <app-slide>
          <div slot="header">Electron</div>
          <div slot="content">Usare Javascript per creare applicazioni Desktop</div>
          <div slot="footer">Marzo 2025</div>
        </app-slide>
      }
      @case (2) {
        <app-slide>
          <div slot="header">Indice</div>
          <div slot="content">Qui va l'indice del talk</div>
          <div slot="footer"></div>
        </app-slide>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly title = signal('HomePage');
  maxPage = 2;
  page = signal<number>(1);
}

import {ChangeDetectionStrategy, Component, Input, Signal} from '@angular/core';
import {BackwardIconComponent} from "./backward-icon.component";
import {ForwardIconComponent} from "./forward-icon.component";
import {PageService} from "../services/page.service";

@Component({
  selector: 'app-footer-of-slide',
  standalone: true,
  imports: [
    BackwardIconComponent,
    ForwardIconComponent
  ],
  template: `
    <div class="footer-content">
      <div>
        @if (hasBackward()) {
          <app-backward-icon (backWardClick)="goPreviousPage()"/>
        }
      </div>
      <div class="bg-white rounded-lg p-2">
        @if (getPageLabel()) {
          <span>{{ getPageLabel()() }}</span>
        }
      </div>
      <div>
        @if (hasForward()) {
          <app-forward-icon (forwardClick)="goNextPage()"/>
        }
      </div>
    </div>

  `,
  styles: `
    .footer-content {
      flex: 0 0 auto; /* Non contribuisce all'altezza totale */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: start; /* Miglioramento dell'allineamento */
      margin-top: -4.5em; /* Sposta verso l'alto la sezione */
      width: 100%;
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterOfSlideComponent {
  @Input() componentName!: string;

  constructor(private pageService: PageService) {}

  hasBackward() {
    return this.pageService.hasBackward(this.componentName)();
  }
  hasForward() {
    return this.pageService.hasForward(this.componentName)();
  }
  getPageLabel(): Signal<string> {
    return this.pageService.getPageLabelSignal(this.componentName);
  }
  goNextPage() {
    this.pageService.goNextPage(this.componentName);
  }
  goPreviousPage() {
    this.pageService.goToPreviousPage(this.componentName);
  }
}

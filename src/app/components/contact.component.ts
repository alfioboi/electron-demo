import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SlideFreeComponent} from "./slide-free.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    SlideFreeComponent
  ],
  template: `
    <app-slide-free [hasBackward]="false" [hasForward]="false">
      <div class="flex items-center justify-center h-full w-full mt-8">
        <img [src]="'qrcode.png'" alt="Qr code del progetto" class="w-90 h-90 object-cover">
      </div>
    </app-slide-free>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
}

import {Component} from '@angular/core';
import {ChangeDetectionStrategy} from "@angular/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p>
      home works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}

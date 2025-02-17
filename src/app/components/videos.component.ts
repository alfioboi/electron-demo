import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [],
  template: `
    <p>
      videos works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideosComponent {

}

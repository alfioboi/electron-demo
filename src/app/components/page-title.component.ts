import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  template: `
    <h1 class="text-4xl font-bold text-center text-gray-800 my-4">
      {{ title() }}
    </h1>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
  @Input() title!: () => string;
}

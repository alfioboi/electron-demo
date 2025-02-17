import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <header class="bg-primary text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Applicazione dimostrativa di Electron</h1>
        <nav>
          <ul class="flex space-x-4">
            <li> <a [routerLink]="'home'" routerLinkActive="text-yellow-300" class="hover:underline">Home</a></li>
            <li><a [routerLink]="'about'" routerLinkActive="text-yellow-300"  class="hover:underline">About us</a></li>
            <li><a  [routerLink]="'expenses'" routerLinkActive="text-yellow-300" class="hover:underline">Expenses</a></li>
            <li><a [routerLink]="'contacts'" routerLinkActive="text-yellow-300"  class="hover:underline">Contacts</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}

import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ElectronService} from "./services/electron.service";
import {HeaderComponent} from "./components/header.component";
import {FooterComponent} from "./components/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header class="sticky top-0 z-50"/>
      <main class="flex-grow container mx-auto p-4">
        <h2 class="text-xl font-semibold mb-4">Welcome to My Website</h2>
        <p>This is a responsive layout example using Tailwind CSS and DaisyUI.</p>
        <router-outlet/>
      </main>
      <app-footer class="mt-auto"/>
    </div>
  `,
  styles: ``
})
export class AppComponent {
  title = 'talk-electron-demo';
  constructor(private electronService: ElectronService) {
    this.electronService.on('salutaAngular', (message) => {
      console.log('message received: ', message);
    });
    this.electronService.send('salutaNode', 'Hello from Angular');
  }
}

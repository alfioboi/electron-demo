import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
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
      <main class="flex-grow w-full p-4">
        <router-outlet/>
      </main>
      <app-footer class="mt-auto"/>
    </div>
  `,
  styles: ``
})
export class AppComponent {
  title = 'talk-electron-demo';
  constructor(private electronService: ElectronService, private router: Router) {
    this.electronService.on('salutaAngular', (message) => {
      console.log('message received: ', message);
    });
    this.electronService.on('navigate', (route: string) => {
      this.router.navigate([route]).then();
    })
    this.electronService.send('salutaNode', 'Hello from Angular');
  }
}

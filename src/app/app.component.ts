import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ElectronService} from "./services/electron.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'talk-electron-demo';
  constructor(private electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.electronService.on('salutaAngular', (message) => {
      console.log('message received: ', message);
    });
    this.electronService.send('salutaNode', 'Hello from Angular');
  }


}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SlideFreeComponent} from "./slide-free.component";

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    SlideFreeComponent
  ],
  template: `
    <app-slide-free [hasBackward]="false" [hasForward]="false">
      <div class="flex items-center justify-center h-full w-full mt-8 font-family: 'Segoe UI'">
          <div class="text-center w-full"><h1 class="text-4xl font-bold">Cosa è Electron e a cosa serve?</h1></div>
          <div class="text-2xl text-justify w-full">
            Electron è un framework open-source che permette agli sviluppatori di implementare
            applicazioni desktop cross-platform utilizzando tecnologie web come HTML, CSS e JavaScript.
            Combina il motore di rendering Chromium e il runtime Node.js in un unico ambiente, permettendo
            di creare applicazioni desktop che possono essere eseguite su Windows, macOS e Linux.<br>
            Le caratteristiche principali di Electron comprendono:
            <ul class="list-disc list-inside mt-4 mb-4">
              <li><b>Cross-Platform: </b>Utilizzi lo stesso codice sorgente per più sistemi operativi</li>
              <li><b>Tecnologie Web: </b>Utilizzi tecnologie familiari per costruire applicazioni desktop</li>
              <li><b>Integrazione con Node.js: </b>Hai accesso alle API di Node.js per le funzionalità di backend</li>
              <li><b>Motore Chromium: </b>Ti fornisce un motore di rendering robusto attraverso diverse piattaforme</li>
              <li><b>Ecosistema maturo: </b>Puoi utilizzare una vasta gamma di librerie e moduli npm</li>
            </ul>
            Electron è attualmente utilizzato per costruire applicazioni come Visual Studio Code, Slack e GitHub Desktop.
          </div>
      </div>
    </app-slide-free>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent {

}

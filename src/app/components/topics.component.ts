import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {SlideFreeComponent} from "./slide-free.component";
import {PageService} from "../services/page.service";

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    SlideFreeComponent
  ],
  template: `
    @switch ((page?.())) {
      @case (1) {
        <app-slide-free [hasBackward]="false" [hasForward]="true" (forWardClick)="page?.set(2)">
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
                <li><b>Motore Chromium: </b>Ti fornisce un motore di rendering robusto attraverso diverse piattaforme
                </li>
                <li><b>Ecosistema maturo: </b>Puoi utilizzare una vasta gamma di librerie e moduli npm</li>
              </ul>
              Electron è attualmente utilizzato per costruire applicazioni come Visual Studio Code, Slack e GitHub
              Desktop.
            </div>
          </div>
        </app-slide-free>
      }
      @case (2) {
        <app-slide-free [hasBackward]="true" [hasForward]="true" (forWardClick)="page?.set(2)" (backWardClick)="page?.set(1)">
          <div class="flex items-center justify-center h-full w-full mt-8 font-family: 'Segoe UI'">
            <div class="text-center w-full"><h1 class="text-4xl font-bold">Installare Electron su un progetto Angular</h1></div>
            <div class="text-2xl text-justify w-full">
              Per aggiungere Electron ad un progetto Angular è necessario seguire questi passaggi:
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="checkbox" class="accordion-checkbox" />
                <div class="collapse-title text-xl font-medium">
                  Installare la dipendenza Electron
                </div>
                <div class="collapse-content">
                  <p>Tramite il comando <i>npm install electron --save-dev</i> dobbiamo installare la dipendenza, tra le devDependencies naturalmente, dal pacchetto Electron.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="checkbox" class="accordion-checkbox" />
                <div class="collapse-title text-xl font-medium">
                  Installare la dipendenza del builder di Electron
                </div>
                <div class="collapse-content">
                  <p>A cose fatte avremo bisogno di produrre degli artefatti per cui è necessario installare la dipendenza dal pacchetto che permette di effettuare la build di Electron tra le dipendenze di sviluppo tramite il comando <i>npm install electron --save-dev</i>.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="checkbox" class="accordion-checkbox" />
                <div class="collapse-title text-xl font-medium">
                  Modificare il file <i>package.json</i>
                </div>
                <div class="collapse-content">
                  <p>A questo punto avremo necessità di modificare il nostro package.json per aggiungere le informazioni relative al progetto, indicare il punto di ingresso della parte node, aggiungere dei comandi personalizzati che permettando di eseguire le operazioni su Electron, aggiungere il blocco di build che fornisce al builder di Electron le informazioni necessarie per la creazione degli artefatti.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="checkbox" class="accordion-checkbox" />
                <div class="collapse-title text-xl font-medium">
                  Creare il file main.ts
                </div>
                <div class="collapse-content">
                  <p>Avendo indicato il punto di ingresso della parte Node.js (solitamente chiamata main.ts) dovremo ovviamente crearla.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="checkbox" class="accordion-checkbox" />
                <div class="collapse-title text-xl font-medium">
                  Creare le condizioni per far comunicare Angular con Node.js
                </div>
                <div class="collapse-content">
                  <p>La parte frontend e quella backend comunicano attraverso un protocollo di messagistica chiamato IPCRender. Se vogliamo mantenere l'impostazione <i>contextIsolation</i> a <i>true</i> sarà necessario creare uno script che permetta ad Angular di accedere alle API di detto protocollo.</p>
                </div>
              </div>
            </div>
          </div>
        </app-slide-free>
      }
    }
  `,
  styles: `
    .accordion-checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent {
  page: WritableSignal<number | undefined> | undefined = undefined;

  constructor(private pageService: PageService) {
    this.page = this.pageService.getPageSignal('TopicsComponent');
  }

}

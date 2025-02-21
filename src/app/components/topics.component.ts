import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {SlideFreeComponent} from "./slide-free.component";
import {PageService} from "../services/page.service";
import {AccordionStateService} from "../services/accordion-state.service";

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    SlideFreeComponent
  ],
  template: `
    @switch ((page?.())) {
      @case (1) {
        <app-slide-free [componentName]="componentName">
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
        <app-slide-free [componentName]="componentName">
          <div class="flex items-center justify-center h-full w-full mt-8 font-family: 'Segoe UI'">
            <div class="text-center w-full">
              <h1 class="text-4xl font-bold">Installare Electron su un progetto Angular</h1>
            </div>
            <div class="text-2xl text-justify w-full">
              Per aggiungere Electron ad un progetto Angular è necessario seguire questi passaggi:
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="radio" name="my-accordion-4" [checked]="isAccordionOpen('TopicsSlide2Number1', 1)"
                       (click)="avoidPropagation($event)"/>
                <div class="collapse-title text-xl font-medium" (click)="toggleAccordionItem('TopicsSlide2Number1', 1)">
                  Installare la dipendenza Electron
                </div>
                <div class="collapse-content">
                  <p>Tramite il comando <i>npm install electron --save-dev</i> dobbiamo installare la dipendenza, tra le
                    devDependencies naturalmente, dal pacchetto Electron.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="radio" name="my-accordion-4" [checked]="isAccordionOpen('TopicsSlide2Number1', 2)"
                       (click)="avoidPropagation($event)"/>
                <div class="collapse-title text-xl font-medium" (click)="toggleAccordionItem('TopicsSlide2Number1', 2)">
                  Installare la dipendenza del builder di Electron
                </div>
                <div class="collapse-content">
                  <p>A cose fatte avremo bisogno di produrre degli artefatti per cui è necessario installare la
                    dipendenza dal pacchetto che permette di effettuare la build di Electron tra le dipendenze di
                    sviluppo tramite il comando <i>npm install electron --save-dev</i>.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="radio" name="my-accordion-4" [checked]="isAccordionOpen('TopicsSlide2Number1', 3)"
                       (click)="avoidPropagation($event)"/>
                <div class="collapse-title text-xl font-medium" (click)="toggleAccordionItem('TopicsSlide2Number1', 3)">
                  Modificare il file <i>package.json</i>
                </div>
                <div class="collapse-content">
                  <p>A questo punto avremo necessità di modificare il nostro package.json per aggiungere le informazioni
                    relative al progetto, indicare il punto di ingresso della parte node, aggiungere dei comandi
                    personalizzati che permettando di eseguire le operazioni su Electron, aggiungere il blocco di build
                    che fornisce al builder di Electron le informazioni necessarie per la creazione degli artefatti.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="radio" name="my-accordion-4" [checked]="isAccordionOpen('TopicsSlide2Number1', 4)"
                       (click)="avoidPropagation($event)"/>
                <div class="collapse-title text-xl font-medium" (click)="toggleAccordionItem('TopicsSlide2Number1', 4)">
                  Creare il file main.ts
                </div>
                <div class="collapse-content">
                  <p>Avendo indicato il punto di ingresso della parte Node.js (solitamente chiamata main.ts) dovremo
                    ovviamente crearla.</p>
                </div>
              </div>
              <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4 mb-4">
                <input type="radio" name="my-accordion-4" [checked]="isAccordionOpen('TopicsSlide2Number1', 5)"
                       (click)="avoidPropagation($event)"/>
                <div class="collapse-title text-xl font-medium" (click)="toggleAccordionItem('TopicsSlide2Number1', 5)">
                  Creare le condizioni per far comunicare Angular con Node.js
                </div>
                <div class="collapse-content">
                  <p>La parte frontend e quella backend comunicano attraverso un protocollo di messagistica chiamato
                    IPCRender. Se vogliamo mantenere l'impostazione <i>contextIsolation</i> a <i>true</i> sarà
                    necessario creare uno script che permetta ad Angular di accedere alle API di detto protocollo.</p>
                </div>
              </div>
            </div>
          </div>
        </app-slide-free>
      }
      @case (3) {
        <app-slide-free [componentName]="componentName">
          <div class="flex items-center justify-center h-full w-full mt-8 font-family: 'Segoe UI'">
            <div class="text-center w-full"><h1 class="text-4xl font-bold">Cosa effettuare il debug di un'applicazione
              Electron?</h1></div>
            <div class="text-2xl text-justify w-full">
              In fase di sviluppo si può effettuare il debug di un'applicazione Electron separando i comandi che servono
              per avviare la parte front-end e quella di backend.
              Per quanto riguarda il nostro progetto, essendo basato su Angular, per l'avvio della parte front-end si
              utilizzerà il solito comando <i>ng start</i>. Così facendo,
              se ci si fermasse a questo, sarebbe sempre possibile aprire un qualsiasi browser, e visualizzare il
              contenuto
              dell'applicazione attraverso l'url http://localhost:4200 (sempre che non si
              sia provveduto ad indicare un'altra porta) perché in effetti la parte Angular fa il suo mestiere.<br>Quello
              che otterremmo però sarebbe una versione depotenziata dell'applicativo. Infatti tutte le funzionalità
              legate alla comunicazione
              con Node.js non sarebbero disponibili in questa sede.<br>
              Per avviare la parte Node.js a questo punto si dovrebbe usare un camando del tipo <i>wait-on tcp:4200 &&
              electron . --serve --inspect-brk=9229</i>,
              dopo aver installato tra le devDependencies il pacchetto <i>wait-on</i>, che serve per aspettare che
              Angular sia pronto sulla porta 4200 (o un'altra a scelta)
              per lanciare il processo Node.js a cui passeremo il parametro <i>--serve</i> e indicheremo con il
              parametro <i>--inspect-brk=9229</i> che è possibile ispezionare
              il codice node sulla porta 9229, utilizzando anche i breakpoint utilizzando un ispector.
              A questo punto, una volta lanciato il processo di ispezione, la cui modalità cambia da IDE a IDE, verrà
              aperta la finestra in cui verrà caricato il contenuto di http://localohst:4200,
              sarà possibile effettuare il debug attraverso la console di Chromium utilizzato da Electron della parte
              front-end, mentre il debug di Node.js avverrà attraverso l'inspector.
            </div>
          </div>
        </app-slide-free>
      }
      @case (4) {
        <app-slide-free [componentName]="componentName">
          <div class="flex items-center justify-center h-full w-full mt-8 font-family: 'Segoe UI'">
            <div class="text-center w-full"><h1 class="text-4xl font-bold">Come comunicano front-end e back-end</h1>
            </div>
            <div class="text-2xl text-justify w-full">
              Abbiamo accennato al fatto che la parte back-end (Node.js) e la parte front-end (nel nostro caso Angular)
              comunicano
              attraverso un protocollo di comunicazione detto IPCRender. Per rendere disponibile ad Angular le API di
              questo protocollo
              si deve creare un un servizio (o importare un pacchetto tra alcuni che sono disponibili per Angular nel
              repository Npm).<br>
              L'accesso di Angular a questo protocollo, qualora si imposti nelle impostazioni delle finestre di Windows
              messe a disposizione di Node.js
              l'impostazione <i>contextIsolation</i> a true attraverso uno script che dobbiamo caricare prima ancora che
              venga creata la finestra attraverso
              l'impostazione del path a tale script in <i>preload</i> tra i settaggi della finestra stessa.<br>
            </div>
          </div>
        </app-slide-free>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent {
  page: WritableSignal<number | undefined> | undefined = undefined;
  topicsSlide2Number1: WritableSignal<number | undefined> | undefined = undefined;
  componentName = 'TopicsComponent';

  constructor(
    private pageService: PageService,
    private accordionStateService: AccordionStateService
  ) {
    const noOfPagesSignal = this.pageService.getNoOfPagesSignal(this.componentName);
    noOfPagesSignal.set(4);
    this.topicsSlide2Number1 = this.accordionStateService.getAccordionStateSignal('TopicsSlide2Number1');
    this.page = this.pageService.getPageSignal(this.componentName);
  }

  toggleAccordionItem(accordionName: string, index: number) {
    const signal = this.getAccordionSignal(accordionName);
    if (signal?.() !== index) {
      signal?.set(index);
    } else {
      signal?.set(undefined);
    }
  }

  private getAccordionSignal(accordionName: string): WritableSignal<number | undefined> | undefined {
    switch (accordionName) {
      case 'TopicsSlide2Number1':
        return this.topicsSlide2Number1;
    }
    return undefined;
  }

  isAccordionOpen(accordionName: string, index: number) {
    const signal: WritableSignal<number | undefined> | undefined = this.getAccordionSignal(accordionName);
    return signal?.() === index;
  }

  avoidPropagation(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }
}

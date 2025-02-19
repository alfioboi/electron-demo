import {Component, WritableSignal} from '@angular/core';
import {ChangeDetectionStrategy} from "@angular/core";
import {SlideCoverComponent} from "./slide-cover.component";
import {PageService} from "../services/page.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SlideCoverComponent
  ],
  template: `
    @switch ((page?.())) {
      @case (1) {
        <app-slide [hasBackward]="false" [hasForward]="true" (forWardClick)="page?.set(2)">
          <div slot="header">Electron</div>
          <div slot="content">Usare Javascript per creare applicazioni Desktop</div>
          <div slot="footer">Marzo 2025</div>
        </app-slide>
      }
      @case (2) {
        <app-slide [hasBackward]="true" [hasForward]="false" (backWardClick)="page?.set(1)">
          <div slot="header">Di che cosa parleremo</div>
          <div slot="content">
            <ul role="list" class="space-y-4">
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-red-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Cosa è Electron e a cosa serve
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-blue-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Come aggiungere Electron ad un progetto Angular v. 18
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-green-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Come effettuare il debug di un'applicazione Electron.
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-orange-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Come comunicano tra di loro la parte frontend e backend.
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-purple-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Come modificare il comportamento dell'applicazione Electron (menu, scorciatoie da tastiera, barra di
                  stato, interceptors...).
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-red-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Primo caso d'uso: persistere i dati usando un database. Expense manager.
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-teal-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Secondo caso d'uso: come eseguire le operazioni in parallelo liberando il main thread. Video Player
                  multipli.
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-teal-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Come effettuare la build di produzione e distribuire l'applicazione'.
                </p>
              </li>
              <li class="flex items-center gap-2 bg-white/80 shadow-md p-4 rounded-lg">
                <span class="h-3 w-3 inline-block bg-indigo-500 rounded-full"></span>
                <p class="text-gray-700 text-base font-medium">
                  Domande e risposte.
                </p>
              </li>

            </ul>
          </div>
          <div slot="footer"></div>
        </app-slide>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  page: WritableSignal<number | undefined> | undefined;

  constructor(private pageService: PageService) {
    this.page = this.pageService.getPageSignal('HomeComponent');
  }
}

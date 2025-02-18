import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BackwardIconComponent} from "./backward-icon.component";
import {ForwardIconComponent} from "./forward-icon.component";

    @Component({
      selector: 'app-slide',
      standalone: true,
      imports: [
        BackwardIconComponent,
        ForwardIconComponent
      ],
      template: `
        <div class="background-container">
          <img [src]="backgroundImagePath" alt="Background Image" class="background-image">
          <div class="overlay-container">
            <div class="header-slot">
              <ng-content select="[slot=header]"/>
            </div>
            <div class="content-slot">
              <ng-content select="[slot=content]"/>
            </div>
            <div class="footer-slot">
              <ng-content select="[slot=footer]"/>
            </div>
            <div class="footer-content">
              <div>
                @if (hasBackward) {
                  <app-backward-icon (backWardClick)="handleBackWardClic()"/>
                }
              </div>
              <div>
                @if (hasForward) {
                  <app-forward-icon (forwardClick)="handleForWardClic()"/>
                }
              </div>

            </div>
          </div>
        </div>
      `,
      styles: `
        :host {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0;
          overflow: hidden; /* Impedisce scrolling */
        }

        .background-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8); /* Scala l'intero contenitore al 80% e centra */
          transform-origin: center; /* Centra la trasformazione */
          width: 100%;
          height: 100%; /* Assicurati che scali anche in altezza */
          display: flex; /* Necessario per layout centrato dei contenuti */
          justify-content: center;
          align-items: center;
          overflow: hidden; /* Previene overflow indesiderati */
        }

        .background-image {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Scala proporzionalmente l'immagine senza deformarla */
          pointer-events: none; /* Impedisce interazione con l'immagine */
          transform: scale(1); /* Assicura che l'immagine erediti esattamente lo stesso comportamento di scala */
          transition: transform 0.2s ease-in-out; /* Transizione fluida per modifiche dinamiche */
        }


        .overlay-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header-slot {
          flex: 0 0 20%; /* Usa flex per una proporzione fluida */
          font-size: 6rem;
          font-weight: bold;
          display: flex;
          align-items: flex-end;
          padding-left: 5%;
        }

        .content-slot {
          flex: 0 0 40%; /* Proporzione fluida al posto di height */
          font-size: 3rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5%;
        }

        .footer-slot {
          flex: 0 0 5%; /* Proporzione flessibile */
          font-size: 2rem;
          color: gray;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5%;
        }

        .footer-content {
          flex: 0 0 auto; /* Non contribuisce all'altezza totale */
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: start; /* Miglioramento dell'allineamento */
          margin-top: -2em; /* Sposta verso l'alto la sezione */
          width: 100%;
        }

      `,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class SlideCoverComponent {
      backgroundImagePath = 'cover.svg';
      @Input() hasBackward = false;
      @Input() hasForward = false;
      @Output() backWardClick: EventEmitter<void> = new EventEmitter<void>();
      @Output() forWardClick: EventEmitter<void> = new EventEmitter<void>();

      handleBackWardClic() {
        this.backWardClick.emit();
      }

      handleForWardClic() {
        this.forWardClick.emit();
      }
    }

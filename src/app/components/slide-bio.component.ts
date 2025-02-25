import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FooterOfSlideComponent} from "./footer-of-slide.component";

@Component({
  selector: 'app-slide-bio',
  standalone: true,
  imports: [
    FooterOfSlideComponent
  ],
  template: `
    <div class="background-container">
      <img [src]="backgroundImagePath" alt="Background Image" class="background-image">
      <div class="overlay-container">
        <div class="grid grid-cols-3 gap-4 p-4 pt-48 items-start">
          <!-- FOTO + BIO (Stessa riga) -->
          <div class="grid-cols-1 flex justify-center text-center">
            @if (fotoPath) {
              <!-- Wrapper circolare -->
              <div
                class="w-64 h-64 rounded-full border-4 border-gray-300 overflow-hidden flex items-center justify-center">
                <!-- Foto dentro il cerchio -->
                <img [src]="fotoPath"
                     alt="Foto"
                     class="w-full h-full object-cover"/>
              </div>
            }
          </div>

          <div class="grid-cols-2 col-span-2 w-full bio-slot">
            <!-- bio slot -->
            <ng-content select="[slot=bio]"/>
          </div>

          <!-- NOME -->
          <div
            class="grid-cols-1 row-start-2 font-semibold text-xl flex items-center justify-center text-center nome-slot">
            <!-- nome slot -->
            <div class="w-full">
              <ng-content select="[slot=nome]"/>
            </div>
          </div>

          <!-- QUALIFICA -->
          <div
            class="grid-cols-1 row-start-3 text-gray-500 italic flex items-center justify-center text-center qualifica-slot">
            <!-- qualifica slot -->
            <ng-content select="[slot=qualifica]"/>
          </div>
        </div>
        <app-footer-of-slide [componentName]="componentName"/>
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

    .bio-slot {
      font-size: 2rem;
    }

    .nome-slot {
      font-size: 2rem;
      font-weight: bold;
    }

    .qualifica-slot {
      font-size: 1.5rem;
      color: gray;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideBioComponent {
  @Input() componentName!: string;
  @Input() fotoPath: string | undefined;
  backgroundImagePath = 'bio.svg';
}

import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import {FooterOfSlideComponent} from "./footer-of-slide.component";

@Component({
  selector: 'app-slide-free',
  standalone: true,
  imports: [
    FooterOfSlideComponent
  ],
  template: `
    <div class="background-container">
      <img [src]="backgroundImagePath" alt="Background Image" class="background-image">
      <div class="overlay-container">
        <ng-content></ng-content>
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
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideFreeComponent {
  @Input() componentName!: string;
  backgroundImagePath = 'bio.svg';


}

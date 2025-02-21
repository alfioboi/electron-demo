import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SlideBioComponent} from "./slide-bio.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    SlideBioComponent
  ],
  template: `
    <app-slide-bio [componentName]="componentName" [fotoPath]="'foto-alfio-boi.jpg'">
      <div slot="bio"></div>
      <div slot="nome">Alfio Boi</div>
      <div slot="qualifica">
        Software Development Specialist
        <br>
        Engineering Informatica S.p.A.
      </div>
      <div slot="bio">
        Sviluppo applicazioni PHP con framework Drupal, Vtiger, Joomla, Wordpress, Symphony. Sviluppo applicazioni Angular, Ionic.
        Collaborato con S.I.A.E., Sodexo, Iren luce & gas, Volontariato internazionale per lo sviluppo, Ministero della Giustizia...
        Appassionato di tecnologie open source.
      </div>
    </app-slide-bio>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  componentName = 'AboutComponent';
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

    @Component({
      selector: 'app-slide',
      standalone: true,
      imports: [],
      template: `
        <div class="background-container">
          <img [src]="backgroundImagePath" alt="Background Image" class="background-image">
          <div class="overlay-container">
            <div class="header-slot">
              <ng-content select="[slot=header]"></ng-content>
            </div>
            <div class="content-slot">
              <ng-content select="[slot=content]"></ng-content>
            </div>
            <div class="footer-slot">
              <ng-content select="[slot=footer]"></ng-content>
            </div>
          </div>
        </div>
      `,
      styles: `
        .background-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .background-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding-top: 5%;
          padding-bottom: 5%;
          padding-left: 5%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .header-slot {
          height: 40%;
          font-size: 6rem;
          font-weight: bold;
          display: flex;
          align-items: flex-end;
        }
        .content-slot {
          height: 50%;
          font-size: 3rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .footer-slot {
          height: 10%;
          font-size: 2rem;
          color: gray;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      `,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class SlideComponent {
      backgroundImagePath = 'talk-background.png';
    }

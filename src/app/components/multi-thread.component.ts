import {ChangeDetectionStrategy, Component, computed} from '@angular/core';
import {MultiThreadService} from "../services/multi-thread.service";
import {ElectronService} from "../services/electron.service";
import {ProcessStatus} from "../enums/process-status";

@Component({
  selector: 'app-multi-thread',
  standalone: true,
  imports: [],
  template: `
    <div class="grid place-items-center">
      @if (notIsChoosen()) {
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="size-24 cursor-pointer" (click)="handleSelectFolder()">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
        </svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="size-24 cursor-pointer" (click)="handleUnselectFolder()">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
        </svg> {{ multiThreadService.cartella() }}
        {{ length() }} file da processare
        @if (length()) {
          <div class="flex flex-wrap gap-4 justify-center">
            @for (file of multiThreadService.files; track file().name) {
              <div class="card bg-base-200 text-black w-96 m-2 mt-5 shadow-lg">
                <div class="card-body items-center text-center">
                  <h2 class="card-title">{{ file().name }}</h2>
                  <p>Status: {{ file().status }}</p>
                  <p>Size: {{ file().size ?? 'Unknown' }}</p>
                  @if (file().avanzamento) {
                    <p>Progress <progress class="progress progress-info w-56" value="0" max="100"></progress></p>
                  }
                  <div class="card-actions justify-end">
                    @if (file().status !== ProcessStatus.Completed) {
                        <button class="btn btn-primary">{{ file().status === ProcessStatus.InProgress ? 'Stop' : file().status === ProcessStatus.NotStarted ? 'Start' : (file().status === ProcessStatus.Canceled || file().status === ProcessStatus.Failed) ? 'Retry' : '' }}</button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="text-center">Nessun file da processare</div>
        }
      }

    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiThreadComponent {
  notIsChoosen = computed(() => this.multiThreadService.cartella?.() === '');
  length = computed(() => this.multiThreadService.files.length);

  constructor(protected multiThreadService: MultiThreadService, private electronService: ElectronService) {
    this.electronService.on('cartella-scelta-multi-thread', (cartella) => {
      this.multiThreadService.setCartella(cartella);
    });
    this.electronService.on('elenco-file-multi-thread', (elencoFile) => {
      this.multiThreadService.createFileList(elencoFile);
    });
  }

  handleSelectFolder() {
    this.electronService.send('scegli-cartella-multi-thread');
  }

  handleUnselectFolder() {
    this.multiThreadService.cleanCartella();
  }

  protected readonly ProcessStatus = ProcessStatus;
}

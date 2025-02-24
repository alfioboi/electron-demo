import {ChangeDetectionStrategy, Component, computed} from '@angular/core';
import {MultiThreadService} from "../services/multi-thread.service";
import {ElectronService} from "../services/electron.service";
import {ProcessStatus} from "../enums/process-status";
import {IFileToProcess} from "../models/file-to-process";
import {FileSizePipe} from "../pipes/file-size";

@Component({
  selector: 'app-multi-thread',
  standalone: true,
  imports: [
    FileSizePipe
  ],
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
          <div class="flex flex-wrap gap-4 justify-start">
            @for (file of multiThreadService.files; track file().name) {
              <div class="card bg-base-200 text-black w-96 m-2 mt-5 shadow-lg">
                <div class="card-body items-center text-center">
                  <h2 class="card-title">{{ file().name }}</h2>
                  <p>Status: {{ file().status }}</p>
                  <p>Size: {{ file().size ? (file().size ?? 0 | fileSize) : 'Unknown' }}</p>
                  @if (file().progress) {
                    <p>Progress:
                      <progress class="progress progress-info w-56" value="{{file().progress}}" max="100"></progress> {{ file().progress }}%
                    </p>
                  }
                  <div class="card-actions justify-end">
                    @if (file().status !== ProcessStatus.Completed) {
                      <button class="btn btn-primary"
                              (click)="processFile(file())">{{ file().status === ProcessStatus.InProgress ? 'Stop' : file().status === ProcessStatus.NotStarted ? 'Start' : (file().status === ProcessStatus.Canceled || file().status === ProcessStatus.Failed) ? 'Retry' : '' }}
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
          <div class="h-full flex align-items-bottom justify-center">
            <div class="mb-0 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-24 cursor-pointer" (click)="runAll()">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg> Start all
            </div>
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
  runAll() {
    this.multiThreadService.files.forEach(fileSignal => {
      const file = fileSignal();
      this.processFile(file);
    });
  }

  public processFile(file: IFileToProcess) {
    if (file.status === ProcessStatus.NotStarted || file.status === ProcessStatus.Canceled || file.status === ProcessStatus.Failed) {
      this.electronService.send('start-process', {path: this.multiThreadService.cartella(), name: file.name});
    } else if (file.status === ProcessStatus.InProgress) {
      this.electronService.send('stop-process', {path: this.multiThreadService.cartella(), name: file.name});
    }
  }
}

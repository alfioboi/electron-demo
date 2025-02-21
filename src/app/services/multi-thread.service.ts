import {Injectable, signal, WritableSignal} from '@angular/core';
import {IFileToProcess} from "../models/file-to-process";
import {ProcessStatus} from "../enums/process-status";

@Injectable({
  providedIn: 'root'
})
export class MultiThreadService {
  cartella: WritableSignal<string> = signal<string>('');
  private filesToProcess: WritableSignal<WritableSignal<IFileToProcess>[]> = signal<WritableSignal<IFileToProcess>[]>([]);

  constructor() { }
  setCartella(cartella: string): void {
    this.cartella?.set(cartella);
  }
  cleanCartella(): void {
    this.cartella?.set('');
  }

  get files() {
    return this.filesToProcess();
  }

  addFile(newObject: IFileToProcess) {
    const newSignal = signal(newObject);
    this.filesToProcess.set([...this.filesToProcess(), newSignal]);
  }

  removeFile(name: string) {
    this.filesToProcess.set(this.filesToProcess().filter(objSignal => objSignal().name !== name));
  }

  updateFile(updatedObject: IFileToProcess) {
    this.filesToProcess.set(this.filesToProcess().map(objSignal =>
      objSignal().name === updatedObject.name ? signal(updatedObject) : objSignal
    ));
  }
  createFileList(files: string[]): void {
    const fileSignals = files.map(file => signal<IFileToProcess>({
      name: file,
      status: ProcessStatus.NotStarted
    }));
    this.filesToProcess.set(fileSignals);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private ipcRenderer!: typeof import('electron').ipcRenderer;

  constructor() {
    if (window && (window as any)['electron'] && (window as any)['electron'].ipcRenderer) {
      this.ipcRenderer = (window as any)['electron'].ipcRenderer;
    }
  }

  send(channel: string, data?: any) {
    this.ipcRenderer?.send(channel, data);
  }

  on(channel: string, listener: (...args: any[]) => void) {
    this.ipcRenderer?.on(channel, listener);
  }

  once(channel: string, listener: (...args: any[]) => void) {
    this.ipcRenderer?.once(channel, listener);
  }
}

import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageSignals = new Map<string, WritableSignal<number | undefined>>();

  constructor() { }

  getPageSignal(componentName: string) {
    if (!this.pageSignals.has(componentName)) {
      this.pageSignals.set(componentName, signal<number>(1));
    }
    return this.pageSignals.get(componentName);
  }
}

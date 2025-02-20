import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccordionStateService {
  private accordionSignals = new Map<string, WritableSignal<number | undefined>>();

  constructor() { }

  getPageSignal(accordionName: string) {
    if (!this.accordionSignals.has(accordionName)) {
      this.accordionSignals.set(accordionName, signal<number>(0));
    }
    return this.accordionSignals.get(accordionName);
  }
}

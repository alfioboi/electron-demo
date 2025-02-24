import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageSignals = new Map<string, WritableSignal<number | undefined>>();
  private noOfPagesSignals = new Map<string, WritableSignal<number>>();

  constructor() {}

  // Restituisce il segnale di una pagina associata a un componente specifico
  getPageSignal(componentName: string): WritableSignal<number | undefined> {
    if (!this.pageSignals.has(componentName)) {
      this.pageSignals.set(componentName, signal<number>(1));
    }
    return this.pageSignals.get(componentName)!;
  }

  // Restituisce il segnale per il numero di pagine associato a un componente specifico
  getNoOfPagesSignal(componentName: string): WritableSignal<number> {
    if (!this.noOfPagesSignals.has(componentName)) {
      this.noOfPagesSignals.set(componentName, signal<number>(1)); // Default: 1 pagina disponibile
    }
    return this.noOfPagesSignals.get(componentName)!;
  }
  getPageLabelSignal(componentName: string): Signal<string> {
    if (this.getPageSignal(componentName)() && this.getNoOfPagesSignal(componentName)() > 1) {
      return signal(`${this.getPageSignal(componentName)() || 1} / ${this.getNoOfPagesSignal(componentName)()}`);
    }
    return signal('');
  }

  // Computed Signal: c'è una pagina precedente?
  hasBackward(componentName: string) {
    const pageSignal = this.getPageSignal(componentName);
    return computed(() => (pageSignal() || 1) > 1);
  }

  // Computed Signal: c'è una pagina successiva?
  hasForward(componentName: string) {
    const pageSignal = this.getPageSignal(componentName);
    const noOfPagesSignal = this.getNoOfPagesSignal(componentName);
    return computed(() => (pageSignal() || 1) < noOfPagesSignal());
  }

  // Vai a pagina successiva
  goNextPage(componentName: string) {
    this.updatePage(componentName, 1);
  }

  // Vai a pagina precedente
  goToPreviousPage(componentName: string) {
    this.updatePage(componentName, -1);
  }

  // Metodo ausiliario privato per aggiornare la pagina
  private updatePage(componentName: string, delta: number) {
    const pageSignal = this.getPageSignal(componentName);
    const noOfPagesSignal = this.getNoOfPagesSignal(componentName);

    if (pageSignal?.()) {
      pageSignal.update((currentPage) => {
        const newPage = (currentPage || 1) + delta;
        if (newPage < 1) return 1; // Non scendere sotto pagina 1
        if (newPage > noOfPagesSignal()) return noOfPagesSignal(); // Non superare il numero massimo di pagine
        return newPage;
      });
    }
  }
}

import {ChangeDetectionStrategy, Component, computed, effect, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IExpense} from '../models/expense';
import {ElectronService} from '../services/electron.service';
import {PageTitleComponent} from './page-title.component';
import {IExpenseForm} from '../models/expense-form';
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    PageTitleComponent,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  template: `
    <app-page-title [title]="title"/>
    <form [formGroup]="expenseForm" (ngSubmit)="onSubmit()">
      <div class="mt-4">
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table class="table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="highlight-row">
              <td>{{ idActiveExpense() ?? '' }}</td>
              <td><textarea formControlName="description" class="textarea textarea-bordered"
                            placeholder="Type description here"></textarea></td>
              <td><input type="number" formControlName="amount" placeholder="Type amount here"
                         class="input w-full max-w-xs"/></td>
              <td><input type="date" formControlName="date" placeholder="Type date here" class="input w-full max-w-xs"/>
              </td>
              <td>
                @if (!idActiveExpense()) {
                  <button class="btn" type="submit" [disabled]="!expenseForm.valid">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-[1.2em]">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    Add expense
                  </button>
                } @else {
                  <button class="btn" type="submit" [disabled]="!expenseForm.valid">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-1.5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                    </svg>
                    Update expense
                  </button>
                }
              </td>
            </tr>
              @for (expense of expenses(); track expense.id) {
                <tr [ngClass]="idActiveExpense() === expense.id ? 'bg-base-200' : ''">
                  <th>{{ expense.id }}</th>
                  <td>{{ expense.description }}</td>
                  <td>{{ expense.amount }}</td>
                  <td>{{ expense.date }}</td>
                  <td>
                    <button class="btn mr-2" type="button"
                            (click)="idActiveExpense() === expense.id ? activeExpense.set(null) : activeExpense.set(expense)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="size-[1.2em]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                      {{ idActiveExpense() === expense.id ? 'Cancel edit' : 'Edit expense' }}
                    </button>
                    <button class="btn" type="button" (click)="deleteExpense(expense.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="size-[1.2em]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Delete expense
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </form>
  `,
  styles: `
    .highlight-row {
      background-color: rgba(0, 123, 255, 0.2); /* Colore di sfondo leggermente distinto */
      border-left: 5px solid #007bff; /* Bordo a sinistra per indicare un focus */
      transition: background-color 0.3s ease, border-color 0.3s ease; /* Transizione fluida */
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesComponent implements OnInit {
  expenseForm: FormGroup<IExpenseForm>;
  title = signal('Expense Manager');
  expenses = signal<IExpense[]>([]);
  activeExpense = signal<IExpense | null>(null);
  idActiveExpense = computed(() => this.activeExpense()?.id);

  constructor(private electronService: ElectronService, private fb: FormBuilder) {
    this.expenseForm = this.fb.group<IExpenseForm>({
      id: new FormControl<number | null>(null),
      description: new FormControl<string | null>('', {validators: Validators.required, nonNullable: true}),
      amount: new FormControl<number | null>(0, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true
      }),
      date: new FormControl<string | null>('', {validators: Validators.required, nonNullable: true})
    });
    effect(() => {
      const expense = this.activeExpense();
      if (expense) {
        this.expenseForm.patchValue({
          id: expense.id,
          description: expense.description,
          amount: expense.amount,
          date: expense.date
        });
      } else {
        this.expenseForm.reset();
      }
    });
  }

  ngOnInit(): void {
    this.electronService.on('expense-inserted', (result) => {
      if (result.success) {
        this.queryExpenses();
      }
    });
    this.electronService.on('expense-updated', (result) => {
      if (result.success) {
        this.queryExpenses();
      }
    });
    this.electronService.on('expense-deleted', (result) => {
      if (result.success) {
        this.queryExpenses();
      }
    });

    this.electronService.on('expenses-queried', (result) => {
      if (result.success) {
        this.expenses.set(result.data);
      }
    });

    this.queryExpenses();
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const {id, description, amount, date} = this.expenseForm.value;
      if (description && amount && date) {
        if (id) {
          this.updateExpense(id, description, amount, date);
        } else {
          this.insertExpense(description, amount, date);
        }
        this.activeExpense.set(null);
      }
    }
  }

  insertExpense(description: string | undefined, amount: number | undefined, date: string | undefined): void {
    this.electronService.send('insert-expense', {description, amount, date});
  }
  updateExpense(id: number, description: string | undefined, amount: number | undefined, date: string | undefined): void {
    this.electronService.send('update-expense', {id, description, amount, date});
  }
  queryExpenses(): void {
    this.electronService.send('query-expenses');
  }

  deleteExpense(id: number | undefined) {
    this.electronService.send('delete-expense', id);
  }
}

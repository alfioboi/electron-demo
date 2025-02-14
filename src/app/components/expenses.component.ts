import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {IExpense} from '../models/expense';
import {ElectronService} from '../services/electron.service';
import {PageTitleComponent} from './page-title.component';

interface ExpenseForm {
  description: FormControl<string | null>;
  amount: FormControl<number | null>;
  date: FormControl<string | null>;
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    PageTitleComponent,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  template: `
    <app-page-title [title]="title"/>
    <form [formGroup]="expenseForm" (ngSubmit)="onSubmit()">
      <div class="mt-4">
        <div class="overflow-x-auto">
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
            <tr>
              <td></td>
              <td><textarea formControlName="description" class="textarea textarea-bordered"
                            placeholder="Type description here"></textarea></td>
              <td><input type="number" formControlName="amount" placeholder="Type amount here"
                         class="input w-full max-w-xs"/></td>
              <td><input type="date" formControlName="date" placeholder="Type date here" class="input w-full max-w-xs"/>
              </td>
              <td>
                <button class="btn" type="submit" [disabled]="!expenseForm.valid">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-[1.2em]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  Add expense
                </button>
              </td>
            </tr>
              @for (expense of expenses(); track expense.id) {
                <tr>
                  <th>{{ expense.id }}:</th>
                  <td>{{ expense.description }}</td>
                  <td>{{ expense.amount }}</td>
                  <td>{{ expense.date }}</td>
                  <td>
                    <button class="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="size-[1.2em]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                      Edit expense
                    </button>
                    <button class="btn">
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
  styles: ``
})
export class ExpensesComponent implements OnInit {
  title = signal('Expense Manager');
  expenses = signal<IExpense[]>([]);
  expenseForm: FormGroup<ExpenseForm>;

  constructor(private electronService: ElectronService, private fb: FormBuilder) {
    this.expenseForm = this.fb.group<ExpenseForm>({
      description: new FormControl<string | null>('', {validators: Validators.required, nonNullable: true}),
      amount: new FormControl<number | null>(0, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true
      }),
      date: new FormControl<string | null>('', {validators: Validators.required, nonNullable: true})
    });
  }

  ngOnInit(): void {
    this.electronService.on('expense-inserted', (result) => {
      if (result.success) {
        console.log('Expense inserted with ID:', result.id);
        this.queryExpenses();
      } else {
        console.error('Error inserting expense:', result.error);
      }
    });

    this.electronService.on('expenses-queried', (result) => {
      if (result.success) {
        this.expenses.set(result.data);
      } else {
        console.error('Error querying expenses:', result.error);
      }
    });

    this.queryExpenses();
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const {description, amount, date} = this.expenseForm.value;
      if (description && amount && date) {
        this.insertExpense(description, amount, date);
      }
    }
  }

  insertExpense(description: string | undefined, amount: number | undefined, date: string | undefined): void {
    this.electronService.send('insert-expense', {description, amount, date});
  }

  queryExpenses(): void {
    this.electronService.send('query-expenses');
  }
}

import {Component, OnInit, signal} from '@angular/core';
import {ElectronService} from "../services/electron.service";
import {IExpense} from "../models/expense";
import {PageTitleComponent} from "./page-title.component";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  template: `
    <div>
      <app-page-title [title]="title"/>
      <form (submit)="insertExpense(description.value, +amount.value, date.value)">
        <input #description type="text" placeholder="Description" required>
        <input #amount type="number" placeholder="Amount" required>
        <input #date type="date" required>
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        @for(expense of expenses(); track expense.id) {
          <li>
            {{expense.id}}: {{ expense.description }} - {{ expense.amount }} - {{ expense.date }}
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``
})
export class ExpensesComponent implements OnInit {
  title = signal('Expense Manager');
  expenses = signal<IExpense[]>([]);

  constructor(private electronService: ElectronService) {}

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

  insertExpense(description: string, amount: number, date: string): void {
    this.electronService.send('insert-expense', { description, amount, date });
  }

  queryExpenses(): void {
    this.electronService.send('query-expenses');
  }
}

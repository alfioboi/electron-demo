import {FormControl} from "@angular/forms";

export interface IExpenseForm {
  id: FormControl<number | null>;
  description: FormControl<string | null>;
  amount: FormControl<number | null>;
  date: FormControl<string | null>;
}

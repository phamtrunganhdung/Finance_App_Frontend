import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceStore } from '../../../stores/finance.store';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  private readonly financeStore = inject(FinanceStore);
  transactionForm!: FormGroup;
  categories$ = this.financeStore.categories$;
  @Input() hideSubmitButton = false;
  formattedAmount = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const today = new Date().toISOString().substring(0, 10);

    this.transactionForm = this.fb.group({
      title: ['', [Validators.required]],
      amount: [1000, [Validators.required, Validators.min(1000)]],
      date: [today, Validators.required],
      category: [0, Validators.required],
      isIncome: [false],
      note: ['', [Validators.maxLength(200)]],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      console.log('Dữ liệu form:', this.transactionForm.value);
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Loại bỏ dấu chấm và các ký tự không phải số để lấy giá trị thô
    const rawValue = input.value.replace(/\./g, '').replace(/\D/g, '');

    if (rawValue) {
      const numberValue = parseInt(rawValue, 10);
      this.transactionForm.get('amount')?.setValue(numberValue);

      // Format lại hiển thị theo định dạng Việt Nam (dùng dấu chấm phân cách)
      const formatted = numberValue.toLocaleString('vi-VN');
      this.formattedAmount = formatted;
      input.value = formatted;
    } else {
      this.transactionForm.get('amount')?.setValue(null);
      this.formattedAmount = '';
      input.value = '';
    }
  }

  onAmountBlur(): void {
    this.transactionForm.get('amount')?.markAsTouched();
  }
}

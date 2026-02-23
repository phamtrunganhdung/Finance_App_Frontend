import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionForm!: FormGroup;
  categories = ['Shopping', 'Food & Drinks', 'Salary', 'Rent', 'Investment'];
  @Input() hideSubmitButton = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const today = new Date().toISOString().substring(0, 10); // Định dạng YYYY-MM-DD

    this.transactionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required, Validators.min(1000)]], // Tối thiểu 1000đ
      date: [today, Validators.required],
      category: ['', Validators.required],
      isIncome: [false],
      note: ['', [Validators.maxLength(200)]],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      console.log('Dữ liệu form:', this.transactionForm.value);
      // Thực hiện logic lưu trữ tại đây
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }
}

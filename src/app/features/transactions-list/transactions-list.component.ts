import { Component, OnInit, inject } from '@angular/core';
import { TransactionsComponent } from './transactions/transactions.component';
import { FinanceStore } from '../../stores/finance.store';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  imports: [TransactionsComponent],
  providers: [FinanceStore],
})
export class TransactionsListComponent implements OnInit {
  private readonly financeStore = inject(FinanceStore);
  isModalOpen = false;

  ngOnInit(): void {
    this.financeStore.loadCategories();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

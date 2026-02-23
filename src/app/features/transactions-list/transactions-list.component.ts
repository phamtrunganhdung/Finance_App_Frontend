import { Component } from '@angular/core';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  imports: [TransactionsComponent],
})
export class TransactionsListComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

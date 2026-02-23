import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ICategory } from '../models/finance.interface';

@Injectable({
  providedIn: 'root',
})
export class FinanceApiService {
  private http = inject(HttpClient);
  baseUrl = 'https://dung-finance.onrender.com/api';

  getCategories() {
    return this.http.get<ICategory[]>(`${this.baseUrl}/Categories`);
  }
}

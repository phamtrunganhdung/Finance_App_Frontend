import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';
import { FinanceApiService } from '../services/finance-api.service';
import { ICategory } from '../models/finance.interface';

export interface FinanceStoreState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class FinanceStore extends ComponentStore<FinanceStoreState> {
  private financeApiService = inject(FinanceApiService);

  constructor() {
    super({
      categories: [],
      loading: false,
      error: null,
    });
  }

  readonly categories$ = this.select((state) => state.categories);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);

  readonly loadCategories = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap(() =>
        this.financeApiService.getCategories().pipe(
          tap({
            next: (categories: ICategory[]) => {
              this.patchState({ categories, loading: false });
            },
            error: (error: any) => {
              this.patchState({ error: error.message, loading: false });
            },
          }),
        ),
      ),
    ),
  );
}

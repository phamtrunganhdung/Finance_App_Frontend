export interface ICategory {
  id: number;
  title: string;
  note?: string | null;
  icon: string;
}

export interface ITransaction {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  category: number;
  isIncome: boolean;
  note?: string | null;
}

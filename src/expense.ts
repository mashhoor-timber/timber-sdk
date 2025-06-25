import { AxiosInstance, AxiosResponse } from "axios";

export interface ExpenseData {
  title: string;
  amount: number;
  category?: string;
  description?: string;
  date?: string;
  [key: string]: any;
}

export interface Expense extends ExpenseData {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseQueryParams {
  page?: number;
  limit?: number;
}

export class ExpenseService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: ExpenseQueryParams = {}
  ): Promise<AxiosResponse<Expense[]>> {
    return await this.http.get<Expense[]>("/customer/expense", { params });
  }

  async create(data: ExpenseData): Promise<AxiosResponse<Expense>> {
    return await this.http.post<Expense>("/customer/expense", data);
  }

  async update(
    id: string,
    data: Partial<ExpenseData>
  ): Promise<AxiosResponse<Expense>> {
    return await this.http.put<Expense>(`/customer/expense/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/expense/${id}`
    );
  }
}

import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateExpenseRequest {
  type: string;
  merchant: string;
  category: string;
  date: string;
  payment_method: string;
  amount: number;
}

export type UpdateExpenseRequest = Partial<CreateExpenseRequest>;

export interface Expense {
  _id: string;
  user: string;
  company: string;
  merchant: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
}

export class ExpenseService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(params: ExpenseQueryParams): Promise<AxiosResponse<Expense[]>> {
    return await this.http.get<Expense[]>("/customer/expense", { params });
  }

  async get(id: string): Promise<AxiosResponse<Expense>> {
    return await this.http.get<Expense>(`/customer/expense/${id}`);
  }

  async create(data: CreateExpenseRequest): Promise<AxiosResponse<Expense>> {
    return await this.http.post<Expense>("/customer/expense", data);
  }

  async update(
    id: string,
    data: UpdateExpenseRequest
  ): Promise<AxiosResponse<Expense>> {
    return await this.http.put<Expense>(`/customer/expense/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.patch<{ message: string }>(
      `/customer/expense/${id}`
    );
  }
}

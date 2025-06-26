import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateExpenseCategoryRequest {
  category: string;
}

export type UpdateExpenseCategoryRequest =
  Partial<CreateExpenseCategoryRequest>;

export interface ExpenseCategory {
  _id: string;
  company: string;
  category: {
    label: string;
    value: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ExpenseCategoryQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
}

export class ExpenseCategoryService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: ExpenseCategoryQueryParams
  ): Promise<AxiosResponse<ExpenseCategory[]>> {
    return await this.http.get<ExpenseCategory[]>(
      "/customer/expense/category",
      {
        params,
      }
    );
  }

  async create(
    data: CreateExpenseCategoryRequest
  ): Promise<AxiosResponse<ExpenseCategory>> {
    return await this.http.post<ExpenseCategory>(
      "/customer/expense/category",
      data
    );
  }

  async update(
    id: string,
    data: CreateExpenseCategoryRequest
  ): Promise<AxiosResponse<ExpenseCategory>> {
    return await this.http.put<ExpenseCategory>(
      `/customer/expense/category/${id}`,
      data
    );
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/expense/category/${id}`
    );
  }
}

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

/**
 * Service for Expense Category
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const expenseCategory = await client.expenseCategory.list({ page: 1, limit: 10 });
 * console.log(expenseCategory.data);
 * ```
 */

export class ExpenseCategoryService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of expense categories.
   *
   * @param params
   * @returns
   *
   * @example
   * ```ts
   * const expenseCategories = await client.expenseCategory.list({ page: 1, limit: 5 });
   * console.log(expenseCategories.data);
   * ```
   */

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

  /**
   * Create a new expense category.
   *
   * @param data
   * @returns
   *
   * @example
   * ```ts
   * const newExpenseCategory = {
   *   category: "Travel"
   * };
   * const response = await client.expenseCategory.create(newExpenseCategory);
   * console.log(response.data);
   * ```
   */

  async create(
    data: CreateExpenseCategoryRequest
  ): Promise<AxiosResponse<ExpenseCategory>> {
    return await this.http.post<ExpenseCategory>(
      "/customer/expense/category",
      data
    );
  }

  /**
   * Update an existing expense category.
   *
   * @param id
   * @param data
   * @returns
   *
   * @example
   * ```ts
   * const updates = { category: "Food" };
   * const updated = await client.expenseCategory.update('expense_category_id_here', updates);
   * console.log(updated.data);
   * ```
   */

  async update(
    id: string,
    data: CreateExpenseCategoryRequest
  ): Promise<AxiosResponse<ExpenseCategory>> {
    return await this.http.put<ExpenseCategory>(
      `/customer/expense/category/${id}`,
      data
    );
  }

  /**
   * Delete an expense category by ID.
   *
   * @param id
   * @returns
   *
   * @example
   * ```ts
   * const response = await client.expenseCategory.delete('expense_category_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/expense/category/${id}`
    );
  }
}

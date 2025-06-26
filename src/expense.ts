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

/**
 * Service for managing Expenses.
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const expenses = await client.expense.list({ page: 1, limit: 10 });
 * console.log(expenses.data);
 * ```
 */
export class ExpenseService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of expenses.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of expenses matching the query.
   *
   * @example
   * ```ts
   * const expenses = await client.expense.list({ page: 1, limit: 5 });
   * console.log(expenses.data);
   * ```
   */
  async list(params: ExpenseQueryParams): Promise<AxiosResponse<Expense[]>> {
    return await this.http.get<Expense[]>("/customer/expense", { params });
  }

  /**
   * Fetch a single expense by ID.
   *
   * @param id - Expense ID
   * @returns Expense object
   *
   * @example
   * ```ts
   * const expense = await client.expense.get('expense_id_here');
   * console.log(expense.data);
   * ```
   */
  async get(id: string): Promise<AxiosResponse<Expense>> {
    return await this.http.get<Expense>(`/customer/expense/${id}`);
  }

  /**
   * Create a new expense.
   *
   * @param data - Expense creation payload
   * @returns The created expense
   *
   * @example
   * ```ts
   * const newExpense = {
   *   type: "travel",
   *   merchant: "Uber",
   *   category: "Transportation",
   *   date: "2025-06-23",
   *   payment_method: "credit_card",
   *   amount: 45.75,
   * };
   * const response = await client.expense.create(newExpense);
   * console.log(response.data);
   * ```
   */
  async create(data: CreateExpenseRequest): Promise<AxiosResponse<Expense>> {
    return await this.http.post<Expense>("/customer/expense", data);
  }

  /**
   * Update an existing expense.
   *
   * @param id - Expense ID
   * @param data - Partial update data
   * @returns Updated expense
   *
   * @example
   * ```ts
   * const updates = { amount: 50.0 };
   * const updated = await client.expense.update('expense_id_here', updates);
   * console.log(updated.data);
   * ```
   */
  async update(
    id: string,
    data: UpdateExpenseRequest
  ): Promise<AxiosResponse<Expense>> {
    return await this.http.put<Expense>(`/customer/expense/${id}`, data);
  }

  /**
   * Delete an expense by ID.
   *
   * @param id - Expense ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.expense.delete('expense_id_here');
   * console.log(response.data.message);
   * ```
   */
  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.patch<{ message: string }>(
      `/customer/expense/${id}`
    );
  }
}

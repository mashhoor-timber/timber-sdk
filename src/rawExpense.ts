import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateRawExpenseRequest {
  file: File;
}

export interface RawExpense {
  _id: string;
  user: string;
  company: string;
  status: string;
  expense_id: string;
  files: [
    {
      name: string;
      type: string;
      url: string;
      size: number;
      extension: string;
    }
  ];
  created_at: string;
  updated_at: string;
}

export interface RawExpenseQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
}

/**
 * Service for Raw Expense
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const rawExpense = await client.rawExpense.list({ page: 1, limit: 10 });
 * console.log(rawExpense.data);
 * ```
 */

export class RawExpenseService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of raw expenses.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of raw expenses matching the query.
   *
   * @example
   * ```ts
   * const rawExpenses = await client.rawExpense.list({ page: 1, limit: 5 });
   * console.log(rawExpenses.data);
   * ```
   */

  async list(
    params: RawExpenseQueryParams
  ): Promise<AxiosResponse<RawExpense[]>> {
    return await this.http.get<RawExpense[]>("/customer/expense/raw", {
      params,
    });
  }

  /**
   * Create a new raw expense.
   *
   * @param data - Raw expense creation payload
   * @returns The created raw expense
   *
   * @example
   * ```ts
   * const newRawExpense = {
   *   file: [File],
   * };
   * const response = await client.rawExpense.create(newRawExpense);
   * console.log(response.data);
   * ```
   */

  async create(
    data: CreateRawExpenseRequest
  ): Promise<AxiosResponse<RawExpense>> {
    const formData = new FormData();
    formData.append("file", data.file);

    return await this.http.post<RawExpense>("/customer/expense/raw", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Delete an raw expense by ID.
   *
   * @param id - Raw expense ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.rawExpense.delete('raw_expense_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/expense/raw/${id}`
    );
  }
}

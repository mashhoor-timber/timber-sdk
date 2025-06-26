import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateSalaryData {
  month: number;
  year: number;
}

export type UpdateSalaryData = Partial<CreateSalaryData>;

export interface Salary {
  _id: string;
  user: string;
  company: string;
  employee: string;
  month: string;
  year: string;
  basic_salary: number;
  allowance: number;
  deduction: number;
  incentive: number;
  overtime: number;
  net_salary: number;
  is_paid: boolean;
  paid_date: string;
  wafeq_expense_id: string;
  zoho_expense_id: string;
  qb_expense_id: string;
  xero_expense_id: string;
  reconciled: boolean;
  created_at: string;
  updated_at: string;
}

export interface SalaryQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
}

  /**
 * Service for Salary
 * 
 * @example 
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const salary = await client.salary.list({ page: 1, limit: 10 });
 * console.log(salary.data);
 * ```
 */

export class SalaryService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of salaries.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of salaries matching the query.
   *
   * @example
   * ```ts
   * const salaries = await client.salary.list({ page: 1, limit: 5 });
   * console.log(salaries.data);
   * ```
   */

  async list(params: SalaryQueryParams): Promise<AxiosResponse<Salary[]>> {
    return await this.http.get<Salary[]>("/customer/salary", {
      params,
    });
  }

  /**
   * Fetch a single salary by ID.
   *
   * @param id - Salary ID
   * @returns Salary object
   *
   * @example
   * ```ts
   * const salary = await client.salary.get('salary_id_here');
   * console.log(salary.data);
   * ```  
   */

  async get(id: string): Promise<AxiosResponse<Salary>> {
    return await this.http.get<Salary>(`/customer/salary/${id}`);
  }

  /**
   * Create a new salary.
   *
   * @param data - Salary creation payload
   * @returns The created salary
   *
   * @example
   * ```ts
   * const newSalary = {
   *   month: 1,
   *   year: 2025,
   *   basic_salary: 50000,
   *   allowance: 10000,
   *   deduction: 10000,
   *   incentive: 10000,
   *   overtime: 10000,
   *   net_salary: 50000,
   *   is_paid: true,
   *   paid_date: "2025-06-23",
   *   wafeq_expense_id: "123456789",
   *   zoho_expense_id: "123456789",
   *   qb_expense_id: "123456789",
   *   xero_expense_id: "123456789",
   *   reconciled: true,
   * };
   * const response = await client.salary.create(newSalary);
   * console.log(response.data);
   * ```  
   */

  async create(data: CreateSalaryData): Promise<AxiosResponse<Salary>> {
    return await this.http.post<Salary>("/customer/salary", data);
  }

  /**
   * Update an existing salary.
   *
   * @param id - Salary ID
   * @param data - Partial update data
   * @returns Updated salary
   *
   * @example
   * ```ts
   * const updates = { basic_salary: 60000 };
   * const updated = await client.salary.update('salary_id_here', updates);
   * console.log(updated.data);
   * ```  
   */

  async update(
    id: string,
    data: Partial<CreateSalaryData>
  ): Promise<AxiosResponse<Salary>> {
    return await this.http.put<Salary>(`/customer/salary/${id}`, data);
  }
}

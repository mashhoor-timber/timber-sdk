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

export class SalaryService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(params: SalaryQueryParams): Promise<AxiosResponse<Salary[]>> {
    return await this.http.get<Salary[]>("/customer/salary", {
      params,
    });
  }

  async get(id: string): Promise<AxiosResponse<Salary>> {
    return await this.http.get<Salary>(`/customer/salary/${id}`);
  }

  async create(data: CreateSalaryData): Promise<AxiosResponse<Salary>> {
    return await this.http.post<Salary>("/customer/salary", data);
  }

  async update(
    id: string,
    data: Partial<CreateSalaryData>
  ): Promise<AxiosResponse<Salary>> {
    return await this.http.put<Salary>(`/customer/salary/${id}`, data);
  }
}

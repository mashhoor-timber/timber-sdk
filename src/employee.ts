import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateEmployeeRequest {
  employee_id: string;
  name: string;
  designation: string;
  mobile: string;
  country_code: string;
  basic_salary: number;
  allowance: number;
  joining_date: string;
  is_active: boolean;
}

export type UpdateEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface Employee {
  _id: string;
  company: string;
  user: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeQueryParams {
  page: number;
  limit: number;
  sort: string;
}

export class EmployeeService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(params: EmployeeQueryParams): Promise<AxiosResponse<Employee[]>> {
    return await this.http.get<Employee[]>("/customer/employee", {
      params,
    });
  }

  async create(data: CreateEmployeeRequest): Promise<AxiosResponse<Employee>> {
    return await this.http.post<Employee>("/customer/employee", data);
  }

  async get(id: string): Promise<AxiosResponse<Employee>> {
    return await this.http.get<Employee>(`/customer/employee/${id}`);
  }

  async update(
    id: string,
    data: CreateEmployeeRequest
  ): Promise<AxiosResponse<Employee>> {
    return await this.http.put<Employee>(`/customer/employee/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/employee/${id}`
    );
  }
}

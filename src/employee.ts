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

/**
 * Service for Employee
 * 
 * @example 
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const employee = await client.employee.list({ page: 1, limit: 10 });
 * console.log(employee.data);
 * ```  
 */

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

  /**
   * Fetch a paginated list of employees.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of employees matching the query.
   *
   * @example
   * ```ts
   * const employees = await client.employee.list({ page: 1, limit: 5 });
   * console.log(employees.data);
   * ```  
   */
  async list(params: EmployeeQueryParams): Promise<AxiosResponse<Employee[]>> {
    return await this.http.get<Employee[]>("/customer/employee", {
      params,
    });
  }

    /**
   * Create a new employee.
   *
   * @param data - Employee creation payload
   * @returns The created employee
   *
   * @example
   * ```ts
   * const newEmployee = {
   *   employee_id: "123456789",
   *   name: "John Doe",
   *   designation: "CEO",
   *   mobile: "1234567890",
   *   country_code: "+1",
   *   basic_salary: 50000,
   *   allowance: 10000,
   *   joining_date: "2025-06-23",
   *   is_active: true,
   * };
   * const response = await client.employee.create(newEmployee);
   * console.log(response.data);
   * ```  
   */

  async create(data: CreateEmployeeRequest): Promise<AxiosResponse<Employee>> {
    return await this.http.post<Employee>("/customer/employee", data);
  }

  /**
   * Fetch an employee by ID.
   *
   * @param id - Employee ID
   * @returns Employee object
   *
   * @example
   * ```ts
   * const employee = await client.employee.get('employee_id_here');
   * console.log(employee.data);
   * ```  
   */

  async get(id: string): Promise<AxiosResponse<Employee>> {
    return await this.http.get<Employee>(`/customer/employee/${id}`);
  }

  /**
   * Update an existing employee.
   *
   * @param id - Employee ID
   * @param data - Partial update data
   * @returns Updated employee
   *
   * @example
   * ```ts
   * const updates = { basic_salary: 60000 };
   * const updated = await client.employee.update('employee_id_here', updates);
   * console.log(updated.data);
   * ```  
   */

  async update(
    id: string,
    data: CreateEmployeeRequest
  ): Promise<AxiosResponse<Employee>> {
    return await this.http.put<Employee>(`/customer/employee/${id}`, data);
  }

  /**
   * Delete an employee by ID.
   *
   * @param id - Employee ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.employee.delete('employee_id_here');
   * console.log(response.data.message);
   * ```  
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/employee/${id}`
    );
  }
}

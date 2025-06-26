import { AxiosInstance, AxiosResponse } from "axios";

export interface CustomerData {
  name: string;
  email: number;
  mobile?: string;
  country_code?: string;
  country?: string;
  city:string
  role: 'customer' | 'vendor' | 'biller'
  address:string
  trn?:string
  [key: string]: any;
}

export interface Customer extends CustomerData {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerQueryParams {
  page?: number;
  limit?: number;
}

/**
 * Service for Customer
 * 
 * @example 
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const customer = await client.customer.list({ page: 1, limit: 10 });
 * console.log(customer.data);
 * ```
 */

export class CustomerService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of customers.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of customers matching the query.
   *
   * @example
   * ```ts
   * const customers = await client.customer.list({ page: 1, limit: 5 });
   * console.log(customers.data);
   * ```
   */

  async list(
    params: CustomerQueryParams = {}
  ): Promise<AxiosResponse<Customer[]>> {
    return await this.http.get<Customer[]>("/customer/customer", { params });
  }

  /**
   * Fetch a single customer by ID.
   *
   * @param id - Customer ID
   * @returns Customer object
   *
   * @example
   * ```ts
   * const customer = await client.customer.get('customer_id_here');
   * console.log(customer.data);
   * ```  
   */

  async create(data: CustomerData): Promise<AxiosResponse<Customer>> {
    return await this.http.post<Customer>("/customer/customer", data);
  }

  /**
   * Update an existing customer.
   *
   * @param id - Customer ID
   * @param data - Partial update data
   * @returns Updated customer
   *
   * @example
   * ```ts
   * const updates = { name: "John Doe" };
   * const updated = await client.customer.update('customer_id_here', updates);
   * console.log(updated.data);
   * ```  
   */

  async update(
    id: string,
    data: Partial<CustomerData>
  ): Promise<AxiosResponse<Customer>> {
    return await this.http.put<Customer>(`/customer/customer/${id}`, data);
  }

  /**
   * Delete an customer by ID.
   *
   * @param id - Customer ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.customer.delete('customer_id_here');
   * console.log(response.data.message);
   * ```  
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/customer/${id}`
    );
  }
}
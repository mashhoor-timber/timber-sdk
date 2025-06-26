import { AxiosInstance, AxiosResponse } from "axios";

export interface CustomerData {
  name: string;
  email: number;
  mobile?: string;
  country_code?: string;
  country?: string;
  city:string
  role:string
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

export class CustomerService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: CustomerQueryParams = {}
  ): Promise<AxiosResponse<Customer[]>> {
    return await this.http.get<Customer[]>("/customer/customer", { params });
  }

  async create(data: CustomerData): Promise<AxiosResponse<Customer>> {
    return await this.http.post<Customer>("/customer/customer", data);
  }

  async update(
    id: string,
    data: Partial<CustomerData>
  ): Promise<AxiosResponse<Customer>> {
    return await this.http.put<Customer>(`/customer/customer/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/customer/${id}`
    );
  }
}
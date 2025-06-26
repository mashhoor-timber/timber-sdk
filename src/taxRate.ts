import { AxiosInstance, AxiosResponse } from "axios";

export interface TaxRateData {
  name: string;
  percentage: number;
  is_active: boolean;
  description?: string;
  country?: string;
  type:string
  [key: string]: any;
}

export interface TaxRate extends TaxRateData {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaxRateQueryParams {
  page?: number;
  limit?: number;
}

  /**
 * Service for Tax Rate
 * 
 * @example 
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const taxRate = await client.taxRate.list({ page: 1, limit: 10 });
 * console.log(taxRate.data);
 * ```    
 */
export class TaxRateService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: TaxRateQueryParams = {}
  ): Promise<AxiosResponse<TaxRate[]>> {
    return await this.http.get<TaxRate[]>("/customer/tax-rate", { params });
  }

  async get(id: string): Promise<AxiosResponse<TaxRate>> {
    return await this.http.get<TaxRate>(`/customer/tax-rate/${id}`);
  }
}
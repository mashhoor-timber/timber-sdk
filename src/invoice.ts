import { AxiosInstance, AxiosResponse } from "axios";
import FormData from "form-data";

export type NewInvoiceItem = {
  id: string;
  title: string;
  quantity: number;
  rate: number;
  vat: number;
  discount: number;
  total: number;
};

export interface InvoiceData {
  mode: "create" | "edit";
  payment_method: string;
  title: string;
  company: string;
  isTitleChanged: boolean;
  customer: {
    customer_id?: string;
    name: string;
    email: string;
    trn?: string;
    country_code: string;
    mobile: string;
    address: string;
  };
  biller: {
    biller_id?: string;
    name: string;
    email: string;
    country_code: string;
    mobile: string;
    address: string;
    trn?: string;
  };
  invoice_number: string;
  invoice_date: any;
  due_date: any | null;
  currency: string;
  items: NewInvoiceItem[];
  terms: any;
  notes: any;
  sub_total: number;
  vat_total: number;
  discount_total: number;
  shipping: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  logo: any | null | File;
  place_of_supply?: string;
  wafeq: boolean;
  zoho: boolean;
}

export interface Invoice extends InvoiceData {
  _id: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvoiceQueryParams {
  page?: number;
  limit?: number;
}

/**
 * Service for Invoice
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const invoice = await client.invoice.list({ page: 1, limit: 10 });
 * console.log(invoice.data);
 * ```
 */
export class InvoiceService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of invoices.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of invoices matching the query.
   *
   * @example
   * ```ts
   * const invoices = await client.invoice.list({ page: 1, limit: 5 });
   * console.log(invoices.data);
   * ```
   */

  async list(
    params: InvoiceQueryParams = {}
  ): Promise<AxiosResponse<Invoice[]>> {
    return await this.http.get<Invoice[]>("/customer/invoice", { params });
  }

  async create(data: InvoiceData): Promise<AxiosResponse<Invoice>> {
    const formData = new FormData();

    for (const key in data) {
      const value = (data as any)[key];

      if (key === "items" || key === "customer" || key === "biller") {
        formData.append(key, JSON.stringify(value));
      } else if (key === "logo" && value && typeof value.pipe === "function") {
        // This is a ReadStream
        formData.append("logo", value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    }
    return await this.http.post<Invoice>("/customer/invoice", formData, {
      headers: formData.getHeaders(),
    });
  }
  async update(
    id: string,
    data: Partial<InvoiceData>
  ): Promise<AxiosResponse<Invoice>> {
    const formData = new FormData();

    for (const key in data) {
      const value = (data as any)[key];

      if (key === "items" || key === "customer" || key === "biller") {
        formData.append(key, JSON.stringify(value));
      } else if (key === "logo" && value && typeof value.pipe === "function") {
        // This is a ReadStream
        formData.append("logo", value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    }
    return await this.http.put<Invoice>(`/customer/invoice/${id}`, data, {
      headers: formData.getHeaders(),
    });
  }

  /**
   * Delete an invoice by ID.
   *
   * @param id - Invoice ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.invoice.delete('invoice_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(
    id: string,
    data: { remarks: string }
  ): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/invoice/${id}`,
      {
        data,
      }
    );
  }
}

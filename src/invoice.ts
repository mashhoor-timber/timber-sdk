import { AxiosInstance, AxiosResponse } from "axios";

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
  logo: string | null | File;
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

  /**
   * Fetch a single invoice by ID.
   *
   * @param id - Invoice ID
   * @returns Invoice object
   *
   * @example
   * ```ts
   * const invoice = await client.invoice.get('invoice_id_here');
   * console.log(invoice.data);
   * ```
   */

  async get(id: string): Promise<AxiosResponse<Invoice>> {
    return await this.http.get<Invoice>(`/customer/invoice/${id}`);
  }

  /**
   * Create a new invoice.
   *
   * @param data - Invoice creation payload
   * @returns The created invoice
   *
   * @example
   * ```ts
   * const newInvoice = {
   *   mode: "create",
   *   payment_method: "cash",
   *   title: "Invoice",
   *   company: "Timber",
   *   isTitleChanged: false,
   *   customer: {
   *     customer_id: "123456789",
   *     name: "John Doe",
   *     email: "johndoe@example.com",
   *     trn: "123456789",
   *     country_code: "+1",
   *     mobile: "1234567890",
   *     address: "123 Main St, Anytown, USA",
   *   },
   *   biller: {
   *     biller_id: "123456789",
   *     name: "John Doe",
   *     email: "johndoe@example.com",
   *     country_code: "+1",
   *     mobile: "1234567890",
   *     address: "123 Main St, Anytown, USA",
   *     trn: "123456789",
   *   },
   *   invoice_number: "INV-1234",
   *   invoice_date: "2025-06-23",
   *   due_date: "2025-06-23",
   *   currency: "USD",
   *   items: [
   *     {
   *       id: "123456789",
   *       title: "Item 1",
   *       quantity: 1,
   *       rate: 100,
   *       vat: 0,
   *       discount: 0,
   *       total: 100,
   *     },
   *   ],
   *   terms: "Net 30",
   *   notes: "This is a note",
   *   sub_total: 100,
   *   vat_total: 0,
   *   discount_total: 0,
   *   shipping: 0,
   *   total: 100,
   *   amount_paid: 0,
   *   amount_due: 100,
   *   logo: "https://example.com/logo.png",
   *   place_of_supply: "Anytown, USA",
   *   wafeq: false,
   *   zoho: false,
   * };
   * const response = await client.invoice.create(newInvoice);
   * console.log(response.data);
   * ```
   */

  async create(data: InvoiceData): Promise<AxiosResponse<Invoice>> {
    return await this.http.post<Invoice>("/customer/invoice", data);
  }

  /**
   * Update an existing invoice.
   *
   * @param id - Invoice ID
   * @param data - Partial update data
   * @returns Updated invoice
   *
   * @example
   * ```ts
   * const updates = { title: "Updated Invoice" };
   * const updated = await client.invoice.update('invoice_id_here', updates);
   * console.log(updated.data);
   * ```
   */

  async update(
    id: string,
    data: Partial<InvoiceData>
  ): Promise<AxiosResponse<Invoice>> {
    return await this.http.put<Invoice>(`/customer/invoice/${id}`, data);
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

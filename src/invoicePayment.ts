import { AxiosInstance, AxiosResponse } from "axios";

export interface InvoicePaymentData {
  invoice: string;
  date: string;
  payment_method: string;
  cheque_no?: string;
  cheque_date?: string;
  bank_name?: string;
  file?: string;
  amount: string;
}

export interface InvoicePayment extends InvoicePaymentData {
  _id: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvoicePaymentQueryParams {
  page?: number;
  limit?: number;
  invoice: string;
}

/**
 * Service for Invoice Payment
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const invoicePayment = await client.invoicePayment.list({ page: 1, limit: 10 });
 * console.log(invoicePayment.data);
 * ```
 */

export class InvoicePaymentService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of invoice payments.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of invoice payments matching the query.
   *
   * @example
   * ```ts
   * const invoicePayments = await client.invoicePayment.list({ page: 1, limit: 5 });
   * console.log(invoicePayments.data);
   * ```
   */

  async list(
    params: InvoicePaymentQueryParams = {
      invoice: "",
    }
  ): Promise<AxiosResponse<InvoicePayment[]>> {
    return await this.http.get<InvoicePayment[]>(
      "/customer/invoice/payment-records",
      { params }
    );
  }

  /**
   * Create a new invoice payment.
   *
   * @param data - Invoice payment creation payload
   * @returns The created invoice payment
   *
   * @example
   * ```ts
   * const newInvoicePayment = {
   *   invoice: "INV-1234",
   *   date: "2025-06-23",
   *   payment_method: "cash",
   *   cheque_no: "123456789",
   *   cheque_date: "2025-06-23",
   *   cheque_due_date: "2025-06-23",
   *   amount: 45.75,
   *   bank_name: "Bank of America",
   *   is_paid: false,
   *   file: [File],
   * };
   * const response = await client.invoicePayment.create(newInvoicePayment);
   * console.log(response.data);
   * ```
   */
  async create(
    data: InvoicePaymentData
  ): Promise<AxiosResponse<InvoicePayment>> {
    return await this.http.post<InvoicePayment>(
      "/customer/invoice/payment-records",
      data
    );
  }

  /**
   * Update an existing invoice payment.
   *
   * @param id - Invoice payment ID
   * @param data - Partial update data
   * @returns Updated invoice payment
   *
   * @example
   * ```ts
   * const updates = { amount: 50.0 };
   * const updated = await client.invoicePayment.update('invoice_payment_id_here', updates);
   * console.log(updated.data);
   * ```
   */

  async update(
    id: string,
    data: Partial<InvoicePaymentData>
  ): Promise<AxiosResponse<InvoicePayment>> {
    return await this.http.put<InvoicePayment>(
      `/customer/invoice/payment-records/${id}`,
      data
    );
  }

  /**
   * Delete an invoice payment by ID.
   *
   * @param id - Invoice payment ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.invoicePayment.delete('invoice_payment_id_here');
   * console.log(response.data.message);
   * ```
   */

  async get(id: string): Promise<AxiosResponse<InvoicePayment>> {
    return await this.http.get<InvoicePayment>(
      `/customer/invoice/payment-records/${id}`
    );
  }

  /**
   * Delete an invoice payment by ID.
   *
   * @param id - Invoice payment ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.invoicePayment.delete('invoice_payment_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(
    id: string,
    data: { remarks: string }
  ): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/invoice/payment-records/${id}`,
      {
        data,
      }
    );
  }
}

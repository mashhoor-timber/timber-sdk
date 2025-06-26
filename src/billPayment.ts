import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateBillPaymentRequest {
  invoice: string;
  date: string;
  payment_method: "cash" | "bank" | "card" | "cheque" | "net_banking" | "other";
  cheque_no?: string;
  cheque_date?: string;
  cheque_due_date?: string;
  amount: number;
  bank_name?: string;
  is_paid: boolean;
  file: [File];
}

export type UpdateBillPaymentRequest = Partial<CreateBillPaymentRequest>;

export interface BillPayment {
  _id: string;
  company: string;
  user: string;
  zoho_payment_id?: string;
  wafeq_payment_id?: string;
  qb_payment_id?: string;
  reconciled: boolean;
  created_at: string;
  updated_at: string;
}

export interface BillPaymentQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
  invoice: string;
}

/**
 * Service for Bill Payment
 * 
 * @example 
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const billPayment = await client.billPayment.list({ page: 1, limit: 10 });
 * console.log(billPayment.data);
 * ```
 */

export class BillPaymentService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of bill payments.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of bill payments matching the query.
   *
   * @example
   * ```ts
   * const billPayments = await client.billPayment.list({ page: 1, limit: 5 });
   * console.log(billPayments.data);
   * ```
   */

  async list(
    params: BillPaymentQueryParams
  ): Promise<AxiosResponse<BillPayment[]>> {
    return await this.http.get<BillPayment[]>(
      "/customer/purchase/payment-record",
      {
        params,
      }
    );
  }

  /**
   * Create a new bill payment.
   *
   * @param data - Bill payment creation payload
   * @returns The created bill payment
   *
   * @example
   * ```ts
   * const newBillPayment = {
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
   * const response = await client.billPayment.create(newBillPayment);
   * console.log(response.data);
   * ```    
   */

  async create(
    data: CreateBillPaymentRequest
  ): Promise<AxiosResponse<BillPayment>> {
    const formData = new FormData();
    formData.append("invoice", data.invoice);
    formData.append("date", data.date);
    formData.append("payment_method", data.payment_method);
    if (data.cheque_no) {
      formData.append("cheque_no", data.cheque_no);
    }
    if (data.cheque_date) {
      formData.append("cheque_date", data.cheque_date);
    }
    if (data.cheque_due_date) {
      formData.append("cheque_due_date", data.cheque_due_date);
    }
    if (data.bank_name) {
      formData.append("bank_name", data.bank_name);
    }
    formData.append("amount", data.amount.toString());
    if (data.file) {
      formData.append("file", data.file[0]);
    }
    return await this.http.post<BillPayment>(
      "/customer/purchase/payment-record",
      formData
    );
  }

  /**
   * Update an existing bill payment.
   *
   * @param id - Bill payment ID
   * @param data - Partial update data
   * @returns Updated bill payment
   *
   * @example
   * ```ts
   * const updates = { amount: 50.0 };
   * const updated = await client.billPayment.update('bill_payment_id_here', updates);
   * console.log(updated.data);
   * ```
   */

  async update(
    id: string,
    data: CreateBillPaymentRequest
  ): Promise<AxiosResponse<BillPayment>> {
    const formData = new FormData();
    formData.append("invoice", data.invoice);
    formData.append("date", data.date);
    formData.append("payment_method", data.payment_method);
    if (data.cheque_no) {
      formData.append("cheque_no", data.cheque_no);
    }
    if (data.cheque_date) {
      formData.append("cheque_date", data.cheque_date);
    }
    if (data.cheque_due_date) {
      formData.append("cheque_due_date", data.cheque_due_date);
    }
    if (data.bank_name) {
      formData.append("bank_name", data.bank_name);
    }
    formData.append("amount", data.amount.toString());
    if (data.file) {
      formData.append("file", data.file[0]);
    }
    return await this.http.put<BillPayment>(
      `/customer/purchase/payment-record/${id}`,
      formData
    );
  }

  /**
   * Delete an bill payment by ID.
   *
   * @param id - Bill payment ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.billPayment.delete('bill_payment_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/purchase/payment-record/${id}`
    );
  }
}

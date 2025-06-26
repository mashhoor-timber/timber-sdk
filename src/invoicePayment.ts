import { AxiosInstance, AxiosResponse } from "axios";

export interface InvoicePaymentData {
 invoice:string
 date:string
 payment_method:string
 cheque_no?:string
 cheque_date?:string
 bank_name?:string
 file?:string
 amount:string
}

export interface InvoicePayment extends InvoicePaymentData {
  _id: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvoicePaymentQueryParams {
  page?: number;
  limit?: number;
  invoice:string
}

export class InvoicePaymentService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: InvoicePaymentQueryParams = {
      invoice: ""
    }
  ): Promise<AxiosResponse<InvoicePayment[]>> {
    return await this.http.get<InvoicePayment[]>("/customer/invoice/payment-records", { params });
  }

  async create(data: InvoicePaymentData): Promise<AxiosResponse<InvoicePayment>> {
    return await this.http.post<InvoicePayment>("/customer/invoice/payment-records", data);
  }

  async update(
    id: string,
    data: Partial<InvoicePaymentData>
  ): Promise<AxiosResponse<InvoicePayment>> {
    return await this.http.put<InvoicePayment>(`/customer/invoice/payment-records/${id}`, data);
  }

  async get(id: string): Promise<AxiosResponse<InvoicePayment>> {
    return await this.http.get<InvoicePayment>(`/customer/invoice/payment-records/${id}`);
  }

async delete(id: string, data: { remarks: string }): Promise<AxiosResponse<{ message: string }>> {
  return await this.http.delete<{ message: string }>(`/customer/invoice/payment-records/${id}`, {
    data,
  });
}
}
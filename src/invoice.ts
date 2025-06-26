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

export class InvoiceService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: InvoiceQueryParams = {}
  ): Promise<AxiosResponse<Invoice[]>> {
    return await this.http.get<Invoice[]>("/customer/invoice", { params });
  }

  async create(data: InvoiceData): Promise<AxiosResponse<Invoice>> {
    return await this.http.post<Invoice>("/customer/invoice", data);
  }

  async update(
    id: string,
    data: Partial<InvoiceData>
  ): Promise<AxiosResponse<Invoice>> {
    return await this.http.put<Invoice>(`/customer/invoice/${id}`, data);
  }

  async get(id: string): Promise<AxiosResponse<Invoice>> {
    return await this.http.get<Invoice>(`/customer/invoice/${id}`);
  }

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

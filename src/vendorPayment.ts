import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateVendorPaymentRequest {
  title: string;
  customer: {
    customer_id?: string;
    name: string;
    email: string;
    trn: string;
    country_code: string;
    mobile: string;
    address: string;
  };
  biller: {
    biller_id?: string;
    name: string;
    email: string;
    trn: string;
    country_code: string;
    mobile: string;
    address: string;
  };
  invoice_number: string;
  order_number: string;
  invoice_date: string;
  due_date: string;
  currency: string;
  items: [
    {
      title: string;
      quantity: number;
      rate: number;
      vat: number;
      discount: number;
      total: number;
    }
  ];
  terms: string;
  notes: string;
  sub_total: number;
  vat_total: number;
  discount_total: number;
  shipping: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  logo: File;
  status: string;
}

export type UpdateVendorPaymentRequest = Partial<CreateVendorPaymentRequest>;

export interface VendorPayment {
  _id: string;
  user: string;
  company: string;
  wafeq: boolean;
  zoho: boolean;
  created_at: string;
  updated_at: string;
}

export interface VendorPaymentQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
}

export class VendorPaymentService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: VendorPaymentQueryParams
  ): Promise<AxiosResponse<VendorPayment[]>> {
    return await this.http.get<VendorPayment[]>("/customer/purchase", {
      params,
    });
  }

  async get(id: string): Promise<AxiosResponse<VendorPayment>> {
    return await this.http.get<VendorPayment>(`/customer/purchase/${id}`);
  }

  async create(
    data: CreateVendorPaymentRequest
  ): Promise<AxiosResponse<VendorPayment>> {
    const formData = new FormData();
    try {
      Object.entries(data).forEach(([key, value]: any) => {
        if (key === "customer" || key === "biller") {
          if (typeof value === "object" && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]: any) => {
              if (subValue) {
                formData.append(`${key}[${subKey}]`, subValue);
              }
            });
          }
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              Object.entries(item).forEach(([subKey, subValue]: any) => {
                formData.append(`${key}[${index}][${subKey}]`, subValue);
              });
            } else if (typeof item === "string" || item instanceof Blob) {
              formData.append(key, item);
            }
          });
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === "string" || value instanceof Blob) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value as any);
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
    if (data.logo) {
      formData.append("file", data.logo);
    }
    return await this.http.post<VendorPayment>("/customer/purchase", formData);
  }

  async update(
    id: string,
    data: UpdateVendorPaymentRequest
  ): Promise<AxiosResponse<VendorPayment>> {
    const formData = new FormData();
    try {
      Object.entries(data).forEach(([key, value]: any) => {
        if (key === "customer" || key === "biller") {
          if (typeof value === "object" && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]: any) => {
              if (subValue) {
                formData.append(`${key}[${subKey}]`, subValue);
              }
            });
          }
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              Object.entries(item).forEach(([subKey, subValue]: any) => {
                formData.append(`${key}[${index}][${subKey}]`, subValue);
              });
            } else if (typeof item === "string" || item instanceof Blob) {
              formData.append(key, item);
            }
          });
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === "string" || value instanceof Blob) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value as any);
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
    if (data.logo) {
      formData.append("file", data.logo);
    }
    return await this.http.put<VendorPayment>(
      `/customer/purchase/${id}`,
      formData
    );
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.patch<{ message: string }>(
      `/customer/purchase/${id}`
    );
  }
}

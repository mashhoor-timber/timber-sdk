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

/**
 * Service for Vendor Payment
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const vendorPayment = await client.vendorPayment.list({ page: 1, limit: 10 });
 * console.log(vendorPayment.data);
 * ```
 */
export class VendorPaymentService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of vendor payments.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of vendor payments matching the query.
   *
   * @example
   * ```ts
   * const vendorPayments = await client.vendorPayment.list({ page: 1, limit: 5 });
   * console.log(vendorPayments.data);
   * ```
   */
  async list(
    params: VendorPaymentQueryParams
  ): Promise<AxiosResponse<VendorPayment[]>> {
    return await this.http.get<VendorPayment[]>("/customer/purchase", {
      params,
    });
  }

  /**
   * Fetch a single vendor payment by ID.
   *
   * @param id - Vendor payment ID
   * @returns Vendor payment object
   *
   * @example
   * ```ts
   * const vendorPayment = await client.vendorPayment.get('vendor_payment_id_here');
   * console.log(vendorPayment.data);
   * ```
   */
  async get(id: string): Promise<AxiosResponse<VendorPayment>> {
    return await this.http.get<VendorPayment>(`/customer/purchase/${id}`);
  }

  /**
   * Create a new vendor payment.
   *
   * @param data - Vendor payment creation payload
   * @returns The created vendor payment
   *
   * @example
   * ```ts
   * const newVendorPayment = {
   *   title: "Vendor Payment",
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
   *   order_number: "123456789",
   *   invoice_date: "2025-06-23",
   *   due_date: "2025-06-23",
   *   currency: "USD",
   *   items: [
   *     {
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
   *   status: "pending",
   * };
   * const response = await client.vendorPayment.create(newVendorPayment);
   * console.log(response.data);
   * ```
   */
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

  /**
   * Update an existing vendor payment.
   *
   * @param id - Vendor payment ID
   * @param data - Partial update data
   * @returns Updated vendor payment
   *
   * @example
   * ```ts
   * const updates = { amount: 50.0 };
   * const updated = await client.vendorPayment.update('vendor_payment_id_here', updates);
   * console.log(updated.data);
   * ```
   */

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

  /**
   * Delete an vendor payment by ID.
   *
   * @param id - Vendor payment ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.vendorPayment.delete('vendor_payment_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.patch<{ message: string }>(
      `/customer/purchase/${id}`
    );
  }
}

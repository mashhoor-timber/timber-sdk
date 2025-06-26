import { AxiosInstance, AxiosResponse } from "axios";

export interface CreateRawExpenseRequest {
  file: File;
}

export interface RawExpense {
  _id: string;
  user: string;
  company: string;
  status: string;
  expense_id: string;
  files: [
    {
      name: string;
      type: string;
      url: string;
      size: number;
      extension: string;
    }
  ];
  created_at: string;
  updated_at: string;
}

export interface RawExpenseQueryParams {
  page: number;
  limit: number;
  sort: string;
  filters: string;
}

export class RawExpenseService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params: RawExpenseQueryParams
  ): Promise<AxiosResponse<RawExpense[]>> {
    return await this.http.get<RawExpense[]>("/customer/expense/raw", {
      params,
    });
  }

  async create(data: CreateRawExpenseRequest): Promise<AxiosResponse<RawExpense>> {
    const formData = new FormData();
    formData.append("file", data.file);

    return await this.http.post<RawExpense>("/customer/expense/raw", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(
      `/customer/expense/raw/${id}`
    );
  }
}

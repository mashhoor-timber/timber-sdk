import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { ExpenseService } from "./expense";
import { RawExpenseService } from "./rawExpense";
import { VendorPaymentService } from "./vendorPayment";
import { ExpenseCategoryService } from "./expenseCategory";
import { BillPaymentService } from "./billPayment";

class TimberClient {
  expense: ExpenseService;
  expenseCategory: ExpenseCategoryService;
  rawExpense: RawExpenseService;
  vendorPayment: VendorPaymentService;
  billPayment: BillPaymentService;

  constructor(apiKey: string, options: { baseURL?: string } = {}) {
    const baseURL = `${
      options.baseURL || "http://localhost:4010"
    }/api/v1/user/sdk`;

    const http = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    this.expense = new ExpenseService(http);
    this.expenseCategory = new ExpenseCategoryService(http);
    this.rawExpense = new RawExpenseService(http);
    this.vendorPayment = new VendorPaymentService(http);
    this.billPayment = new BillPaymentService(http);
  }
}

export const createClient = (apiKey: string, options = {}) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  return new TimberClient(apiKey, options);
};

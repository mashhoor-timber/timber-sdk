import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { ExpenseService } from "./expense";
import { RawExpenseService } from "./rawExpense";
import { VendorPaymentService } from "./vendorPayment";
import { ExpenseCategoryService } from "./expenseCategory";
import { BillPaymentService } from "./billPayment";
import { InvoiceService } from "./invoice";
import { InvoicePaymentService } from "./invoicePayment";
import { CustomerService } from "./customer";
import { TaxRateService } from "./taxRate";


class TimberClient {
  expense: ExpenseService;
  expenseCategory: ExpenseCategoryService;
  rawExpense: RawExpenseService;
  invoice: InvoiceService;
  invoicePayment: InvoicePaymentService;
  vendorPayment: VendorPaymentService;
  billPayment: BillPaymentService;
  customer: CustomerService;
  taxRate: TaxRateService;

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
    this.invoice = new InvoiceService(http);
    this.invoicePayment = new InvoicePaymentService(http);
    this.customer = new CustomerService(http);
    this.taxRate = new TaxRateService(http);
  }
}

export const createClient = (apiKey: string, options = {}) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  return new TimberClient(apiKey, options);
};

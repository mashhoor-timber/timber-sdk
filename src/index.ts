import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { ExpenseService } from "./expense";

class TimberClient {
  expense: ExpenseService;

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
  }
}

export const createClient = (apiKey: string, options = {}) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  return new TimberClient(apiKey, options);
};

// services/userService.ts


import { AxiosResponse } from "axios";
import { api } from "../api";

const BASE_URL = "https://bijlee-customer-service-development-cmbwhkc6ecg6dne4.centralindia-01.azurewebsites.net/api/v1";

export const userService = {
  getUserDetailsByEmail: async (emailId: string): Promise<any> => {
    try {
      const response: AxiosResponse = await api.post(
        `${BASE_URL}/getUserDetails`,
        { emailId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },
};

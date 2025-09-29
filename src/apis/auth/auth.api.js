import { apiClient } from "../../utils/api-client.js";
import {
  loginUserAPIResponse,
  forgotPasswordAPIResponse,
  resetPasswordAPIResponse,
} from "./schemas.js";

export const authApi = {
  registerUser: (config) => {
    return apiClient.makeRequest({
      ...config,
      url: "/user/register",
      method: "POST",
      schema: loginUserAPIResponse,
    });
  },
  loginUser: (config) => {
    return apiClient.makeRequest({
      ...config,
      url: "/user/login",
      method: "POST",
      schema: loginUserAPIResponse,
    });
  },
  forgotPassword: (config) => {
    return apiClient.makeRequest({
      ...config,
      url: "/user/forgotPassword",
      method: "POST",
      schema: forgotPasswordAPIResponse,
    });
  },
  resetPassword: (config) => {
    return apiClient.makeRequest({
      ...config,
      url: "/user/resetPassword",
      method: "POST",
      schema: resetPasswordAPIResponse,
    });
  },
};

import { axiosInstance } from "../Lib/axios.js";

export const checkAuth = async () => {
  const response = await axiosInstance.get("/auth/checkAuth", {
    timeout: 5000,
  });

  return response.data;
};

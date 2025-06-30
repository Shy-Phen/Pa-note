import { axiosInstance } from "../Lib/axios.js";
export const createUser = async (data) => {
  const res = await axiosInstance.post("/auth/create-user", data);
  return res.data.user;
};

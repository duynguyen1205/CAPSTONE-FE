import axios from "../utils/axios-customize";

// gọi tất cả api ở đây

// get all user

export const getAllUser = () => {
  return axios.get("/api/user");
};

export const getAllCategory = () => {
    return axios.get("/api/category");
};
// src/services/userService.js
import apiClient from "./appClient";

export const getAllUsers = () => {
  return apiClient.get("/admin/users");
};

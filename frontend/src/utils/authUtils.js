// src/utils/authUtils.js
export const getAuthHeaders = () => {
  const userInfo = localStorage.getItem("userInfo"); // Assuming userInfo is stored in localStorage
  const token = userInfo ? JSON.parse(userInfo).token : null;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

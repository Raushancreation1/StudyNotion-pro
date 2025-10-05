import axios from "axios";

export const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL, withCredentials: true, });

// Attach Authorization header automatically if available in localStorage
axiosInstance.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("token");
    const token = stored ? JSON.parse(stored) : null;
    if (token && (!config.headers || !config.headers["Authorization"])) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (_) {
    // ignore parse errors
  }
  return config;
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

import axios from "axios";

// Central axios instance with base URL and credentials
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Attach Authorization header from localStorage; also override bad values
axiosInstance.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("token");
    const token = stored ? JSON.parse(stored) : null;
    const existing = config.headers?.["Authorization"]; 
    const bad = existing === "Bearer undefined" || existing === "Bearer null" || existing === "Bearer "
    if (token && (!existing || bad)) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    } else if (!token && bad) {
      // remove bad header so backend can use cookie/body token fallback
      if (config.headers) {
        delete config.headers["Authorization"];
      }
    }
  } catch (_) {
    // ignore
  }
  return config;
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  // sanitize caller-provided headers
  if (headers && typeof headers === "object") {
    const existing = headers["Authorization"]
    if (
      existing === "Bearer undefined" ||
      existing === "Bearer null" ||
      existing === "Bearer "
    ) {
      delete headers["Authorization"]
    }
  }
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

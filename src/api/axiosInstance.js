import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getAuthTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// === Request Interceptor: Refresh Token if Expired ===
axiosInstance.interceptors.request.use(async (req) => {
  const { accessToken, refreshToken } = getAuthTokens();
  if (!accessToken) return req;

  try {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      return req;
    }

    const response = await axiosInstance.post(`/auth/jwt/refresh/`, { refresh: refreshToken });
    const newAccessToken = response.data.access;

    localStorage.setItem('accessToken', newAccessToken);
    req.headers.Authorization = `Bearer ${newAccessToken}`;
    return req;

  } catch (err) {
    console.warn("Token refresh failed:", err);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return req;
  }
});

// === Response Interceptor: Redirect on 401 ===
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized – redirecting to login...');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import { getCookies } from "@/lib/getCookies";
import axios, { AxiosInstance } from "axios";

const createInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SUPABASEURL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  api.interceptors.request.use(
    (config) => {
      //Obtener el token de acceso desde las cookies
      const token = getCookies("token");

      //Si el token existe, lo agrega a los encabezados para generar la autenticación
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

export const API = createInstance();

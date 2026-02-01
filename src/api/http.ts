import axios from "axios";

const API_HOST = process.env.REACT_APP_API_DOMAIN ?? "localhost";
const API_PORT = process.env.REACT_APP_API_PORT ?? "80";
const API_PREFIX = process.env.REACT_APP_API_PREFIX ?? "/api/v1";

export const API_BASE_URL = `http://${API_HOST}:${API_PORT}${API_PREFIX}`;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

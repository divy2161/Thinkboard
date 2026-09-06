import axios from "axios";

// In development, use the local backend.
// In production, use the deployed Render backend.
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://thinkboard-2-slt0.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
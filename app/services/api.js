import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // back-end FastAPI
});

export async function getHello() {
  const response = await api.get("/"); // rota do FastAPI
  return response.data;
}


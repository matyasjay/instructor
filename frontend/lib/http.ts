import axios from "axios";

export const client = axios.create({
  method: "GET",
  baseURL: "http://localhost:3333",
  headers: { "Access-Control-Allow-Origin": "*" },
});

import axios from "axios";

const bearToken = process.env.BEARER_TOKEN;

export const api = axios.create({
  baseURL: `https://api.airtable.com/v0/`,
});

api.defaults.headers.common["Authorization"] = `Bearer ${bearToken}`;

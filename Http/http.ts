import Axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = Axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
});

export default instance;

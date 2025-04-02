import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MODE === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true,
});
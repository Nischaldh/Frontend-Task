import axios from "axios";
import { env } from "../constants/env.js";

const backendURL = env.BACKEND_URL;


const apiClient = axios.create({
    baseURL: backendURL,
    headers:{
        "Content-Type":"application/json",
    },
});

export default apiClient;
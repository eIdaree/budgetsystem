// http://localhost:3000/api

import axios from "axios";
import { getTokenFromLocalStorage } from "../helper/localstorage.helper";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    headers: {
        "Authorization": 'Bearer ' + getTokenFromLocalStorage() || '',
    },
})
import axios from 'axios';

export const DEV = import.meta.env.DEV

export const api = axios.create({
    baseURL: DEV ? "http://localhost:8080/date-entry" : "http://10.0.0.2:8080/date-entry"
});

import axios from 'axios';

// export const DEV = import.meta.env.DEV

export const api = axios.create({
    // baseURL: DEV ? "http://localhost:8080/date-entry" : "https://timetrackerserver:8080/date-entry"
    baseURL: "http://localhost:8080/date-entry"
});

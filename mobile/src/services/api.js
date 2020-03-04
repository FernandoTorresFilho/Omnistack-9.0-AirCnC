import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.25.116:3030"
});

export default api;

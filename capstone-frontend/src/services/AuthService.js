import axios from "axios";

const baseUrl = "http://localhost:3500";

export async function signup(payload) {
    const response = await axios.post(`${baseUrl}/signup`, payload);
    return response.data; // data from the API ENDPOINT
}

export async function login(payload) {
    const response = await axios.post(`${baseUrl}/login`, payload);
    return response.data; // data from the API ENDPOINT
}
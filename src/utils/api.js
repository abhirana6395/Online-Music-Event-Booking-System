import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Set auth token in headers  
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// API Calls
export const getAllEvents = () => API.get("/events");

export const getEventById = (id) => API.get(`/events/${id}`);

export const bookEvent = (id, data) =>
  API.post(`/events/${id}/book`, data);

export default API;

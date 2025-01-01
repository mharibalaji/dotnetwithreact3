import axios from "axios";

// Set base URL for all API requests
const api = axios.create({
  baseURL: "http://localhost:5003/api",  // Change this to your API endpoint
});

// Intercept the request to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API calls for Tasks
export const getTasks = () => api.get("/task");
export const createTask = (task) => api.post("/task", task);
export const updateTask = (id, task) => api.put(`/task/${id}`, task);
export const deleteTask = (id) => api.delete(`/task/${id}`);

// API calls for Authentication
export const login = (userData) => api.post('/auth/login', userData);

// **Updated Register API**
export const register = (userData) => api.post("/auth/register", userData );

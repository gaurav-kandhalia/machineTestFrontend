// src/api/apiClient.js
import axios from 'axios';


const apiClient = axios.create({
  // baseURL: "http://localhost:5911/api/v1", 
  baseURL:"https://machinetest-hsbk.onrender.com/api/v1",
  withCredentials: true,
});


export default apiClient;

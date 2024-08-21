// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://servertech3sw.onrender.com', // URL del backend
  withCredentials: true, // Para enviar cookies con cada solicitud si es necesario
});

export default instance;


  //https://servertech3sw.onrender.com

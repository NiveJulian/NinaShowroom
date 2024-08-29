// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://server-ninashowroom.vercel.app',
   baseURL: 'http://localhost:3001',
  withCredentials: true, // Para enviar cookies con cada solicitud si es necesario
});

export default instance;


  //server-ninashowroom.vercel.app

import axios from "axios";

const API_URL = "http://localhost:3001/vehicles";

export const getVehicles = (params) =>
  axios.get(API_URL, { params });

export const getVehicleById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createVehicle = (data) =>
  axios.post(API_URL, data);

export const updateVehicle = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteVehicle = (id) =>
  axios.delete(`${API_URL}/${id}`);

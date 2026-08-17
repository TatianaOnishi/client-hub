import axios from 'axios';
import { Customer } from '../types/customer';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerAPI = {
  getAll: async () => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  create: async (customer: Omit<Customer, 'id'>) => {
    const response = await api.post<Customer>('/customers', customer);
    return response.data;
  },

  update: async (id: string, customer: Omit<Customer, 'id'>) => {
    const response = await api.put<Customer>(`/customers/${id}`, customer);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/customers/${id}`);
  },
};

export default api;

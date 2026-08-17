import { customerAPI } from './api';
import type { CustomerFormData } from '../schemas/customer.schema';

export async function createCustomer(data: CustomerFormData) {
return customerAPI.create(data);
}

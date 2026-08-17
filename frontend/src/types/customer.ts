export interface Customer {
  id: string;
  fullName: string;
  cpf: string;
  email: string;
  favoriteColor: string;
  observations?: string;
  createdAt: string;
}

export interface CreateCustomerData {
  fullName: string;
  cpf: string;
  email: string;
  favoriteColor: string;
  observations?: string;
}
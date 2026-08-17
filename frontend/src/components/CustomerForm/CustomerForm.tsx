import React, { useState } from 'react';
import './CustomerForm.css';

interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomerFormProps {
  onSubmit: (customer: Customer) => void;
  initialData?: Customer;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Customer>(
    initialData || {
      name: '',
      email: '',
      phone: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {initialData ? 'Atualizar' : 'Criar'} Cliente
      </button>
    </form>
  );
};

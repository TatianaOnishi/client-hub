import React, { useEffect, useState } from 'react';
import { CustomerForm } from './components/CustomerForm/CustomerForm';
import { customerAPI } from './services/api';
import { Customer } from './types/customer';
import './App.css';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customerAPI.getAll();
      setCustomers(data);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = async (customer: Omit<Customer, 'id'>) => {
    try {
      await customerAPI.create(customer);
      await loadCustomers();
    } catch (err) {
      setError('Erro ao criar cliente');
      console.error(err);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await customerAPI.delete(id);
      await loadCustomers();
    } catch (err) {
      setError('Erro ao deletar cliente');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gerenciador de Clientes</h1>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>Adicionar Novo Cliente</h2>
          <CustomerForm onSubmit={handleCustomerSubmit} />
        </section>

        <section className="customers-section">
          <h2>Lista de Clientes</h2>
          {loading && <p className="loading">Carregando...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && customers.length === 0 && (
            <p className="no-data">Nenhum cliente encontrado</p>
          )}
          {!loading && customers.length > 0 && (
            <div className="customers-list">
              {customers.map((customer) => (
                <div key={customer.id} className="customer-card">
                  <div className="customer-info">
                    <h3>{customer.name}</h3>
                    <p>Email: {customer.email}</p>
                    <p>Telefone: {customer.phone}</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

import { CustomerForm } from './components/CustomerForm/CustomerForm';

import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <span className="brand-label">
            CLIENT HUB
          </span>

          <h1>
            Cadastro de cliente
          </h1>

          <p>
            Preencha os dados abaixo para realizar
            seu cadastro.
          </p>
        </div>
      </header>

      <main className="app-main">
        <section
          className="form-card"
          aria-labelledby="form-title"
        >
          <div className="form-card-header">
            <h2 id="form-title">
              Seus dados
            </h2>

            <p>
              Os campos marcados com{' '}
              <span aria-hidden="true">*</span>{' '}
              são obrigatórios.
            </p>
          </div>

          <CustomerForm />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Client Hub · Cadastro seguro de clientes
        </p>
      </footer>
    </div>
  );
}

export default App;
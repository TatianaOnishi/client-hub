import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './CustomerForm.css';

import {
  customerSchema,
  type CustomerFormData,
} from '../../schemas/customer.schema';

import { RAINBOW_COLORS } from '../../constants/colors';
import { createCustomer } from '../../services/customer.service';

function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, '').slice(0, 11);

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 6) {
    return (
      numbers.substring(0, 3) +
      '.' +
      numbers.substring(3)
    );
  }

  if (numbers.length <= 9) {
    return (
      numbers.substring(0, 3) +
      '.' +
      numbers.substring(3, 6) +
      '.' +
      numbers.substring(6)
    );
  }

  return (
    numbers.substring(0, 3) +
    '.' +
    numbers.substring(3, 6) +
    '.' +
    numbers.substring(6, 9) +
    '-' +
    numbers.substring(9)
  );
}

export function CustomerForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullName: '',
      cpf: '',
      email: '',
      favoriteColor: '',
      observations: '',
    },
  });

  const selectedColor = watch('favoriteColor');

  async function onSubmit(data: CustomerFormData) {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await createCustomer({
        fullName: data.fullName,
        cpf: data.cpf.replace(/\D/g, ''),
        email: data.email,
        favoriteColor: data.favoriteColor,
        observations: data.observations,
      });

      setSuccessMessage('Cliente cadastrado com sucesso!');
      reset();
    } catch (error: unknown) {
      console.error(error);

      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        const response = (
          error as {
            response?: {
              status?: number;
            };
          }
        ).response;

        if (response?.status === 409) {
          setErrorMessage('Este CPF já está cadastrado.');
          return;
        }
      }

      setErrorMessage(
        'Não foi possível realizar o cadastro. Tente novamente.'
      );
    }
  }

  const cpfRegister = register('cpf');

  return (
    <form
      className="customer-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="form-grid">
        <div className="form-field form-field-full">
          <label htmlFor="fullName">
            Nome completo <span aria-hidden="true">*</span>
          </label>

          <input
            id="fullName"
            type="text"
            placeholder="Ex.: Maria da Silva"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            {...register('fullName')}
          />

          {errors.fullName && (
            <span className="field-error" role="alert">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="cpf">
            CPF <span aria-hidden="true">*</span>
          </label>

          <input
            id="cpf"
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            maxLength={14}
            autoComplete="off"
            aria-invalid={Boolean(errors.cpf)}
            {...cpfRegister}
            onChange={(event) => {
              const formattedValue = formatCPF(event.target.value);

              cpfRegister.onChange({
                ...event,
                target: {
                  ...event.target,
                  value: formattedValue,
                },
              });
            }}
          />

          {errors.cpf && (
            <span className="field-error" role="alert">
              {errors.cpf.message}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">
            E-mail <span aria-hidden="true">*</span>
          </label>

          <input
            id="email"
            type="email"
            placeholder="maria@email.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />

          {errors.email && (
            <span className="field-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <fieldset className="form-field form-field-full color-field">
          <legend>
            Cor preferida <span aria-hidden="true">*</span>
          </legend>

          <p className="field-hint">
            Escolha uma cor disponível no arco-íris.
          </p>

          <div className="color-options">
            {RAINBOW_COLORS.map((color) => (
              <label
                key={color.value}
                className={
                  selectedColor === color.value
                    ? 'color-option color-option-selected'
                    : 'color-option'
                }
              >
                <input
                  type="radio"
                  value={color.value}
                  aria-label={color.label}
                  {...register('favoriteColor')}
                />

                <span
                  className="color-swatch"
                  style={{ backgroundColor: color.hex }}
                />

                <span className="color-name">{color.label}</span>
              </label>
            ))}
          </div>

          {errors.favoriteColor && (
            <span className="field-error" role="alert">
              {errors.favoriteColor.message}
            </span>
          )}
        </fieldset>

        <div className="form-field form-field-full">
          <label htmlFor="observations">
            Observações
          </label>

          <textarea
            id="observations"
            rows={5}
            maxLength={1000}
            placeholder="Alguma informação adicional?"
            {...register('observations')}
          />

          <span className="field-hint">
            Campo opcional. Máximo de 1000 caracteres.
          </span>

          {errors.observations && (
            <span className="field-error" role="alert">
              {errors.observations.message}
            </span>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="form-feedback">
          <div className="feedback feedback-success" role="status">
            <span className="feedback-icon" aria-hidden="true">
              ✓
            </span>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="form-feedback">
          <div className="feedback feedback-error" role="alert">
            <span className="feedback-icon" aria-hidden="true">
              !
            </span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <span className="loading-spinner" aria-hidden="true" />
        )}
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar cliente'}
      </button>
    </form>
  );
}
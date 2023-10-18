/* eslint-disable no-nested-ternary */
import React from 'react';

import Button from '../../Components/Button';
import FormGroup from '../../Components/FormGroup';
import * as yup from 'yup';
import { Form } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from '../Spinner';
import InputCash from '../InputCash';
import { ICashOutRequest } from '../../Data/interface/Account/ICashOutRequest';

interface IFormCash {
  onSubmit: (data: ICashOutRequest) => void;
  loading?: boolean;
}

const schema = yup.object({
  creditedUsername: yup.string().min(3, 'Mínimo 3 caracteres').required('Campo obrigatório'),
  value: yup.number().positive('Insira um número válido').required('Campo obrigatório'),
}).required();

function FormCash({ onSubmit, loading }: IFormCash) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICashOutRequest>({resolver: yupResolver(schema)});

  return (
    <Form
      autoComplete="new-password"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup
        title="Username de destino:"
        error={errors.creditedUsername?.message}
      >
        <InputCash
          {...register('creditedUsername')}
          autoComplete="new-password"
        />
      </FormGroup>
      <FormGroup
        title="Valor:"
        error={errors.value?.message}
      >
        <InputCash
          {...register('value')}
          type="number"
          autoComplete="new-password"
        />
      </FormGroup>

      <div className="submit">
        <Button type="submit">
          Enviar
          {loading && <Spinner size={12} />}
        </Button>
      </div>
    </Form>
  );
}

export default FormCash;

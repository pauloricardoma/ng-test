/* eslint-disable no-nested-ternary */
import React from 'react';

import Button from '../../Components/Button';
import FormGroup from '../../Components/FormGroup';
import Input from '../../Components/Input';
import Icon from '../../Components/Icon';
import * as yup from 'yup';
import { ILoginRequest } from '../../Data/interface/Auth/ILoginRequest';
import invalidIcon from '../../Assets/images/icons/invalid-icon.svg';
import { Form } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from '../Spinner';

interface ILoginForm {
  error?: string;
  onSubmit: (data: ILoginRequest) => void;
  loading?: boolean;
  isLogin?: boolean;
}

const schema = yup.object({
  username: yup.string().min(3, 'Mínimo 3 caracteres').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
}).required();

function LoginForm({ onSubmit, loading, isLogin }: ILoginForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({resolver: yupResolver(schema)});

  return (
    <Form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup
        title="Endereço de email"
        error={errors.username?.message}
      >
        <Input {...register('username')} />
        {errors.username?.message && <Icon src={invalidIcon} />}
      </FormGroup>
      <FormGroup
        title="Senha"
        error={errors.password?.message}
      >
        <Input {...register('password')} type="password" />
        {errors.password?.message && <Icon src={invalidIcon} />}
      </FormGroup>

      <div className="submit">
        <Button type="submit">
          {isLogin ? 'Entrar' : 'Cadastrar'}
          {loading && <Spinner size={12} />}
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;

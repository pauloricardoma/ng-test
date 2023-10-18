import React, { useEffect, useState } from 'react';
import Form from '../../Components/Form';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IGlobalReducerState } from '../../Store/Base/interface/IGlobalReducerState';
import {
  Footer,
  FormContainer,
  Container,
  LoginTitle,
  Wrapper,
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { AuthActions } from '../../Store/Auth/Auth.action';
import { ISgininRequest } from '../../Data/interface/Auth/ISigninRequest';
import Header from '../../Components/Header';

function Login({ error, isLoading }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sentSubmit, setSentSubmit] = useState(false);

  useEffect(() => {
    if (sentSubmit && !isLoading) {
      navigate('/login');
    }
  }, [sentSubmit, isLoading]);

  const handleSubmit = (data: ISgininRequest) => {
    dispatch(AuthActions.signin(data));
    setSentSubmit(true);
  };

  return (
    <Wrapper>
      <Header />
      <Container>

        <div className="formWrapper">
          <LoginTitle>
            <h3>Bem-vindo!</h3>
            <p>Crie uma conta para continuar.</p>
          </LoginTitle>

          <FormContainer>
            <Form
              error={error}
              onSubmit={handleSubmit}
              loading={isLoading}
            />
          </FormContainer>

          <Footer>
            <h4>
              Já possui uma conta?
              {' '}
              <Link to="/login">Faça Login</Link>
            </h4>
          </Footer>
        </div>
      </Container>
    </Wrapper>
  );
}

const mapState = (state: IGlobalReducerState) => ({
  ...state.auth,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux;

export default connector(Login);

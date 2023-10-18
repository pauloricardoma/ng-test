import React, { useEffect } from 'react';
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
import { ILoginRequest } from '../../Data/interface/Auth/ILoginRequest';
import { AuthActions } from '../../Store/Auth/Auth.action';
import Header from '../../Components/Header';

function Login({ error, isLogged, isLoading }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged && !isLoading) {
      navigate('/home');
    }
  }, [isLogged, isLoading]);

  const handleSubmit = (data: ILoginRequest) => {
    dispatch(AuthActions.login(data));
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <div className="formWrapper">
          <LoginTitle>
            <h3>Bem-vindo!</h3>
            <p>Faça o login para acessar sua conta.</p>
          </LoginTitle>

          <FormContainer>
            <Form
              error={error}
              onSubmit={handleSubmit}
              isLogin
            />
          </FormContainer>

          <Footer>
            <h4>
              Ainda não possui conta?
              {' '}
              <Link to="/signin">Criar Conta</Link>
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

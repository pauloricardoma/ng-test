import React from 'react';

import { useDispatch } from 'react-redux';
import { AuthActions } from '../../Store/Auth/Auth.action';
import { OutButton } from './styles';
import { useNavigate } from 'react-router';

function ButtonOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(AuthActions.logout(false));
    navigate('/login');
  }

  return (
    <OutButton type="button" onClick={() => logout()}>
      Sair
    </OutButton>
  );
}

export default ButtonOut;

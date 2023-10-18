import React from 'react';
import ButtonOut from '../../Components/ButtonOut';
import Logo from '../../Components/Logo';
import { Container } from './styles';
import ToogleThemeButton from '../ToogleThemeButton';
import { connect, ConnectedProps } from 'react-redux';
import { IGlobalReducerState } from '../../Store/Base/interface/IGlobalReducerState';

function Header({ isLogged }: Props) {

  return (
    <Container>
      <Logo />
      <div className="right">
        {isLogged && <ButtonOut />}
        <ToogleThemeButton />
      </div>
    </Container>
  );
}

const mapState = (state: IGlobalReducerState) => ({
  ...state.auth,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux;

export default connector(Header);

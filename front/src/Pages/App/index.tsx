import React from 'react';

import Routes from '../../Routes';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../Assets/styles/global';
import { IGlobalReducerState } from '../../Store/Base/interface/IGlobalReducerState';
import { connect, ConnectedProps } from 'react-redux';
import ToastContainer from '../../Components/Toast/ToastContainer';

function App({ theme }: Props ) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />
      <Routes />
    </ThemeProvider>
  );
}

const mapState = (state: IGlobalReducerState) => ({
  ...state.theme,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux;

export default connector(App);

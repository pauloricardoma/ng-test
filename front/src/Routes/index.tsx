import React from 'react';
import { Routes as RoutesDom, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IGlobalReducerState } from '../Store/Base/interface/IGlobalReducerState';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Signin from '../Pages/Signin';
import Transactions from '../Pages/Transactions';
import CashAction from '../Pages/CashAction';

function Routes() {
  const isLoggedIn = useSelector((state: IGlobalReducerState) => state.auth.isLogged);

  if (isLoggedIn) {
    return (
      <RoutesDom>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/cashaction" element={<CashAction />} />
      </RoutesDom>
    );
  }

  return (
    <RoutesDom>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RoutesDom>
  );
}

export default Routes;

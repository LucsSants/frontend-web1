import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './Context/AuthContext';
import Cadastro from './pages/Cadastro';

import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Torneios from './pages/Torneios';

function CustomRoute({ isPrivate, redir, auth, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return (
      <>
        <Toaster/>
        <h1>Loading...</h1>
      </>
    )
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  if (redir) {
   if (authenticated) {
    return <Redirect to="/torneios" />
   } else {
    return <Redirect to="/login" />
   }
  }
  
  if (auth) {
    if (authenticated) {

      return <Redirect to="/torneios"/>
    }
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute redir exact path="/"/>
      <CustomRoute auth exact path="/login" component={Login}  />
      <CustomRoute auth exact path="/cadastro" component={Cadastro} />
      <CustomRoute isPrivate exact path="/torneios" component={Torneios} />
    </Switch>
  );
}
import React from 'react';
import { Router } from 'react-router-dom';
import './styles.css'
import Routes from './routes';
import history from './history'
import Modal from 'react-modal'

import { AuthProvider } from './Context/AuthContext';
import Header from './Components/Header';

Modal.setAppElement("#root")

function App() {
  return (
    <AuthProvider>
      <Header/>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;

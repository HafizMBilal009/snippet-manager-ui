import axios from 'axios';
import React from 'react';
import { UserContextProvider } from './context/UserContext';
import Router from './Router';
import './styles/index.scss';
axios.defaults.withCredentials = true;
const App = () => (
  <UserContextProvider>
    <div className='container'>
      <Router />
    </div>
  </UserContextProvider>
);

export default App;

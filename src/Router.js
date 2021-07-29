import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Navbar from './components/misc/Navbar';
const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route
        exact
        path='/'
        render={() => (
          <p>
            <Home />
          </p>
        )}
      />
      <Route
        path='/login'
        exact
        render={() => (
          <p>
            <Login />
          </p>
        )}
      />
      <Route path='/signup' render={() => <Register />} />
    </Switch>
  </BrowserRouter>
);

export default Router;

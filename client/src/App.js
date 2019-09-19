import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Walk from './pages/Walk';
import Register from './pages/Register';
import Login from './pages/Login';
import DogPage from './pages/DogPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar></MenuBar>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Walk" component={Walk}></Route>
          <AuthRoute exact path="/Register" component={Register}></AuthRoute>
          <AuthRoute exact path="/Login" component={Login}></AuthRoute>
          <Route exact path="/dogs/:dogId" component={DogPage}></Route>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

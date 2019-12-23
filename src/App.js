import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import ContextProvider from './contexts/context';

import Navbar from './components/layout/Navbar';
import Index from './components/Index';
import Login from './components/Login';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </ContextProvider>
    </Router>
  );
};

export default App;

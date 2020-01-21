import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import ContextProvider from './contexts/context';

import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
        <Footer />
      </ContextProvider>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import ContextProvider from './contexts/context';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateProject from './components/projects/CreateProject';
import EditProject from './components/projects/EditProject';
import ProjectDetails from './components/projects/ProjectDetails';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateProject} />
            <Route exact path='/edit/:id' component={EditProject} />
            <Route exact path='/project/:id' component={ProjectDetails} />
          </Switch>
        </div>
        <Footer />
      </ContextProvider>
    </Router>
  );
};

export default App;

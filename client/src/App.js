import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import PasswordList from './components/PasswordList'
import Login from './components/Login'
import Register from './components/Register'
import CreatePassword from './components/CreatePassword'
import EditPassword from './components/EditPassword'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import ShowPassword from './components/ShowPassword'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ PasswordList }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/register" component={ Register }/>
          <Route exact path="/create" component={ CreatePassword }/>
          <Route exact path="/edit/:id" component={ EditPassword }/>
          <Route exact path="/show-password/:id" component={ ShowPassword }/>
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;

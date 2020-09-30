import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';


export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState({})
  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivetRoute path="/book/:bedType">
              <Book />
            </PrivetRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;

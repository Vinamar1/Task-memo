import React, { Component } from 'react';
// import './App.css';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import {
   BrowserRouter as Router, Switch, Route, Link, Redirect
} from "react-router-dom";
import fire from '../src/config/fire';

export default class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         user: {}
      }
   }

   componentDidMount() {
      this.authListner()
   }

   authListner() {
      fire.auth().onAuthStateChanged((user) => {
         if (user) {
            this.state({ user })
         }
         else {
            this.setState({ user: null })
         }
      });
   }

   render() {
      let links = [
         { label: 'LoginPage', link: '#LoginPage' },
         { label: 'Registerpage', link: '#RegisterPage' }
      ];


      return (
         <div className="App">
            {/* <BrowserRouter> */}
            <Switch>
               <Route path='/register'>
                  <RegisterPage />
               </Route>
               <Route path='/login'>
                  <LoginPage />
               </Route>
               <Route exact path="/">
                  <Redirect to="/login" />
               </Route>
            </Switch>
         </div>
      );
   }
}



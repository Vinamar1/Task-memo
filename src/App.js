import React, { Component, useReducer } from 'react';
import './App.scss';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import LandingPage from './screens/LandingPage';
import {
   BrowserRouter as Router, Switch, Route, Link, Redirect
} from "react-router-dom";
import fire from '../src/config/fire';
import { UserContext } from "./config/context";

export class App extends Component {
   userSubs;

   state = {
      isReady: false,
      user: null,
      uid: null,
   };

   componentDidMount() {
      this.userSubs = fire.auth().onAuthStateChanged((user, username, uid) => {
         console.log('set user', user);
         if (user) {
            const ref = fire.database().ref('/users/' + user.uid);
            ref.once('value').then(res => {
               console.log('check response of user', res);
               const newuser = {
                  ...user, ...username, ...res.val(),
               };
               this.setState({ user: newuser, isReady: true });
            });
         } else {
            this.setState({ user: null, isReady: true });
         }
      });
   }
   componentWillUnmount() {
      this.userSubs();
   }

   render() {
      if (!this.state.isReady) {
         return (
            <div className="loader">
               Loading...
            </div>
         );
      }

      return (
         <div className="App">
            <div className="container">
               <UserContext.Provider value={{
                  user: this.state.user
               }} >
                  <Switch>
                     <Route exact path="/">
                        {
                           console.log(this.state.user)
                        }
                        {
                           this.state.user ?
                              (
                                 <Redirect to="/home" />
                              ) :
                              (
                                 <Redirect to="/login" />
                              )
                        }
                     </Route>
                     <Route path='/home'>
                        <LandingPage />
                     </Route>
                     <Route path='/register'>
                        <RegisterPage />
                     </Route>
                     <Route path='/login'>
                        <LoginPage />
                     </Route>

                  </Switch>

               </UserContext.Provider>
            </div>
         </div >
      );
   }
}



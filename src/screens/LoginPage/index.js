import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect
} from "react-router-dom";
import firebase from 'firebase'
import fire from '../../config/fire';

export default class LoginPage extends Component {
   state = {
      error: undefined
   }

   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
         email: '',
         password: '',
      }
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   login(e) {
      e.preventDefault();
      this.setState({ error: false })
      fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
         fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            // this.setState({ logged: true });
            window.location.replace('/home');

         }).catch((err) => {
            this.setState({ error: err.message });
         })
      });

   }



   render() {
      if (this.state.error) {
         alert(this.state.error);
         setTimeout(() => {
            this.setState({ error: null });
         });
      }

      return (
         <div>
            <div className='login-div-css' id='login_div'>
               <h1 className='form-header-css'> Login</h1>
               <form className='vr full' onSubmit={this.login.bind(this)}>
                  <label className='from-label-css'>
                     User Name:
                  <input className='form-label-css' id='textEmail'
                        name='email'
                        onChange={this.handleChange}
                        type="text" />
                  </label>
                  <label className='from-label-css'>
                     Password :
                  <input className='form-label-css' id='textPassword'
                        name='password'
                        onChange={this.handleChange}
                        type="password" />
                  </label>
                  <button className='form-button-css' id='btnSignUp' type='submit'>Sign In</button>
                  <Link className='signup-css' id='btnSignUp' type='submit' to='/register'>Sign Up</Link>
               </form>
            </div>
         </div>
      )
   }
}

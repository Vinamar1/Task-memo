import React, { Component } from 'react';
import { FaBeer } from 'react-icons/fa';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import fire from '../../config/fire';

export default class LoginPage extends Component {

   constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.signup = this.signup.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.state = {
         email: '',
         password: ''
      }
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: [e.target.value]
      })
   }

   login(e) {
      e.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
         console.log(u)
      }).catch((err) => {
         console.log(err);
      })
   }

   signup(e) {
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
         console.log(u)
      }).catch((err) => {
         console.log(err);
      })
   }


   render() {
      console.log(this.props.links)
      return (
         <div>
            <div id='login_div'>
               <h1>Member Login</h1>
               <form>

                  <label>
                     User Name:
                  <input id='textEmail'
                        name='email'
                        onChange={this.handleChange}
                        type="text" />
                  </label>

                  <label>
                     Password :
                  <input id='textPassword'
                        name='password'
                        onChange={this.handleChange}
                        type="text" />
                  </label>

                  <input id='btnlogin'
                     onClick={this.login}
                     type="submit"
                     value="Log in" />

               </form>
               <p> <Link id='btnSignUp' onClick={this.signup} to='/register'>Sign Up</Link></p>
               <FaBeer />
            </div>
         </div>

      )
   }
}
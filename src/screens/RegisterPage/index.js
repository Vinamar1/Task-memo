import React, { Component } from 'react';
import fire from '../../config/fire';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect
} from "react-router-dom";


export default class LoginPage extends Component {
   database = fire.database();

   constructor(props) {
      super(props);
      this.signup = this.signup.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.state = {
         email: '',
         password: '',
         name: '',
         username: ''
      }
   }
   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   writeUserData(id, { name, email, username, password }) {
      this.database.ref('users/' + id).set({
         username,
         name,
         email
      }).then(res => {
         this.setState({ signed: true });
      }).catch(err => { });
   }

   signup(e) {
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
         console.log(u);
         const { user: { uid } } = u;
         this.writeUserData(uid, this.state);

      }).catch((err) => {
         console.log(err);
         this.setState({ error: err.message });
      })
   }

   render() {
      if (this.state.error) {
         alert(this.state.error);
         setTimeout(() => {
            this.setState({ error: null });

         });
      }

      if (this.state.signed) {
         return (
            <Redirect to="/login" push></Redirect>
         );
      }
      return (
         <div>
            <div className='login-div-css' >
               <h1 className='form-header-css'>Get Registered with us</h1>
               <form className='vr full' onSubmit={this.signup}>
                  <label className='from-label-css'>
                     Name :
                  <input className='form-label-css' onChange={this.handleChange}
                        type="text" name='name' required
                     />
                  </label>
                  <label className='from-label-css'>
                     Email :
                  <input className='form-label-css' onChange={this.handleChange}
                        type="text" name='email' required
                     />
                  </label>
                  <label className='from-label-css'>
                     User Name :
                  <input className='form-label-css' onChange={this.handleChange}
                        type="text" name='username' required
                     />
                  </label>
                  <label className='from-label-css'>
                     Password :
                  <input className='form-label-css' onChange={this.handleChange} type="password" name="password" required />
                  </label>
                  <button id='btnSignUp' type='submit'>Sign Up</button>
                  <Link className='signup-css' id='btnSignUp' type='submit' to='/login'>Sign In</Link>

               </form>
            </div>
            <div>
            </div>
         </div>
      )
   }
}
import React, { Component } from 'react';
import { FaBeer } from 'react-icons/fa';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import fire from '../../config/fire';

export default class LandingPage extends Component {

   constructor (props) {
      super(props);
      this.state= {
         email: '',
         Password: ''  
      }
   }

   logout() {
       fire.auth().signOut();
   }
   
   render() {
      console.log(this.props.links)
      return (

         <div>
            <div id='login_div'>
               <h1>You are Logged in</h1>
               <button onClick={this.signOut}>Logout </button>
              
            </div>
         </div>

      )
   }
}
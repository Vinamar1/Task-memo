import React, { Component } from 'react';
import fire from '../../config/fire';

export default class LoginPage extends Component {

   render() {
      return (
         <div>
            <div>
               {/* <h1>Member Login</h1> */}
               <form>
                  <label>
                     Name :
                  <input type="text" name="name" />
                  </label>
                  <label>
                     User Name :
                  <input type="text" name="name" />
                  </label>
                  <label>
                     Email :
                  <input type="text" name="name" />
                  </label>
                  <input type="submit" value="Submit" />
               </form>
            </div>
            <div>
            </div>
         </div>
      )
   }
}
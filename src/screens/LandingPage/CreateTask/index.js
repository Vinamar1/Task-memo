import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import { UserContext } from "../../../config/context";
import fire from '../../../config/fire';
import { pad, getNow } from '../../../utils';
export class Task {
   constructor({ id, taskname, projectname, sDate, eDate, isTimer, createdOn, updatedOn, userId }) {
      this.id = id;
      this.taskname = taskname;
      this.projectname = projectname;
      this.sDate = sDate;
      this.eDate = eDate;
      this.isTimer = isTimer;
      this.createdOn = createdOn;
      this.updatedOn = updatedOn;
      this.userId = userId;
   }
}
export default class createTask extends Component {
   static contextType = UserContext;

   ref = React.createRef();
   state = {
      form: {
         taskname: '',
         projectname: '',
         sDate: '',
         eDate: '',
         isTimer: false,
         // userId: undefined,
      },
   }

   createTask(e) {
      e.preventDefault();
      e.persist();
      const tasks = fire.database().ref('tasks/' + this.context.user.uid);
      const now = new Date().setHours(0, 0, 0, 0);
      const id = tasks.push().key;
      // const userid;
      const newTask = new Task({ ...this.state.form, createdOn: now, updatedOn: now, id, userId: this.context.user.uid });
      tasks.child(id).set(newTask, (err) => {
         if (err) {
            alert('Adding a task failed. try Again');
            return;
         }
         alert('Task Added Successfully');
         e.target.reset();
         this.close(e);
      });
   }
   handleChange(e) {
      const el = e.target;
      const value = el.nodeName === 'INPUT' && el.getAttribute('type') && el.getAttribute('type').toLowerCase() === 'checkbox' ? el.checked : el.value;
      this.setState({
         form: {
            ...this.state.form,
            [el.name]: value
         }
      })
   }
   close(e) {
      this.ref.current.close();
      this.props.close(e);
   }
   setNow(name) {
      const dateTimeStr = getNow();
      this.setState({
         form: {
            ...this.state.form,
            [name]: dateTimeStr
         }
      })
   }
   componentDidMount() {
      this.ref.current.showModal();
   }
   render() {
      const { form } = this.state;
      return (
         <dialog ref={this.ref}>
            <div className="card create-task">
               <div className="header">
                  <h3>Create a new task</h3>
                  <button type="button" className="close" onClick={(e) => this.close(e)}>&times;</button>
               </div>
               <div className="body">
                  <form className="vr full" onSubmit={(e) => this.createTask(e)} onChange={(e) => this.handleChange(e)}>
                     <label>
                        Task Name:
                     </label>
                     <input type="text" name='taskname'
                        defaultValue={form.taskname}
                        required />
                     <label>
                        Project Name:
                     </label>
                     <input type="text" name='projectname' defaultValue={form.projectname} required />

                     <div style={{ marginBottom: '0.5rem' }}>
                        <label htmlFor='sDate'>
                           Start At
                        </label>
                        <button type='button' className="sm" style={{ marginLeft: '1rem' }} onClick={(e) => { this.setNow('sDate') }}>now</button>
                     </div>

                     <input type='datetime-local' name='sDate' defaultValue={form.sDate} id='sDate' required />

                     <label htmlFor="isTimer">
                        <input type='checkbox' name='isTimer' id='isTimer' defaultValue={form.isTimer} />
                        Start Timer
                      </label>
                     {
                        !form.isTimer && (
                           <React.Fragment>
                              <label htmlFor="eDate">
                                 End At
                            </label>
                              <input type='datetime-local' name='eDate' id='eDate' defaultValue={form.eDate} required />
                           </React.Fragment>
                        )
                     }
                     <button type='submit'>Create</button>
                  </form>
               </div>
            </div>
         </dialog>
      );
   }
}

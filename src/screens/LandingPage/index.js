import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import fire from '../../config/fire';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import { UserContext } from '../../config/context';
import { Timer } from '../../utils';
import { pad, getNow } from '../../utils';

export default class LandingPage extends Component {
   static contextType = UserContext;


   state = {
      editTask: false,
      liveTasks: [],
      // userId: ''
   }

   logout() {
      fire.auth().signOut().then(() => {
         window.location.replace('/login');
      });
   }
   componentDidMount() {
      const tasks = fire.database().ref('tasks/' + this.context.user.uid);
      this.taskListner = tasks.orderByChild('isTimer').equalTo(true).on('value', (res) => {
         this.state.liveTasks.forEach(t => t.timer && t.timer.stop());
         if (res.val()) {
            this.setState({
               liveTasks: Object.values(res.val())
            }, () => {
               this.state.liveTasks.map((t, i) => {
                  t.timer = new Timer(t.sDate);
                  t.timer.start(() => {
                     this.setState({});
                  });
                  return t;
               });
            });
            console.log(this.state.liveTasks);
         } else {
            this.setState({
               liveTasks: []
            });
         }
      });
   }
   completeTask(task) {
      const taskPath = fire.database().ref('tasks/' + this.context.user.uid + '/' + task.id);
      const now = getNow();
      // const newTask = new Task({ id: task.id, taskname: task.taskname, projectname: task.projectname, sDate: task.sDate, eDate: now, isTimer: false, createdOn: task.createdOn, updatedOn: task.updatedOn, userId: task.userId });
      // tasks.child(task.id).set(newTask, (err) => { });
      taskPath.update({
         eDate: now,
         isTimer: false
      });
   }
   componentWillUnmount() {
      const tasks = fire.database().ref('tasks/' + this.context.user.uid);
      // tasks.orderByChild('').off('value');
      tasks.orderByChild('isTimer').off('value');
      this.state.liveTasks.forEach(t => t.timer && t.timer.stop());
   }
   render() {
      const { user = {} } = this.context;
      const { editTask, liveTasks } = this.state;

      return (

         <React.Fragment>
            <nav>
               <div className="profile">
                  <h3 className="name">{user.name}</h3>
                  <h5 className="email">{user.email}</h5>
               </div>
               <button type="button" onClick={this.logout.bind(this)}>Log Out</button>
            </nav>
            <main>
               {
                  editTask &&
                  <CreateTask close={() => this.setState({ editTask: false })} />
               }
               {/* <h3 className="header">Live Tasks <div className="live"></div></h3> */}
               {/* <ul className="active-tasks">
                  {
                     liveTasks.map((t, i) => {
                        return (
                           <li key={t.id}>
                              <div className="card">
                                 <div className="body">
                                    <h3 className="title">{t.taskname}</h3>

                                    {t.timer && (
                                       <h2 className="time">
                                          <b>{t.timer.hr}</b>
                                          <span className="sap">:</span>
                                          <b>{t.timer.minute}</b>
                                          <span className="sap">:</span>
                                          <b>{t.timer.sec}</b>
                                          <small>hrs</small>
                                       </h2>
                                    )}
                                    <button type='button' onClick={(e) => this.completeTask(t)}>Complete</button>
                                 </div>
                              </div>
                           </li>
                        )
                     })
                  }

               </ul> */}


               {/* this.userId === value.user.uid && */}
               <div className="task-list" style={{ marginTop: '3rem' }}>
                  <TaskList completeTask={this.completeTask.bind(this)} isAddingTask={this.state.editTask} addTask={() => this.setState({ editTask: true })} />
               </div>

               {/* {
                        !user.uid === this.userId &&
                        <div>
                           <h2>Add your task</h2>
                        </div>
                     } */}
            </main>
         </React.Fragment>
      );
   }
}

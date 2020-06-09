import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import fire from '../../../config/fire';
import { pad, getNow } from '../../../utils';
import { UserContext } from '../../../config/context';
import { Task } from '../CreateTask';
export default class TaskList extends Component {
  static contextType = UserContext;
  todaysDate = (() => {
    const date = new Date();
    return `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`;
  })();

  isAddingTask = false;
  state = {
    tasks: [],
    selectedDate: this.todaysDate,
  }



  getTaskByDate(isToday) {
    const tasks = fire.database().ref('tasks/' + this.context.user.uid);
    const d = new Date(this.state.selectedDate).setHours(0, 0, 0, 0);
    let querySaved = tasks.orderByChild('createdOn').equalTo(d);
    if (isToday) {
      this.taskListner = querySaved.on('value', (res) => {
        if (res.val()) {
          this.setState({
            tasks: Object.values(res.val())
          });
          console.log('on', this.state.tasks);
        }
      });
    }
    else {
      this.taskListner = querySaved.once('value', (res) => {
        if (res.val()) {
          this.setState({
            tasks: Object.values(res.val())
          });
          console.log('once', this.state.tasks);
        }
      });
    }
  }
  isToday(d) {
    const dDate = new Date(d).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return today - dDate === 0;
  }

  filterTasks(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({ selectedDate: value }, () => {
      const tasks = fire.database().ref('tasks/' + this.context.user.uid);
      tasks.orderByChild('createdOn').off('value');
      this.setState({
        tasks: []
      });
      this.getTaskByDate(this.isToday(this.state.selectedDate));
    });
    // this.taskListner
  }


  componentDidMount() {
    this.getTaskByDate(true);
  }
  componentWillUnmount() {
    const tasks = fire.database().ref('tasks/' + this.context.user.uid);
    tasks.orderByChild('createdOn').off('value');
  }
  getStatus(task) {
    const endDate = new Date(task.eDate);
    const nowDate = new Date();
    if (task.isTimer || (nowDate - endDate < 0)) {
      return 'active';
    } else {
      return 'completed';
    }
  }
  render() {
    const { addTask, isAddingTask, completeTask } = this.props;
    const { tasks, selectedDate } = this.state;
    return (
      <div className="card">
        <div className="header">
          <h3>Your Tasks</h3>
          {
            !isAddingTask &&
            <button type="button" className="add-task" onClick={(e) => {
              addTask(e);
            }}>Add Task</button>
          }
          <form className="filters" onChange={(e) => this.filterTasks(e)} >
            <input type='date' defaultValue={selectedDate} required />
          </form>
        </div>
        <div className="body">
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Project</th>
                <th>Started On</th>
                <th>Completed On / Will end On</th>
                <th>Created On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map(t => {
                  const status = this.getStatus(t);

                  return (
                    <tr key={t.id}>
                      <td>{t.taskname}</td>
                      <td>{t.projectname}</td>
                      <td>{new Date(t.sDate).toLocaleString()}</td>
                      <td>{t.isTimer ? 'NA' : new Date(t.eDate).toLocaleString()}</td>
                      <td>{new Date(t.createdOn).toLocaleDateString()}</td>
                      <td>
                        {
                          status === 'active' &&
                          (<React.Fragment>
                            <div>
                              Active
                           <div className="live"></div>
                            </div>
                          </React.Fragment>
                          )
                        }
                        {
                          status === 'completed' && 'Completed'

                        }
                      </td>
                      <td>
                        {
                          status === 'active' ?
                            (<button type="button" className="add-task sm" onClick={(e) => {
                              completeTask(t);
                            }}>Complete</button>)
                            : '-'
                        }
                        {/* <button type="button" className="add-task sm" onClick={(e) => {
                          addTask(e);
                        }}>Remove</button> */}
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    );


  }
}

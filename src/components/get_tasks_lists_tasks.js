import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTasksListsTasks, deleteTask } from '../actions';
import { Link } from 'react-router-dom';
import CreateTask from './create_task';

class GetTasksListsTasks extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    const {id_taskList} = this.props.match.params;
    console.log('marcin', id_table, id_list, id_card, id_taskList)
    this.props.getTasksListsTasks(cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList);
  }

  onDeleteClickTask(id_task) {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    const {id_taskList} = this.props.match.params;
    this.props.deleteTask(cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList, id_task, () => {
      alert('Usunięto zadanie')
    });
  }

  fetchGroups() {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    const {id_taskList} = this.props.match.params;
    console.log('fetchGroups.js: ', this.props.tasks)
    return _.map(this.props.tasks, task => {
    //   if (task.is_finished === false) {
    //   String(task.is_finished) = 'NIEUKOŃCZONE'
    // } else {
    // String(task.is_finished) = 'UKOŃCZONE'
    // }
         return (

           <li className="list-group-item" key={task.id}>
             Id: {task.id}
             <p></p>
             Opis: {task.content}
             <p></p>
             Stan: {String(task.is_finished)}
             <p></p>

             <button
               className="btn btn-danger pull-xs-right"
               onClick={this.onDeleteClickTask.bind(this, task.id)}
             >
               Usuń zadanie
             </button>
             
             Id wykonawcy: {task.assigned_to.id}
             <p></p>
             Email wykonawcy: {task.assigned_to.email}
             <p></p>


           </li>

         );
       });
  }

  render() {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    const {id_taskList} = this.props.match.params;
    return (
      <div>
        <p></p>
        ----Tasks------
        <p></p>
        <h3>Zadania:</h3>
          {this.fetchGroups()}
          <CreateTask id_table={id_table} id_list={id_list} id_card={id_card} id_taskList={id_taskList}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { tasks: state.tasks };
}

export default connect(mapStateToProps, { getTasksListsTasks, deleteTask })(GetTasksListsTasks);

function showCookie(name) {//służy do pokazania w zakładce Application w konsoli nazw emaili i tokenów zapamiętanych w ciasteczkach
    if (document.cookie != "") {
        const cookies = document.cookie.split(/; */);

        for (let i=0; i<cookies.length; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
}

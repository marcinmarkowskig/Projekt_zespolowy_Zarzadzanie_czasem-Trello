import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getCardsComments, deleteComment, getCardsTasksLists, deleteTaskList, getTasksListsTasks } from '../actions';
import { Link } from 'react-router-dom';
import CreateComment from './create_comment';
import CreateTaskList from './create_task_list';
import GetTasksListsTasks from './get_tasks_lists_tasks';

class OpenCard extends Component {
  componentDidMount() {
        console.log('opencard123')
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    this.props.getCardsTasksLists(cookieEmail, cookieToken, id_table, id_list, id_card)
    this.props.getCardsComments(cookieEmail, cookieToken, id_table, id_list, id_card)
  }

  fetchComments() {
    //  console.log('komentarze.js:', this.props.tables )
      return _.map(this.props.tables, table => {
        return (
           <li className="list-group-item" key={table.id}>
             Id: {table.id}
              <p></p>
             Opis: {table.content}
             <button
               className="btn btn-danger pull-xs-right"
               onClick={this.onDeleteClickComment.bind(this, table.id)}
             >
               Usuń komentarz
             </button>
           </li>
        );
      }
    );
  }

//-----
  fetchTasksLists() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
  //  console.log('listy zadań.js:', this.props.tasksLists )
      return _.map(this.props.tasksLists, taskList => {
        // {this.props.getTasksListsTasks(cookieEmail, cookieToken, id_table, id_list, id_card, taskList.id)}
  //console.log('taskList', taskList)
        return (
           <li className="list-group-item" key={taskList.id}>
             Id: {taskList.id}
              <p></p>
             Opis: {taskList.name}
             <button
               className="btn btn-danger pull-xs-right"
               onClick={this.onDeleteClickTaskList.bind(this, taskList.id)}
             >
               Usuń listę zadań
             </button>
             <Link className="btn btn-primary" to={`/get-tasks-lists-tasks/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists/${taskList.id}/tasks`}>
                {/* {this.props.getTasksListsTasks(cookieEmail, cookieToken, id_table, id_list, id_card, taskList.id)} */}
               Pokaż zadania
             </Link>
{/* <GetTasksListsTasks id_table={id_table} id_list={id_list} id_card={id_card} id_taskList={taskList.id}/> */}
           </li>
        );
      }
    );
  }
//--------------

  onDeleteClickComment(id_comment) {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    console.log(id_table)//działa dobrze
    this.props.deleteComment(cookieEmail, cookieToken, id_table, id_list, id_card, id_comment, () => {
      alert('Usunięto komentarz')
    });
  }

  onDeleteClickTaskList(id_taskList) {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.deleteTaskList(cookieEmail, cookieToken, id_table, id_list, id_card, id_taskList, () => {
      alert('Usunięto listę zadań')
    });
  }

  render() {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;

    return (
      <div>
        --------Tasks Lists--------
        <p></p>
          <ul className="list-group">
            {this.fetchTasksLists()}
          </ul>
          <CreateTaskList id_table={id_table} id_list={id_list} id_card={id_card}/>
        <p></p>
        ---------------------------
        <p></p>
        --------KOMENTARZE--------
        <p></p>
          <ul className="list-group">
            {this.fetchComments()}
          </ul>
          <CreateComment id_table={id_table} id_list={id_list} id_card={id_card} />
         {/* <DeleteComment id_table={id_table} id_list={id_list} id_card={id_card}/> */}
          <Link className="btn btn-danger" to={`/get-lists-cards/v1/tables/${id_table}/lists/${id_list}/cards`}>
            Powrót
          </Link>
          <p></p>
          ----------------------------
      </div>
    );
  }
  }
function mapStateToProps(state) {
  return { tables: state.tables, tasksLists: state.tasksLists, tasks:state.tasks };
}

export default connect(mapStateToProps, { getCardsComments, deleteComment, getCardsTasksLists, deleteTaskList, getTasksListsTasks })(OpenCard);

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

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
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    const { id_card } = this.props.match.params;
    this.props.getCardsTasksLists(cookieEmail, cookieToken, id_table, id_list, id_card)
    this.props.getCardsComments(cookieEmail, cookieToken, id_table, id_list, id_card)
  }

  fetchComments() {
      return _.map(this.props.tables, table => {
        return (
           <li className="list-group-item" key={table.id} id="commentsNames">
             <p></p>
             <div id="tableContent">
               {table.content}
             <p></p>
             <button
               id="btnDeleteComment"
               className="btn btn-danger pull-xs-right"
               onClick={this.onDeleteClickComment.bind(this, table.id)}
             >
               Delete comment
             </button>
           </div>
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
           <li className="list-group-item" key={taskList.id} id="tasksListsNames">
              <p></p>
              <div className='b'><b>Description</b></div>{taskList.name}
              <p></p>
             <button
               className="btn btn-danger pull-xs-right"
               onClick={this.onDeleteClickTaskList.bind(this, taskList.id)}
             >
               Delete task list
             </button>
             <div id='btnShowTask' >
             <Link id='btnLink' className="btn btn-primary" to={`/get-tasks-lists-tasks/v1/tables/${id_table}/lists/${id_list}/cards/${id_card}/tasks_lists/${taskList.id}/tasks`}>
                {/* {this.props.getTasksListsTasks(cookieEmail, cookieToken, id_table, id_list, id_card, taskList.id)} */}
               Show tasks
             </Link>
           </div>
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
      alert('Comment has been deleted')
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
      <div className='backgroundOpenCard'>
        <div id="navbar">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <Link to="/get-user-groups">Groups</Link>
          {/* <a href="#" onClick={this.signOut2}>
            Click me
          </a> */}
          <Link id='block' to="/">
          <div>
            Log out
          </div>
          </Link>
        </div>
          <p></p>
        <h1 id='h1'>Tasks lists</h1>
        <p></p>
          <ul className="list-group">
            {this.fetchTasksLists()}
          </ul>
          <CreateTaskList id_table={id_table} id_list={id_list} id_card={id_card}/>
        <p></p>
        <p></p>
        <h1 id='h2_1'>Comments</h1>
        <p></p>
          <ul className="list-group">
            {this.fetchComments()}
          </ul>
          <CreateComment id_table={id_table} id_list={id_list} id_card={id_card} />
         {/* <DeleteComment id_table={id_table} id_list={id_list} id_card={id_card}/> */}
          <Link className="btn btn-danger" to={`/get-lists-cards/v1/tables/${id_table}/lists/${id_list}/cards`} id='btnBackOpenCard'>
            Back
          </Link>
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

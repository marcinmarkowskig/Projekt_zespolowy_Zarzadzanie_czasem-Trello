import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserGroups, deleteGroup } from '../actions';
import { Link } from 'react-router-dom';

class GetUserGroups extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.getUserGroups(cookieEmail, cookieToken);
  }

  fetchGroups() {
    return _.map(this.props.tables, table => {
         return (
           <li className="list-group-item" key={table.id} id='groupNames'>
             <Link to={`/show-group/${table.id}`}>
               <div className='c'>{table.name}</div>
               <p></p>
               <div className='b' id='leaderId'><b>Leader id </b></div>
               <div id="leaderIdDescription">{table.leader_id}</div>
             </Link>
             <p></p>
             <button
               className="btn btn-danger pull-xs-right"
               id='btnDeleteUserGroups'
               onClick={this.onDeleteClick.bind(this, table.id)}
             >
               Delete group
             </button>
           </li>
         );
       });
  }

  onDeleteClick(group_id) {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.deleteGroup(group_id, cookieEmail, cookieToken, () => {
      alert('Group has been deleted')
    });
  }

  render() {
    return (
      <div className='backgroundGetUserGroups'>
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
        <h1 id='h1'>User groups</h1>
          {this.fetchGroups()}
            <Link className="btn btn-primary" to="/create-group" id='btnCreateNewGroup'>
              Create group
            </Link>
            <Link className="btn btn-danger" to="/get-user-tables" id='btnBackNewGroup' >
              Back
            </Link>
        {/* </div>
          </div> */}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { tables: state.tables };
}

export default connect(mapStateToProps, { getUserGroups, deleteGroup })(GetUserGroups);

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

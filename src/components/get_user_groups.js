import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserGroups } from '../actions';
import { Link } from 'react-router-dom';

class GetUserGroups extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.getUserGroups(cookieEmail, cookieToken);
  }

  fetchGroups() {
    console.log('fetchGroups.js: ', this.props.tables)
    return _.map(this.props.tables, table => {
         return (
           <li className="list-group-item" key={table.id}>
             <Link to={`/show-group/${table.id}`}>
               {table.name}
             </Link>
           </li>
         );
       });
  }

  render() {
    return (
      <div>
        <h3>Grupy:</h3>
          {this.fetchGroups()}
          <Link className="btn btn-primary" to="/get-user-tables">
            Powrót
          </Link>
          <Link className="btn btn-primary" to="/create-group">
            Utwórz grupę
          </Link>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { tables: state.tables };
}

export default connect(mapStateToProps, { getUserGroups })(GetUserGroups);

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

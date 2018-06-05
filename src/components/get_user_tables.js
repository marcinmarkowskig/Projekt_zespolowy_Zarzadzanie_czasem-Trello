import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserTables, createTable, signIn, signOut } from '../actions';
import { Link } from 'react-router-dom';

class GetUserTables extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.getUserTables(cookieEmail, cookieToken)//służy do zapamiątania emaili i tokenów
  //  this.props.getGroupTables(cookieEmail, cookieToken)//służy do zapamiątania emaili i tokenów
  }

  fetchTablesPrivate() {
      console.log('fetchTables get_user_tablesprivate.js:', this.props.tables )
      return _.map(this.props.tables, table => {
        return (
          <li className="list-group-item" key={table.id}>
            <Link to={`/get-tables-lists/${table.id}`}>
              {table.name}
            </Link>
          </li>
        );
      }
    );
  }

  // fetchTablesGroup() {
  //     console.log('fetchTables get_user_tablesgroup.js:', this.props.tables )
  //     return _.map(this.props.tables, table => {
  //       return (
  //         <li className="list-group-item" key={table.id}>
  //           <Link to={`/get-tables-lists/${table.id}`}>
  //             {table.name}
  //           </Link>
  //         </li>
  //       );
  //     }
  //   );
  // }

  // signOut2() {
  //   console.log('Sign out')
  //   let cookieEmail = showCookie("cookieEmail")
  //   let cookieToken = showCookie("cookieToken")
  //   this.props.signOut( cookieEmail, cookieToken  , () => {
  //       this.props.history.push('/');
  //     });
  // }

  render() {
    return (
      <div>
        <div id="navbar">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <Link to="/get-user-groups">Grupy</Link>
          {/* <a href="#" onClick={this.signOut2}>
            Click me
          </a> */}
          <Link id='block' to="/">
          <div>
            Wyloguj się
          </div>
          </Link>
        </div>
        <h3>Tablice prywatne:</h3>
          <ul className="list-group">
            {this.fetchTablesPrivate()}
          </ul>
        {/* <h3>Tablice grupowe:</h3>
          <ul className="list-group">
            {this.fetchTablesGroup()}
          </ul> */}
          <Link className="btn btn-primary" to="/create-table">
            Utwórz nową tablicę
          </Link>
      </div>
    );
  }
}
// {this.fetchTables()} //służy do wyświetlenia tablic
function mapStateToProps(state) {
  return { tables: state.tables };
}

export default connect(mapStateToProps, { getUserTables, createTable, signIn, signOut })(GetUserTables);

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

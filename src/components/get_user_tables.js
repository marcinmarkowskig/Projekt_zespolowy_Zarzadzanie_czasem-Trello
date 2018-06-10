import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserTables, createTable, signIn, signOut, deleteTable } from '../actions';
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
          <li className="list-group-item" key={table.id}  id='tablesNames'>
            <Link to={`/get-tables-lists/${table.id}`}>
              {table.name}
            </Link>
            <button
              className="btn btn-danger pull-xs-right"
              id='btnDeleteTable'
              onClick={this.onDeleteClickTable.bind(this, table.id)}
            >
              Delete table
            </button>
          </li>
        );
      }
    );
  }

  onDeleteClickTable(id_table) {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.deleteTable(id_table, cookieEmail, cookieToken, () => {
      alert('Table has been deleted successfully')
    });
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
      <div className='backgroundGetUserTables'>
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
        <h1 id='h1'>Tables</h1>
          <ul className="list-group">
            {this.fetchTablesPrivate()}
          </ul>
        {/* <h3>Tablice grupowe:</h3>
          <ul className="list-group">
            {this.fetchTablesGroup()}
          </ul> */}
          <Link className="btn btn-primary" id='btnCreateNewTable' to="/create-table">
            Create new table
          </Link>
      </div>
    );
  }
}
// {this.fetchTables()} //służy do wyświetlenia tablic
function mapStateToProps(state) {
  return { tables: state.tables };
}

export default connect(mapStateToProps, { getUserTables, createTable, signIn, signOut, deleteTable })(GetUserTables);

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

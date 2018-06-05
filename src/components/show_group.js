import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showGroup, deleteGroup  } from '../actions';
import ChangeLeader from './change_leader';
import AddUser from './add_user';
import RemoveUser from './remove_user';

class ShowGroups extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id } = this.props.match.params;//możemy to napisac dzięki React-Router; z adresu url pobieramy id ( z wildcarda /:id)
    this.props.showGroup(id, cookieEmail, cookieToken);
  }

  functionLeader() {
    // return _.map(this.props.tables, table => {
    //     return (
    //       <li className="list-group-item" key={table.id}>
    //         {table.name}<p></p>
    //       </li>
    //     );
    console.log('aaa')
  }

  function() {
    // return _.map(this.props.tables.leader, table => {
    //     return (
    //       <li className="list-group-item" key={table.id}>
    //         {table.email}<p></p>
    //       </li>
    //     );
    //   }
    console.log('a')
  }

  showGroupsLeader() {
    console.log('component:', this.props.tables )
      return _.map(this.props.tables, table => {
      console.log('table', table.leader)
        return _.map(_.mapKeys(table, 'email'), lider => {
          return (
            <div>
              {lider.id}
              <p></p>
            {lider.email}
          </div>
          );
        }
      );
    }
  )
}
      //
      // showGroups() {
      //     console.log('component:', this.props.tables )
      //     return _.map(this.props.tables, table => {
      //     console.log('table', table.leader)
      //     return _.map(_.mapKeys(table, 'email'), lider => {
      //     //console.log(lider.id)
      //     return (<div>{lider.email}</div>);
      //   });
      //     //console.log((_.mapKeys(table.leader, 'id')))
      //           return (
      //             <li className="list-group-item" key={table.id}>
      //
      //             </li>
      //           );
      //         }
      //       );
      //     }



  //   console.log('table', table.leader)
  //       return _.map(table.leader, user_information => {
  //         console.log(user_information)
  showGroupsMembers() {
      console.log('component:', this.props.tables )
      return _.map(this.props.tables, table => {
      console.log('table', table)
          return _.map(_.mapKeys(table.members, 'id'), user_information => {
            console.log('_.mapKeys(table.members', _.mapKeys(table.members, 'id'))
            console.log('user_information', user_information)
            return (
              <li className="list-group-item" key={user_information.id}>
                Id: {user_information.id}
                <p></p>
                Email: {user_information.email}
              </li>
            );
          }
        )
      }
    );
  }

  // showGroups() {
  //     console.log('component:', this.props.tables )
  //     return _.map(this.props.tables, table => {
  //     console.log('table', table)
  //         return _.map(_.mapKeys(table.members, 'id'), user_information => {
  //           console.log('_.mapKeys(table.members', _.mapKeys(table.members, 'id'))
  //           console.log('user_information', user_information)
  //           return (
  //             <li className="list-group-item" key={user_information.id}>
  //               Id: {user_information.id}
  //               <p></p>
  //               Email: {user_information.email}
  //             </li>
  //           );
  //         }
  //       )
  //     }
  //   );
  // }

    groupId() {
      const { id } = this.props.match.params;//możemy to napisac dzięki React-Router; z adresu url pobieramy id ( z wildcarda /:id)
      return id
    }

    onDeleteClick(group_id) {
      let cookieEmail = showCookie("cookieEmail");
      let cookieToken = showCookie("cookieToken");
      this.props.deleteGroup(group_id, cookieEmail, cookieToken, () => {
        this.props.history.push('/get-user-groups');
      });
    }

//tę funkcję narazie zostawiam bibliotech
    onChangeLeaderClick(group_id) {
      //console.log('ffffffffff') działa

        return (
            <ChangeLeader />
        );


    }

    onAddUserClick(group_id) {
        return (
            <AddUser />
        );
    }
//
  render() {
    const { list } = this.props;
    const { id } = this.props.match.params;//możemy to napisac dzięki React-Router; z adresu url pobieramy id ( z wildcarda /:id)
    return (
      <div>

        <h3>Grupy:</h3>
        <ul className="list-group">
          {this.showGroupsLeader()}
          {this.showGroupsMembers()}
            <Link className="btn btn-danger" to={`/get-user-groups`}>
              Anuluj
            </Link>
        </ul>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this, this.groupId())}
        >
          Usuń grupę
        </button>
        {/* <button
          className="btn btn-primary pull-xs-right"
          onClick={this.onChangeLeaderClick.bind(this, this.groupId())}
        >
          Zmień lidera
        </button>
        <p></p>
        <button
          className="btn btn-primary pull-xs-right"
          onClick={this.onAddUserClick.bind(this, this.groupId())}
        >
          Dodaj użytkownika do grupy
        </button> */}
        <p></p>
        <ChangeLeader id={id} history={history}/>
        <AddUser id={id}/>
        <RemoveUser id={id}/>
      </div>
    );
  }
}

function mapStateToProps({ tables }) { //{posts} to application state
  return { tables: tables};
}

export default connect(mapStateToProps, { showGroup, deleteGroup })(ShowGroups);

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

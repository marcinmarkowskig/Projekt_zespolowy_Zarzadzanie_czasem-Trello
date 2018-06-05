import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserTables, createTable } from '../actions';
import { Link } from 'react-router-dom';

let email;
let authentication_token;

class GetUserTables extends Component {
  //te dwie rzeczy poniżej są dobrze
  componentDidMount() {
    this.props.getUserTables(email, authentication_token);
  }


  render() {
    return (
      <div>
        <h3>Tablice:</h3>

          <Link className="btn btn-primary" to="/create-table">
            Pokaż wszystkie tablice
          </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tables: state.tables };
}

export default connect(mapStateToProps, { getUserTables: getUserTables })(GetUserTables);

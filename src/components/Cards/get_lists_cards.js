import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getListsCards, deleteCard } from '../../actions';
import { Link } from 'react-router-dom';

class GetListsCards extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    this.props.getListsCards(cookieEmail, cookieToken, id_table, id_list)//służy do zapamiątania emaili i tokenów
  }

  fetchListsCards() {
      const { id_table } = this.props.match.params;
      const { id_list } = this.props.match.params;
      return _.map(this.props.tables, table => {
        return (
           <li className="list-group-item" key={table.id} id="cardsNames">
              <Link to={`/open-card/v1/tables/${id_table}/lists/${id_list}/cards/${table.id}/comments`}>
              <p></p>
                <div className='c'>{table.title}</div>
                 <p></p>
               <div className='b' id='descriptionGetListsCards'><b>Description </b>
               <p></p>
               <div id="tableDescription">
               {table.description}</div>
             </div>
               <p></p>
               <button
                 id='btnBackGetListsCards'
                 className="btn btn-danger pull-xs-right"
                 onClick={this.onDeleteClick.bind(this, table.id)}
                 >
                   Delete card
                 </button>
             </Link>
           </li>
        );
      }
    );
  }

  onDeleteClick(id_card) {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    console.log(id_table)//działa dobrze
    this.props.deleteCard(id_table, id_list, id_card, cookieEmail, cookieToken, () => {
      alert('Card has been deleted successfully')
      this.props.history.push(`/get-tables-lists/${id_table}`);
    });
  }

  render() {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;

    return (
      <div className='backgroundGetListsCards'>
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
        <h1 id='h1'>Cards</h1>
          <ul className="list-group" id='listGroupGetListsCards'>
            {this.fetchListsCards()}
          </ul>
          <Link className="btn btn-danger" to={`/get-tables-lists/${id_table}`} id='btnBackCards'>
            Back
          </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tables: state.tables };
}

export default connect(mapStateToProps, { getListsCards, deleteCard })(GetListsCards);

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

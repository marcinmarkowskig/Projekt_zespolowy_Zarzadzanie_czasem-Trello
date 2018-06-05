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
      console.log('get_lists_cards.js:', this.props.tables )
      return _.map(this.props.tables, table => {
        return (
           <li className="list-group-item" key={table.id}>
              <Link to={`/open-card/v1/tables/${id_table}/lists/${id_list}/cards/${table.id}/comments`}>
               <b>Tytuł:</b> {table.title}
               <p></p>
               <b>Opis:</b> {table.description}
             </Link>
             <button
               className="btn btn-danger pull-xs-right"
               onClick={this.onDeleteClick.bind(this, table.id)}
             >
               Usuń kartę
             </button>
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
      this.props.history.push(`/get-tables-lists/${id_table}`);
    });
  }

  render() {
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;

    return (
      <div>
          <ul className="list-group">
            {this.fetchListsCards()}
          </ul>
          <Link className="btn btn-danger" to={`/get-tables-lists/${id_table}`}>
            Anuluj
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

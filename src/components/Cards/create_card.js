import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateCard extends Component {
  renderField(field) {
    const { meta: { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // console.log('id table', id_table)
    // console.log('id list', id_list)
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    this.props.createCard(values, cookieEmail, cookieToken, () => {
      this.props.history.push(`/get-tables-lists/${id_table}`);
    }, id_table, id_list);
  }

  render() {
    const { handleSubmit } = this.props;
    const { id_table } = this.props.match.params;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Nazwa karty"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Opis karty"
          name="description"
          component={this.renderField}
        />
        <div>
          <button type="submit" className="btn btn-primary">Utwórz nową kartę</button>
        </div>
        <Link className="btn btn-danger" to={`/get-tables-lists/${id_table}`}>
          Anuluj
        </Link>
      </form>

    );
  }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
      errors.title = "Podaj nazwę karty!";
    }
    if(!values.description) {
      errors.description = "Podaj opis karty!";
    }
    return errors;
}

export default reduxForm({
  validate: validate,
  form: 'CreateCardForm'
})(
    connect(null,{ createCard })(CreateCard)
);

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

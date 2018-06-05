import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createTable } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateTable extends Component {
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
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    this.props.createTable(values, cookieEmail, cookieToken, () => {
      this.props.history.push('/get-user-tables');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <p></p>
            <label>Utwórz nową tablicę</label>
          <p></p>
        </div>
        <Field
          label="name"
          name="name"
          component={this.renderField}
        />
        <Field
          label="group_id"
          name="group_id"
          component={this.renderField}
        />
        <div>
            <button type="submit" className="btn btn-primary">Utwórz</button>
        </div>
          <Link className="btn btn-danger" to="/get-user-tables">
            Anuluj
          </Link>
      </form>

    );
  }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = "Wprowadź nazwę tablicy!";
    }
    if (!values.group_id) {
      errors.group_id = "Wprowadź id grupy!";
    }

    return errors;
}

export default reduxForm({
  validate: validate,
  form: 'CreateTableForm'
})(
    connect(null,{ createTable })(CreateTable)
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

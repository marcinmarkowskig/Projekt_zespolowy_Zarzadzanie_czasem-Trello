import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateGroup extends Component {
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
    this.props.createGroup(values, cookieEmail, cookieToken, () => {
      this.props.history.push('/get-user-groups');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Nazwa grupy"
          name="group_name"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Utwórz nową grupę</button>
      </form>

    );
  }
}

function validate(values) {
    const errors = {};

    if(!values.group_name) {
      errors.group_name = "Podaj nazwę grupy!";
    }
    return errors;
}

export default reduxForm({
  validate: validate,
  form: 'CreateGroupForm'
})(
    connect(null,{ createGroup })(CreateGroup)
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser} from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class AddUser extends Component {
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
        this.props.addUser(values, () => {
   alert('dodano użytkownika do grupy');
  //      this.props.history.push(`/show-group/:${this.props.id}`);

        }, this.props.id, cookieEmail, cookieToken);
      }

      render() {
        const { handleSubmit } = this.props;

        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div>
              <p></p>
                <h3>Dodaj użytkownika do grupy</h3>
              <p></p>
              <label>Podaj email</label>
            <p></p>
            </div>
            <Field
              label="email"
              name="email"
              component={this.renderField}
            />
            <div>
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </div>
          </form>
        );
      }
    }

    function validate(values) {
      const errors = {};

      if (!values.email) {
        errors.email = "Wprowadź email!";
      }

      return errors;
    }

    export default reduxForm({
    validate: validate,
    form: 'AddUserForm'
    })(
      connect(null,{ addUser })(AddUser)
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

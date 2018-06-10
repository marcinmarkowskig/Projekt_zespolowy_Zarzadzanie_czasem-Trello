import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUser} from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class RemoveUser extends Component {
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
        this.props.removeUser(values, this.props.id, cookieEmail, cookieToken);
      }

      render() {
        const { handleSubmit } = this.props;

        return (
          <div className='backgroundRemoveUser'>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div>
                <p></p>
                  <h2 id='h2RemoveUser'>Remove user from the group</h2>
              </div>
              <div className='labelDescriptionRemoveUser'>User id</div>
            <Field
              name="user_id"
              component={this.renderField}
            />
            <div>
                <button type="submit" className="btn btn-primary" id='btnRemoveUser'>Remove</button>
            </div>
          </form>
        </div>
        );
      }
    }

    function validate(values) {
      const errors = {};

      if (!values.user_id) {
        errors.user_id = "Enter user id!";
      }

      return errors;
    }

    export default reduxForm({
    validate: validate,
    form: 'RemoveUserForm'
    })(
      connect(null,{ removeUser })(RemoveUser)
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

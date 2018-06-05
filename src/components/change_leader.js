import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLeader } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';


class ChangeLeader extends Component {
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
      this.props.changeLeader(values, () => {
 alert('zmieniono id lidera');
//      this.props.history.push(`/show-group/:${this.props.id}`);

      }, this.props.id, cookieEmail, cookieToken);
    }

    render() {
      const { handleSubmit } = this.props;

      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <p></p>
              <h3>Zmień lidera</h3>
            <p></p>
            <label>Podaj id</label>
          <p></p>
          </div>
          <Field
            label="Id lidera"
            name="leader_id"
            component={this.renderField}
          />
          <div>
              <button type="submit" className="btn btn-primary">Zmień</button>
          </div>
        </form>
      );
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.leader_id) {
      errors.leader_id = "Wprowadź id lidera!";
    }

    return errors;
  }

  export default reduxForm({
  validate: validate,
  form: 'ChangeLeaderForm'
  })(
    connect(null,{ changeLeader })(ChangeLeader)
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





// export default function ChangeLeader(props) {
//   return <h1>Hello, {props.id}</h1>;
// }

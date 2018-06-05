import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';


class CreateComment extends Component {
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
      this.props.createComment(values, () => {
 alert('dodano komentarz');
//      this.props.history.push(`/show-group/:${this.props.id}`);

}, cookieEmail, cookieToken, this.props.id_table, this.props.id_list, this.props.id_card);
    }

    render() {
      const { handleSubmit } = this.props;

      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <p></p>
              <h3>Opis</h3>
          <p></p>
          </div>
          <Field
            label="Content"
            name="content"
            component={this.renderField}
          />
          <div>
              <button type="submit" className="btn btn-primary">Potwierdź</button>
          </div>
        </form>
      );
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.content) {
      errors.content = "Wprowadź opis!";
    }

    return errors;
  }

  export default reduxForm({
  validate: validate,
  form: 'CreateCommentForm'
  })(
    connect(null, { createComment })(CreateComment)
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

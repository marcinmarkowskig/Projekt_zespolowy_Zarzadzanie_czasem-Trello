import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateTask extends Component {
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
      this.props.createTask(values, () => {
 alert('dodano zadanie');
//      this.props.history.push(`/show-group/:${this.props.id}`);

}, cookieEmail, cookieToken, this.props.id_table, this.props.id_list, this.props.id_card, this.props.id_taskList);
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
            label="Nazwa"
            name="content"
            component={this.renderField}
          />
          <Field
            label="Id wykonawcy"
            name="assigned_to"
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
      errors.content = "Wprowadź nazwę!";
    }
    if (!values.assigned_to) {
      errors.assigned_to = "Wprowadź id wykonawcy!";
    }

    return errors;
  }

  export default reduxForm({
  validate: validate,
  form: 'CreateTaskListForm'
  })(
    connect(null, { createTask })(CreateTask)
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

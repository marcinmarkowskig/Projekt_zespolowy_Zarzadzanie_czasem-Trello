import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class SignIn extends Component {
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
    this.props.signIn(values, () => {
      this.props.history.push('/get-user-tables');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          component={this.renderField}
        />
        <div>
            <button type="submit" className="btn btn-primary">Zaloguj</button>
        </div>
        <div>
          <p></p>
            <label>Nie masz konta?</label>
          <p></p>
          <Link className="btn btn-primary" to="create-user">
            Utwórz nowe konto
          </Link>
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
    if(!values.password) {
      errors.password = "Wprowadź hasło!";
    }

    return errors;
}

function mapStateToProps(state) {
  return { tables: state.tables };
}

export default reduxForm({
  validate: validate,
  form: 'SignInForm'
})(
    connect(mapStateToProps,{ signIn })(SignIn)
);

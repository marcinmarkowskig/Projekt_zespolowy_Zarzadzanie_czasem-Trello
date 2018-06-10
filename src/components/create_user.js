import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateUser extends Component {
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
    this.props.createUser(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='backgroundCreateUser'>
      <div className='createAnAccount'><b>Create an account</b></div><p></p>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='labelEmail'>Email</div>
          <Field
            name="email"
            component={this.renderField}
          />
          <div className='labelPassword'>Password</div>
          <Field
            name="password"
            component={this.renderField}
          />
          <div className='labelPasswordConfirmation'>Password confirmation</div>
          <Field
            name="password_confirmation"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">  Create  </button>
          <Link className="btn btn-danger" to={`/sign_in`}>
            Back
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
      errors.email = "Enter email!";
    }
    if(!values.password) {
      errors.password = "Enter password!";
    }
    if(!values.password_confirmation) {
      errors.password_confirmation = "Confirm password!";
    }
    return errors;
}

export default reduxForm({
  validate: validate,
  form: 'CreateUserForm'
})(
    connect(null,{ createUser })(CreateUser)
);

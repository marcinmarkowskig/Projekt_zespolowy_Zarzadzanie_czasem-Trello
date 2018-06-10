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
      <div className='backgroundSignIn'>
        <div className='Hi'><b>HI AGAIN!</b></div><p></p>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <div className='labelEmail'>Email</div>
          <Field
            name="email"
            placeholder="Email"
            component={this.renderField}
          />
          <div className='labelPassword'>Password</div>
          <Field
            name="password"
            placeholder="Password"
            type="password"
            component={this.renderField}
          />
          <div>
              <button type="submit" className="btnSI">Sign in</button>
          </div>
          <div>
            <p></p>
              <div className="divSignIn">Don't have an account?</div>
            <p></p>
            <Link className="btnSI2" to="create-user">
              Sign up
            </Link>
          </div>
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

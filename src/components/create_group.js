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
      <div className='backgroundCreateGroup'>
        <div id="navbar">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <Link to="/get-user-groups">Groups</Link>
          {/* <a href="#" onClick={this.signOut2}>
            Click me
          </a> */}
          <Link id='block' to="/">
          <div>
            Log out
          </div>
          </Link>
        </div>
          <p></p>
        <h1 id='h1'>Create new group</h1>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className='labelGroupName'>Name</div>
        <Field
          name="group_name"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary" id='btnCreateGroup'>Create new group</button>
        <Link className="btn btn-danger" to={`/get-user-groups`} id='btnBackCreateGroup'>
          Back
        </Link>
      </form>
    </div>
    );
  }
}

function validate(values) {
    const errors = {};

    if(!values.group_name) {
      errors.group_name = "Enter name!";
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

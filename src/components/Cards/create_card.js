import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateCard extends Component {
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
    // console.log('id table', id_table)
    // console.log('id list', id_list)
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");
    const { id_table } = this.props.match.params;
    const { id_list } = this.props.match.params;
    this.props.createCard(values, cookieEmail, cookieToken, () => {
      this.props.history.push(`/get-tables-lists/${id_table}`);
    }, id_table, id_list);
  }

  render() {
    const { handleSubmit } = this.props;
    const { id_table } = this.props.match.params;
    return (
      <div className='backgroundCreateCard'>
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
        <h1 id='h1'>Create new card</h1>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className='labelNameCreateCard'>Title</div>
        <Field
          name="title"
          component={this.renderField}
        />
        <div className='labelNameCreateCard'>Description</div>
        <Field
          name="description"
          component={this.renderField}
        />
        <div>
          <button type="submit" className="btn btn-primary" id='btnCreateCreateCard'>Create new card</button>
        <Link className="btn btn-danger" to={`/get-tables-lists/${id_table}`} id='btnBackCreateCard'>
          Back
        </Link>
      </div>
      </form>
    </div>
    );
  }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
      errors.title = "Enter title!";
    }
    if(!values.description) {
      errors.description = "Enter description!";
    }
    return errors;
}

export default reduxForm({
  validate: validate,
  form: 'CreateCardForm'
})(
    connect(null,{ createCard })(CreateCard)
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

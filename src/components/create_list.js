import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createList } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CreateList extends Component {
  componentDidMount() {
    let cookieEmail = showCookie("cookieEmail");
    let cookieToken = showCookie("cookieToken");

    const { id } = this.props.match.params;//możemy to napisac dzięki React-Router; z adresu url pobieramy id ( z wildcarda /:id)
  }

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

    const { id } = this.props.match.params;//możemy to napisac dzięki React-Router; z adresu url pobieramy id ( z wildcarda /:id)
    this.props.createList(values, () => {
      this.props.history.push(`/get-tables-lists/${id}`);
    }, id, cookieEmail, cookieToken);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <p></p>
            <label>Utwórz nową listę</label>
          <p></p>
        </div>
        <Field
          label="name"
          name="name"
          component={this.renderField}
        />
        <div>
            <button type="submit" className="btn btn-primary">Utwórz</button>
        </div>
          <Link className="btn btn-danger" to="/get-tables-lists">
            Anuluj
          </Link>
      </form>
    );
  }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = "Wprowadź nazwę listy!";
    }

    return errors;
}

export default reduxForm({
  validate: validate,
  form: 'CreateListForm'
})(
    connect(null,{ createList })(CreateList)
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

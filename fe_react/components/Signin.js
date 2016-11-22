import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { red600 } from 'material-ui/styles/colors';

import { TextInput } from './TextInput';
import { authUser } from '../actions';


const styles = {
  root: {
    marginTop: 50,
    width: '100%',
    textAlign:'center'
  },
  sub: {
    width: 400,
    margin: 'auto'
  },
  input: {
    width: '100%'
  },
  btnContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between'
  },
  errorText: {
    color: red600
  }
};

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        isValid: true,
        value: '',
        required: true
      },
      password: {
        isValid: true,
        value: '',
        required: true
      }
    };

    this.isFormValid = false;
    this.inProgress = false;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target}, fieldObj) {
    let state = {...this.state};

    for (let key of Object.keys(state)) {
      state[key] = {...state[key], ...fieldObj[key]};
    }

    this.isFormValid = true;
    for (let key of Object.keys(state)) {
      if (!state[key].isValid) {
        this.isFormValid = false;
        break;
      }

      if (state[key].required && !state[key].value) {
        this.isFormValid = false;
        break;
      }
    }

    this.setState({
      [target.name]: state[target.name]
    });
  }

  getValidationPattern(type) {
    let patterns = {
      email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    };

    return patterns[type];
  };

  handleSubmit(e) {
    e.preventDefault();

    let { email, password } = this.state;

    this.inProgress = true;
    this.props.authUser(email.value, password.value);
  }

  componentWillReceiveProps({user}) {
    if(user.name) {
      this.props.router.push('/');
    }

    if(user.name || user.error) {
      this.inProgress = false;
    }
  }

  render() {
    let user = this.props.user;
    return(
      <div style={styles.root}>
        <h2>Sign In Form</h2>

        <h3 style={styles.errorText}>{user.error && user.error.message}</h3>

        <form style={styles.sub} onSubmit={this.handleSubmit} noValidate>
          <TextInput
            value={this.state.email.value}
            style={styles.input}
            onChange={this.handleChange}
            name="email"
            hintText="Email"
            type="email"
            pattern={this.getValidationPattern('email')}
            errorPatternText="Wrong Email"
            required={this.state.email.required}
            debounce={200}
          />
          <TextInput
            value={this.state.password.value}
            style={styles.input}
            onChange={this.handleChange}
            hintText="Password"
            name="password"
            type="password"
            required={this.state.password.required}
            minLength={6}
            debounce={200}
          />
          <div style={styles.btnContainer}>
            <RaisedButton
              label="Submit"
              primary={true}
              type="submit"
              disabled={!this.isFormValid || this.inProgress}
            />
            <RaisedButton
              containerElement={<Link to='/forgot-password'/>}
              label="Forgot Password"
            />
          </div>
        </form>
      </div>
    )
  }
}

Signin.PropTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(
  (state) => ({user: state.user}),
  (dispatch) => bindActionCreators({ authUser }, dispatch)
)(Signin);
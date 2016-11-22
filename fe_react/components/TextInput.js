import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import * as isEmail from 'email-validator';

export class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      errorText: '',
      required: this.props.required || false,
      disabled: this.props.disabled || false
    };

    this.performValidation = this.performValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.persist();

    let value = event.target.value;
    let isValid = true;

    setTimeout(() => {
      isValid = this.performValidation(value);

      let { onChange, type } = this.props;

      if (onChange) {
        onChange(event, {
          [type]: {
            isValid,
            value
          }
        });
      }

    }, this.props.debounce);

    this.setState({value});
  }

  performValidation(value) {
    let { errorText, required: isRequired } = this.state;
    let { regexp, minLength, errorValidationText } = this.props;

    if (isRequired) {
      value = value.trim();
      errorText = '';

      if (!value) {
        errorText = 'This field is required'
      }

      if (this.props.type === 'email' && !isEmail.validate(value)) {
        errorText = errorValidationText;
      } else if (regexp && !regexp.test(value)) {
        errorText = errorValidationText;
      }

      if (minLength && value.length < minLength) {
        errorText = `Please enter at least ${minLength} characters.`
      }
    }

    this.setState({errorText});

    return (errorText.length === 0);
  }

  render() {
    return (
      <TextField
        value={this.state.value}
        style={this.props.style}
        onChange={this.handleChange}
        name={this.props.name}
        hintText={this.props.hintText}
        type={this.props.type}
        required={this.state.required}
        disabled={this.state.disabled}
        errorText={this.state.errorText}
      />
    );
  }
}
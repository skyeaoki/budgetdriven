import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // Sign Up
  handleSubmit = e => {
    e.preventDefault();
    // First check if passwords match
    if (this.state.password !== this.state.password2) {
      // Show error if no match
      this.setState({ errors: ['Passwords do not match'] });
    } else {
      // If match, send form info to server for validation
      axios
        .post('/api/auth/signUp', {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          // Post email in lowercase to prevent non-unique emails
          email: this.state.email.toLowerCase(),
          password: this.state.password
        })
        .then(res => {
          // If user was succesfully created, redirect to sign in page
          if (res.status === 201) {
            this.props.navigate();
          }
          // If not, show errors
        })
        .catch(err => {
          if (err) this.setState({ errors: err.response.data });
        });
    }
  };

  render() {
    return (
      <div className="auth">
        <img className="auth__logo" src="logo.png" alt="logo" />
        <form onSubmit={this.handleSubmit}>
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            maxLength="50"
            required
          />
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            maxLength="50"
            required
          />
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            maxLength="80"
            required
          />
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            maxLength="81"
            required
          />
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm Password"
            maxLength="81"
            required
          />
          {// Error Messages
          this.state.errors.length > 0 &&
            this.state.errors.map((error, i) => {
              return (
                <p className="auth__error error" key={i}>
                  {error}
                </p>
              );
            })}
          <button className="auth__submitButton primaryButton" type="submit">
            Sign Up
          </button>
        </form>

        <p className="auth__nav">
          Don't have an account yet?{' '}
          <button className="auth__navButton" onClick={this.props.navigate}>
            Sign in
          </button>
        </p>
      </div>
    );
  }
}

export default SignUp;

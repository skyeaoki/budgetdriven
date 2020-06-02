import React from 'react';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Sign in
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/auth/signIn', {
        // Submit email in lowercase to prevent non-unique emails
        email: this.state.email.toLowerCase(),
        password: this.state.password
      })
      .then(res => {
        // If user succesfully authenticated, sign in
        if (res.status === 200) {
          this.props.signIn(res.data);
        }
        // If not, show errors
      })
      .catch(err => {
        if (err) this.setState({ errors: err.response.data });
      });
  };

  render() {
    return (
      <div className="auth">
        <img className="auth__logo" src="logo.png" alt="logo" />
        <form onSubmit={this.handleSubmit}>
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="email"
            name="email"
            placeholder="Email"
            maxLength="80"
            required
          />
          <input
            className="auth__input"
            onChange={this.handleInputChange}
            type="password"
            name="password"
            placeholder="Password"
            maxLength="80"
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
            Sign In
          </button>
        </form>
        <p className="auth__nav">
          Don't have an account yet?{' '}
          <button className="auth__navButton" onClick={this.props.navigate}>
            Sign up
          </button>
        </p>
      </div>
    );
  }
}

export default SignIn;

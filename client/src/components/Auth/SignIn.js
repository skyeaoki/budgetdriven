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
      [event.target.id]: event.target.value
    });
  };

  // Sign in
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/auth/signIn', {
        // Post email in lowercase to prevent non-unique emails
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
        <img className="logo" src="logo.png" alt="logo" />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            maxLength="80"
            required
          />
          <input
            onChange={this.handleInputChange}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            maxLength="80"
            required
          />
          {// Error Messages
          this.state.errors.length > 0 &&
            this.state.errors.map((error, i) => {
              return (
                <p className="error" key={i}>
                  {error}
                </p>
              );
            })}
          <button type="submit" className="primaryButton">
            Sign In
          </button>
        </form>
        <p className="message">
          Don't have an account yet?{' '}
          <button onClick={this.props.navigate}>Sign up</button>
        </p>
      </div>
    );
  }
}

export default SignIn;

import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessages: []
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // post the email and password information to the server
        axios.post("/api/auth/signUp", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            // post email in lowercase to prevent non-unique emails
            email: this.state.email.toLowerCase(),
            password: this.state.password
      })
      .then( res => {
        
      }).catch( err => {
            // prevent unhandled error
            this.setState({ errorMessages: res.data || [] });
      });
    }

    render() {
        return (
            <div className="auth">
                    <img className="logo" src="logo.png" alt="logo" />
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleInputChange} type="email" id="email" name="email" placeholder="Email" maxLength="80"required />
                        <input onChange={this.handleInputChange} type="password" id="password" name="password" placeholder="Password" maxLength="80" required />
                        { // show error messages if they exist
                            (this.state.errorMessages.length > 0) && (
                            this.state.errorMessages.map( (error, i) => {
                                return <p className={styles.errorMessage} key={i} >{this.state.errorMessages}</p>;
                            })
                            )
                        }
                        <button type="submit" className="pinkButton">Sign Up</button>
                        <p className="message">Don't have an account yet? <button>Sign in</button></p>
                    </form>
            </div>
        );
    }
}

export default SignUp;
import React from 'react';
import axios from 'axios';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            email: "",
            password: ""
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    // Sign in 
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/auth/signIn", {
            // post email in lowercase to prevent non-unique emails
            email: this.state.email.toLowerCase(),
            password: this.state.password
        })
        .then( res => {
            this.props.signIn(res.data);
        })
        .catch( err => {
            if(err) {
                this.setState({
                    error: true
                })
            }
        })
    }

    render() {
        return (
            <div className="auth">
                    <img className="logo" src="logo.png" alt="logo" />
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleInputChange} type="email" id="email" name="email" placeholder="Email" maxLength="80"required />
                        <input onChange={this.handleInputChange} type="password" id="password" name="password" placeholder="Password" maxLength="80" required />
                        { this.state.error && <p className="error">Invalid email or password</p> }
                        <button type="submit" className="pinkButton">Sign In</button>
                    </form>
                    <p className="message">Don't have an account yet? <button onClick={this.props.navigate}>Sign up</button></p>
            </div>
        );
    }
}

export default SignIn;
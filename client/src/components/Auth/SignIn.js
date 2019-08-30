import React from 'react';
import axios from 'axios';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/auth/signIn", {
            // post email in lowercase to prevent non-unique emails
            email: this.state.email.toLowerCase(),
            password: this.state.password
        })
        .then( res => {
            this.props.signIn(res.user);
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
                        <input onChange={this.handleInputChange} type="email" id="email" name="email" placeholder="Email" />
                        <input onChange={this.handleInputChange} type="password" id="password" name="password" placeholder="Password" />
                        <button type="submit" className="pinkButton">Sign In</button>
                        <p>Don't have an account yet? Sign up</p>
                    </form>
            </div>
        );
    }
}

export default SignIn;
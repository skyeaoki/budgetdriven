import React from 'react';
import axios from 'axios';
// CSS Reset
import './reset.css';
import './App.css';
import Home from './components/Home.js';
import SignIn from './components/Auth/SignIn.js';
import SignUp from './components/Auth/SignUp.js';

class App extends React.Component {
    constructor() {
        super();
     
        this.state = {
            page: "SignIn",
            loading: true
        };

        this.authenticate();
    }

    authenticate = () => {
        axios.get("api/auth/")
        .then( res => {
            let user = res.data;
            if(res.status === 200) {
                this.setState({
                    authenticated: true,
                    userFirstName: user.firstName,
                    budget: user.budget,
                    userId: user._id,
                    loading: false
                })
            }
        })
        .catch( err => {
            if(err) {
                this.setState({
                    authenticated: false,
                    loading: false
                })
            }
        });
    };

    signIn = (data) => {
        let user = data;
        // Pass the user's id, first name, and budget to props
        this.setState({
            userId: user._id,
            userFirstName: user.firstName,
            budget: user.budget,
            authenticated: true
        });
    };

    navigateToSignIn = () => {
        this.setState({
            page: "SignIn"
        });
    };

    navigateToSignUp = () => {
        this.setState({
            page: "SignUp"
        });
    };

    render() {
        if(this.state.loading) return null;

        return (
            <div className="App"> 
            { (this.state.authenticated) && (
                <Home 
                    userId={this.state.userId}
                    userFirstName={this.state.userFirstName}
                    budget={this.state.budget}
                />
            )}
            { (!this.state.authenticated && this.state.page === "SignIn") && ( 
                <SignIn 
                    signIn={this.signIn}
                    navigate={this.navigateToSignUp}
                />
            )}
            { (!this.state.authenticated && this.state.page === "SignUp") && ( 
                <SignUp
                    navigate={this.navigateToSignIn}
                />
            )}
            </div>
        );
    }
}

export default App;

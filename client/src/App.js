import React from 'react';
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
            page: "SignIn"
        };
    }

    signIn = (data) => {
        // Pass the user's id, first name, and budget to props
        this.setState({
            userId: data.user._id,
            userFirstName: data.user.firstName,
            budget: data.user.budget,
            authenticated: true
        });
    }

    navigateToSignIn = () => {
        this.setState({
            page: "SignIn"
        });
    }

    navigateToSignUp = () => {
        this.setState({
            page: "SignUp"
        });
    }

    render() {
        return (
          <div className="App">
            { this.state.authenticated && (
                <Home 
                    userId={this.state.userId}
                    userFirstName={this.state.userFirstName}
                    budget={this.state.budget}
                />
            )
            }
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

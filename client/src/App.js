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
            authenticated: false,
            page: "SignIn"
        };
    }

    signIn = () => {
        this.setState({
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
                <Home />
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

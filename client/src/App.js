import React from 'react';
// CSS Reset
import './reset.css';
import './App.css';
import Home from './components/Home.js';
import SignIn from './components/Auth/SignIn.js';

class App extends React.Component {

    constructor() {
      super();
      this.state = {
        authenticated: false
      };
    }

    signIn = () => {
      console.log("signIN function run");
      this.setState({
        authenticated: true
      });
    }

    render() {
        return (
          <div className="App">
            { this.state.authenticated 
              ?  <Home />
              : <SignIn 
                    signIn={this.signIn}
                />
            }
          </div>
        );
    }
}

export default App;

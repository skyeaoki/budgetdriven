import React from 'react';
import axios from 'axios';

class Footer extends React.Component {

    signOut = () => {
        axios.get("/api/auth/signOut")
        .then( res => {
            if (res.status === 200) {
                window.location.reload();
            }
        })
        .catch( err => {
            if(err) console.log(err);
        });
    }

    render() {  
      return (
        <footer>
            <button onClick={this.signOut} className="signOut">Sign Out</button>
        </footer>
      );
    }
  }
  
  export default Footer;
  
import React from 'react';
import axios from 'axios';


class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: "300.00"
        };
    }

    // Handles submission of new budget
    handleSubmit(e) {
        const data = new FormData(e.target);

        // Send budget to API
        axios.put("/api/budget", {
          budget: data
        })
        .then( res => {
          console.log(res);
        })
        .catch( err => {
            // If authentication fails
            if(err) {
                // Do not refresh page 
                e.preventDefault();
                // Show error message
                this.setState({
                    error: true
                })
            }
        });  
    }

    render() {

      return (
        <div className="budget">
            <h1>Budget</h1>
            <p>Set your monthly spending budget.</p>
            <form onSubmit={this.handleSubmit}>
                <label className="dollarSign" htmlFor="budget">$</label>
                <input type="number" id="budget" name="budget" placeholder={this.state.budget} autoFocus={true}/>
                <button className="pinkButton" type="submit">Submit</button>
            </form>
        </div>
      );
    }
}

export default Budget;
import React from 'react';
import axios from 'axios';

class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: this.props.budgetAmount
        };
    }

    // Watch budget input changes
    onBudgetChange = e => {
        this.setState({
            budgetAmount: e.target.value
        })
    }

    // Submit new budget
    handleSubmit = e => {
        e.preventDefault();

        // First, check if authentication has timed out
        axios.get("/api/auth/")
        .then(res => {
            // If user is still logged in 
            if(res.status === 200) {
                // Update budget
                axios.put("/api/budget", {
                    userId: this.props.userId,
                    budget: this.state.budgetAmount
                })
                // If successful, update the budget amount in Home state
                .then( res => {
                    if(res.status === 204) {
                        this.props.updateBudget(this.state.budgetAmount);
                    }
                })
                .catch( err => {
                    console.log(err);
                }); 
            }      
        })
        .catch(err => {
            // If user has been logged out, refresh the page
            if(err) {
                window.location.reload();
            }
        });
    };


    handleSubmitTest = e => {
        e.preventDefault();
        this.props.updateBudget(this.state.budgetAmount);
    }


    render() {

      return (
        <div className="budget">
            <h1>Budget</h1>
            <p>Set your monthly spending budget.</p>
            <form onSubmit={this.handleSubmit}>
                <label className="dollarSign" htmlFor="budgetAmount">$</label>
                <input onChange={this.onBudgetChange} type="number" id="budgetAmount" name="budgetAmount" step="0.01" min="0" max="9999999" autoFocus={true} required/>
                <button className="pinkButton" type="submit">Submit</button>
            </form>
        </div>
      );
    }
}

export default Budget;
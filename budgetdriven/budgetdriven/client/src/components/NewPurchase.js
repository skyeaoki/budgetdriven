import React from 'react';
import moment from 'moment';
import axios from 'axios';

class NewPurchase extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: ["Groceries", "Bars & Alcohol", "Eating Out", "Miscellaneous"],
            todaysMonth: moment().format('MMMM'),
            todaysDay: moment().format('DD'),
            newCategory: false
        };
    }

    toggleNewCategoryInput(e) {
        this.setState({
            // Set newCategory state to true if the New Category option is selected,
            // otherwise set to false
            newCategory: e.target.value === "New Category"
        })
       
    }

    // Handles form submission
    handleSubmit(e) {
        // Save the form's data in a variable 
        const data = new FormData(e.target);
      
        // Send form data to API
        axios.post("/api/newPurchase", {
            body: data
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
            <div className="newPurchase">
                <h1>New Purchase</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="cost">Cost</label><br/>
                    <span className="dollarSign">$</span>
                    <input className="cost" type="number" id="cost" name="cost" autoFocus={true} /><br />

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" maxLength="45" />

                    <label htmlFor="date">Date: </label><br />
                    <span className="todaysMonth">{this.state.todaysMonth}</span>
                    <input className="date" type="number" id="date" name="date" defaultValue={this.state.todaysDay} />
                    
                    <label htmlFor="category">Category</label>
                    <select  onChange={this.toggleNewCategoryInput.bind(this)} name="category" id="category">
                        { this.state.categories && (
                            this.state.categories.map(category => {
                                return <option key={category}>{category}</option>
                            })
                        )}
                        <option>New Category</option>
                    </select>

                    {   // Show the New Category input when New Category state is true
                        this.state.newCategory &&
                            <div>
                                <label htmlFor="newCategory">New Category</label>
                                <input type="text" id="newCategory" name="newCategory" maxLength="30" />
                            </div>
                    }

                    <button type="submit" className="pinkButton">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewPurchase;
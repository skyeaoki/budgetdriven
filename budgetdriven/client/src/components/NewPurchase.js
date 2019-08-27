import React from 'react';
import moment from 'moment';
import axios from 'axios';

class NewPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todaysMonthAndYear: moment().format('MMMM YYYY'),
            todaysMonth: moment().format('MMMM'),
            categories: this.props.categories,
            todaysDay: moment().format('DD'),
            newCategory: false,
            cost: null,
            description: null,
            day: moment().format('DD'),
            // Set default category value
            category: this.props.categories[0] || "New Category"
        };
    }

    handleSelectChange = (e) => {
        this.setState({
            // Toggle New Category input
            newCategory: e.target.value === "New Category",
            // Store selection
            category: e.target.value
        })
    }

    // Store the value of the form inputs
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    // Handles form submission
    handleSubmit2 = (e) => {
        e.preventDefault();

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
                // Show error message
                this.setState({
                    error: true
                })
            }
        });  
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // format Date
        let date = new Date(this.state.day + " " + this.state.todaysMonthAndYear);
        date = moment(date).format('dddd MMMM DD');

        let purchase = {
            date: date,
            category: this.state.category,
            description: this.state.description,
            price: parseFloat(this.state.cost)
        };
        console.log(purchase);
        //this.props.addPurchase(purchase);
    }

    render() {
        return (
            <div className="newPurchase">
                <h1>New Purchase</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="cost">Cost</label><br/>
                    <span className="dollarSign">$</span>
                    <input onChange={this.handleInputChange} className="cost" type="number" id="cost" name="cost" step="any" min="0.01" max="999999" autoFocus={true} required /><br />

                    <label htmlFor="description">Description</label>
                    <input onChange={this.handleInputChange} type="text" id="description" name="description" maxLength="45" required />

                    <label htmlFor="date">Date: </label><br />
                    <span className="todaysMonth">{this.state.todaysMonth}</span>
                    <input onChange={this.handleInputChange} className="day" type="number" id="day" name="day" min="1" max="31" defaultValue={this.state.todaysDay} required/>
                    
                    <label htmlFor="category">Category</label>
                    <select onChange={this.handleSelectChange} name="category" id="category">
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
                                <input type="text" id="newCategory" name="newCategory" maxLength="30" required />
                            </div>
                    }

                    <button type="submit" className="pinkButton">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewPurchase;
import React from 'react';
import moment from 'moment';
import axios from 'axios';

class NewPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todaysMonthAndYear: moment().format('MMMM YYYY'),
            todaysMonth: moment().format('MMMM'),
            todaysDay: moment().format('DD'),
            cost: null,
            description: null,
            day: moment().format('DD'),
        };
    }

    // Store the value of the form inputs
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    // Handles form submission
    handleSubmit = (e) => {
        e.preventDefault();

        let date = new Date(this.state.day + " " + this.state.todaysMonthAndYear);
        let formattedDate = moment(date).format('dddd MMMM DD');
        let purchase = {
            date: date,
            formattedDate: formattedDate,
            location: this.state.location,
            description: this.state.description,
            price: parseFloat(this.state.cost)
        };
      
        // Send form data to API
        axios.post("/api/newPurchase", {
            body: purchase
        })
        .then( res => {
            this.props.addPurchase(purchase);
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

    handleSubmitTest= (e) => {
        e.preventDefault();
        let date = new Date(this.state.day + " " + this.state.todaysMonthAndYear);
        let formattedDate = moment(date).format('dddd MMMM DD');
        let purchase = {
            date: date,
            formattedDate: formattedDate,
            location: this.state.location,
            description: this.state.description,
            price: parseFloat(this.state.cost)
        };
        this.props.addPurchase(purchase);
    }

    render() {
        return (
            <div className="newPurchase">
                <h1>New Purchase</h1>
                <form onSubmit={this.handleSubmitTest}>
                    <label htmlFor="cost" className="costLabel">Cost</label>
                    <span className="dollarSign">$</span>
                    <input onChange={this.handleInputChange} className="cost" type="number" id="cost" name="cost" step="0.01" min="0.01" max="999999" autoFocus={true} required /><br />

                    <label htmlFor="location">Location</label>
                    <input onChange={this.handleInputChange} type="text" id="location" name="location" maxLength="30" required />

                    <label htmlFor="description">Description</label>
                    <input onChange={this.handleInputChange} type="text" id="description" name="description" maxLength="45" required />

                    <label htmlFor="date">Date: </label>
                    <span className="todaysMonth">{this.state.todaysMonth}</span>
                    <input onChange={this.handleInputChange} className="day" type="number" id="day" name="day" min="1" max="31" defaultValue={this.state.todaysDay} required/>
                    <span className="todaysYear">2019</span>
                    <button type="submit" className="pinkButton">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewPurchase;
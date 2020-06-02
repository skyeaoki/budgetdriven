import React from 'react';
import moment from 'moment';
import axios from 'axios';

class NewPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysMonthYearTime: moment().format('MMMM YYYY, h:mm:ss a'),
      todaysMonth: moment().format('MMMM'),
      todaysDay: moment().format('DD'),
      day: moment().format('DD'),
      errors: []
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Submit new purchase
  handleSubmit = e => {
    e.preventDefault();

    let date = new Date(this.state.day + ' ' + this.state.todaysMonthYearTime);

    let formattedDate = moment(date).format('dddd MMMM DD');
    let purchase = {
      date: date,
      formattedDate: formattedDate,
      location: this.state.location,
      description: this.state.description,
      cost: parseFloat(this.state.cost)
    };

    // First, check if authentication has timed out
    axios
      .get('/api/auth/')
      .then(res => {
        // If user is still logged in
        if (res.status === 200) {
          // Post new purchase to db
          axios
            .post('/api/purchases/new', purchase)
            .then(res => {
              // If purchase successfully created, add purchase to Home state
              if (res.status === 201) {
                // Include purchase id
                purchase._id = res.data;
                this.props.addPurchase(purchase);
                // If not, show errors
              } else {
                this.setState({ errors: res.data });
              }
            })
            .catch(err => console.log(err));
        }
      })
      // If user has been logged out, refresh the page
      .catch(err => {
        if (err) window.location.reload();
      });
  };

  render() {
    return (
      <div className="new">
        <h1 className="new__title">New Purchase</h1>
        <form className="new__form" onSubmit={this.handleSubmit}>
          <label className="new__label new__costLabel" htmlFor="cost">
            Cost
          </label>
          <span className="new__currency">$</span>
          <input
            className="new__cost new__input"
            onChange={this.handleInputChange}
            type="number"
            id="cost"
            name="cost"
            step="0.01"
            min="0.01"
            max="999999"
            autoFocus={true}
            required
          />
          <br />

          <label className="new__label" htmlFor="location">Location</label>
          <input
            className="new__input"
            onChange={this.handleInputChange}
            type="text"
            id="location"
            name="location"
            maxLength="30"
            required
          />

          <label className="new__label" htmlFor="description">Description</label>
          <input
            className="new__input"
            onChange={this.handleInputChange}
            type="text"
            id="description"
            name="description"
            maxLength="45"
            required
          />

          <label className="new__label" htmlFor="date">Date: </label>
          <span className="new__month">{this.state.todaysMonth}</span>
          <input
            className="new__input new__day"
            onChange={this.handleInputChange}
            type="number"
            id="day"
            name="day"
            min="1"
            max="31"
            defaultValue={this.state.todaysDay}
            required
          />
          <span className="new__year">2019</span>
          <button className="new__submit primaryButton" type="submit" >
            Submit
          </button>
        </form>
        {// Error Messages
          this.state.errors.length > 0 &&
          this.state.errors.map((error, i) => {
            return (
              <p className="error" key={i}>
                {error}
              </p>
            );
          })}
      </div>
    );
  }
}

export default NewPurchase;

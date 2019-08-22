import React from 'react';

class Budget extends React.Component {

  render() {

    return (
      <div className="budget">
          <h1>Budget</h1>
          <p>Set your monthly spending budget.</p>
          <form>
              <label className="dollarSign" for="budget">$</label>
              <input type="number" id="budget" name="budget" placeholder="300.00" />
              <button className="pinkButton" type="submit">Submit</button>
          </form>
      </div>
    );
  }
}

export default Budget;
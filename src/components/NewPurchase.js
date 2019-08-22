import React from 'react';

class NewPurchase extends React.Component {

  render() {

    return (
        <div className="newPurchase">
            <h1>New Purchase</h1>
            <form>
                <label for="cost">Cost</label><br/>
                <span className="dollarSign">$</span>
                <input className="cost" type="number" id="cost" name="cost" /><br />

                <label for="description">Description</label>
                <input type="text" id="description" name="description" maxlength="45" />

                <label for="date">Date</label>
                <input type="date" id="date" name="date" value="2019-09-19" />

                <label for="category">Category</label>
                <select name="category" id="category" name="category">
                    <option>Groceries</option>
                    <option>Bars & Alcohol</option>
                    <option>Eating Out</option>
                    <option>Misc</option>
                    <option>New Category</option>
                </select>

                <label for="NewCategory">New Category</label>
                <input type="text" id="newCategory" name="newCategory" maxlength="30" />            

                <button type="submit" className="pinkButton">Submit</button>
            </form>
        </div>
    );
  }
}

export default NewPurchase;
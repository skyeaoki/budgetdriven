import React from 'react';

class Spending extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    name: "Groceries",
                    spent: 102.14
                },
                {
                    name: "Bars & Alcohol",
                    spent: 23.41
                },
                {
                    name: "Eating Out",
                    spent: 47.67
                },
                {
                    name: "Misc",
                    spent: 5.66
                }
            ]
        };
    }

    render() {
        return (
            <div className="spending">
                <button onClick={this.props.navigate} className="pinkButton" value="NewPurchase"> Add Purchase</button>
                { this.state.categories.map( category => {
                    return (
                    <div className="category" key={category.name}>
                        <p className="categoryName">{category.name}</p>
                        <p className="categorySpent"><span className="dollarSign">$</span>{category.spent}</p>
                    </div>  
                    );  
                  })
                }
               
            </div>
    );
  }
}

export default Spending;

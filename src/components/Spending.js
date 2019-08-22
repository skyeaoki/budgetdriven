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
                <a href="newPurchase.html"><button className="pinkButton">Add Purchase</button></a>
                { this.state.categories.map( category => {
                    return (
                    <div className="spendingByCategory">
                        <p className="category">{category.name}</p>
                        <p className="spentForCategory"><span className="dollarSign">$</span>{category.spent}</p>
                    </div>  
                    );  
                  })
                }
               
            </div>
    );
  }
}

export default Spending;

import React from 'react';

class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: [
                {
                    date: "Friday, August 16",
                    category: "Fast Food",
                    description: "Whataburger for Hunter & I",
                    price: 20.33
                },
                {
                    date: "Tuesday, August 13",
                    category: "Bars & Alcohol",
                    description: "5 lip tints from Pacifica",
                    price: 31.95
                },
                {
                    date: "Monday, August 12",
                    category: "Bars & Alcohol",
                    description: "2 Long Islands @ the bar",
                    price: 21.00
                }
            ]
        };
    }

    render() {

        return (
            <div className="purchasesParent">
                <div className="purchases">
                    {   // if the user has purchases show them
                        this.state.purchases ? (
                            this.state.purchases.map( (purchase, index) => {
                                return (
                                    <div className="purchase" key={index}>
                                        <div className="purchaseDelete">
                                            <button>x</button>
                                        </div>
                                        <p className="purchaseDate">{purchase.date}</p>
                                        <p className="purchaseCategory">{purchase.category}</p>
                                        <p className="purchaseDescription">{purchase.description}</p>
                                        <p className="purchasePrice">${purchase.price}</p>
                                    </div>
                                );
                            })
                        )
                        // otherwise display no purchases message
                        : <p class="noPurchases">No purchases have been added yet.</p>
                    }
                </div>
                <a href="newPurchase.html"><button className="pinkButton">Add Purchase</button></a>
            </div>
        );
    }
}

export default Purchases;
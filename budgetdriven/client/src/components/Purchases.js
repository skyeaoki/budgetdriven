import React from 'react';

class Purchases extends React.Component {
    render() {

        return (
            <div className="purchasesParent">
                <div className="purchases">
                    {   // if the user has purchases show them
                        this.props.purchases.length > 0 ? (
                            this.props.purchases.map( (purchase, index) => {
                                return (
                                    <div className="purchase" key={index}>
                                        <div className="purchaseDelete">
                                            <button value={index} onClick={this.props.deletePurchase}>x</button>
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
                <button onClick={this.props.navigate} className="pinkButton" value="NewPurchase">Add Purchase</button>
            </div>
        );
    }
}

export default Purchases;
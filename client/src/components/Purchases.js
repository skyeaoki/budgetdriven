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
                                        <p className="purchaseDate">{purchase.formattedDate}</p>
                                        <p className="purchaseLocation">{purchase.location}</p>
                                        <p className="purchaseDescription">{purchase.description}</p>
                                        <p className="purchasePrice">${purchase.price}</p>
                                    </div>
                                );
                            })
                        )
                        // otherwise display no purchases message
                        : <p className="noPurchases">You have no purchases so far.</p>
                    }
                </div>
                <button onClick={this.props.navigate} className="pinkButton" value="New Purchase">New Purchase</button>
            </div>
        );
    }
}

export default Purchases;
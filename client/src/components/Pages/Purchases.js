import React from "react";
import axios from "axios";

class Purchases extends React.Component {
    

    deletePurchase = (e) => {
        let purchaseId = e.target.value;
        axios.delete("/api/purchases/", { data: {id: purchaseId} })
        .then( res => {
            if(res.status === 204) { 
                this.props.deletePurchase(purchaseId);
            }
        })
        .catch(err => { if(err) console.log(err) });
    }
    render() {
        return (
            <div className="purchasesParent">
                <div className="purchases">
                    {   // if the user has purchases show them
                        this.props.purchases.length > 0 ? (
                            this.props.purchases.map( (purchase) => {
                                return (
                                    <div className="purchase" key={purchase._id}>
                                        <div className="purchaseDelete">
                                            <button value={purchase._id} onClick={this.deletePurchase}>x</button>
                                        </div>
                                        <p className="purchaseDate">{purchase.formattedDate}</p>
                                        <p className="purchaseLocation">{purchase.location}</p>
                                        <p className="purchaseDescription">{purchase.description}</p>
                                        <p className="purchaseCost">${purchase.cost}</p>
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
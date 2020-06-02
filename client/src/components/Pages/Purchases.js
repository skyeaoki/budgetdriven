import React from 'react';
import axios from 'axios';

class Purchases extends React.Component {
  deletePurchase = e => {
    let purchaseId = e.target.value;
    axios
      .delete('/api/purchases/', { data: { id: purchaseId } })
      .then(res => {
        if (res.status === 204) {
          this.props.deletePurchase(purchaseId);
        }
      })
      .catch(err => {
        if (err) console.log(err);
      });
  };

  render() {
    return (
      <div className="purchasesContainer">
        <div className="purchases">
          {// if the user has purchases show them
            this.props.purchases.length > 0 ? (
              this.props.purchases.map(purchase => {
                return (
                  <div className="purchase" key={purchase._id}>
                    <div className="purchase__delete">
                      <button className="purchase__deleteButton" value={purchase._id} onClick={this.deletePurchase}>
                        x
                      </button>
                    </div>
                    <p className="purchase__date">{purchase.formattedDate}</p>
                    <p className="purchase__location">{purchase.location}</p>
                    <p className="purchase__description">{purchase.description}</p>
                    <p className="purchase__cost">${purchase.cost.toFixed(2)}</p>
                  </div>
                );
              })
            ) : (
                // otherwise display no purchases message
                <p className="purchases__none">You have no purchases so far.</p>
              )}
        </div>
        <button
          onClick={this.props.navigate}
          className="purchases__newButton primaryButton"
          value="New Purchase"
        >
          New Purchase
        </button>
      </div>
    );
  }
}

export default Purchases;

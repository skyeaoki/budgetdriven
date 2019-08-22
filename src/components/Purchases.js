import React from 'react';

class Purchases extends React.Component {

  render() {

    return (
        <div className="purchasesParent">
            <div className="purchases">
                <div className="purchase">
                    <div className="purchaseDelete">
                        <button>x</button>
                    </div>
                    <p className="purchaseDate">Friday, August 16</p>
                    <p className="purchaseCategory">Fast Food</p>
                    <p className="purchaseDescription">Whataburger for Hunter, Sean, Patty and I. :P</p>
                    <p className="purchasePrice">$20.33</p>
                </div>
                <div className="purchase">
                    <div className="purchaseDelete">
                        <button>x</button>
                    </div>
                    <p className="purchaseDate">Tuesday, August 13</p>
                    <p className="purchaseCategory">Shopping</p>
                    <p className="purchaseDescription">5 lip tints from Pacifica</p>
                    <p className="purchasePrice">$31.95</p>
                </div>
                <div className="purchase">
                    <div className="purchaseDelete">
                        <button>x</button>
                    </div>
                    <p className="purchaseDate">Monday, August 11</p>
                    <p className="purchaseCategory">Fast Food</p>
                    <p className="purchaseDescription">Whataburger for Hunter & I</p>
                    <p className="purchasePrice">$17.10</p>
                </div>
            </div>
            <a href="newPurchase.html"><button className="pinkButton">Add Purchase</button></a>
        </div>
    );
  }
}

export default Purchases;
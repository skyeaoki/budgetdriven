import React from 'react';
import Header from './Header';
import Spending from './Spending';
//import NewPurchase from './NewPurchase';
//import Purchases from './Purchases';
//import Budget from './Budget';
import Footer from './Footer'



class Home extends React.Component {

  render() {

    return (
        <div>
          <Header />
          <Spending />
          <Footer />
        </div>
    );
  }
}

export default Home;

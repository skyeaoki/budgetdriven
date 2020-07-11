import React from 'react';
import Header from './Header/Header';
import NewPurchase from './Pages/NewPurchase';
import Purchases from './Pages/Purchases';
import Budget from './Pages/Budget';
import Footer from './Footer';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Purchases',
      userId: this.props.userId,
      userFirstName: this.props.userFirstName,
      budgetAmount: this.props.budget,
      purchases: []
    };
    this.retrievePurchases();
    // Retrieve the user if page refreshes
    if (!this.props.userId) {
      this.retrieveUser();
    }
  }

  // Retrieve user from database (on refresh)
  retrieveUser = () => {
    axios
      .get('/api/auth/')
      .then(res => {
        let user = res.data;
        this.setState({
          userId: user._id,
          userFirstName: user.firstName,
          budgetAmount: user.budget
        });
      })
      .catch(err => {
        if (err) console.log(err);
      });
  };

  // Retrieve purchases from database
  retrievePurchases = () => {
    axios
      .get('/api/purchases/all')
      .then(res => {
        let purchases = res.data;
        let budget = this.state.budgetAmount;
        let totalSpent = 0;

        // Calculate total spent
        purchases.forEach(purchase => totalSpent += purchase.cost);

        this.setState({
          // Sort purchases by most recent
          purchases: purchases.sort((a, b) => new Date(b.date) - new Date(a.date)),
          totalSpent: totalSpent,
          // Calculate the amount left to spend (if it's not positive display 0)
          leftToSpend: totalSpent <= budget ? budget - totalSpent : 0,
          // Calculate progress bar (if it's more than the budget display 100%)
          progressBar: totalSpent <= budget ? (totalSpent * 100) / budget : 100
        });
      })
      .catch(err => {
        if (err) console.log(err);
      });
  };

  // Handles navigation
  navigate = e => {
    this.setState({
      page: e.target.value
    });
  };

  // updateBudget = amount => {
  //   let { budgetAmount, totalSpent } = this.state;
  //   this.setState({
  //     budgetAmount: amount
  //   }, () => {
  //     this.setState({
  //       // Update progress bar
  //       progressBar: totalSpent <= budgetAmount ? (totalSpent * 100) / budgetAmount : 100,
  //       // Update left to spend amount
  //       leftToSpend: totalSpent <= budgetAmount ? budgetAmount - totalSpent : 0,
  //       page: 'Purchases'
  //     });
  //   });
  // };

  updateBudget = amount => {
    this.setState({
      budgetAmount: amount
    }, () => {
      this.setState(({ totalSpent, budgetAmount }) => {
        console.log(totalSpent * 100 / budgetAmount);
        return {
          // Update progress bar
          progressBar: totalSpent <= budgetAmount ? totalSpent * 100 / budgetAmount : 100,
          // Update left to spend amount
          leftToSpend: totalSpent <= budgetAmount ? budgetAmount - totalSpent : 0,
          page: "Purchases"
        }
      })
    });
  }

  deletePurchase = purchaseId => {
    const { budgetAmount: budget, purchases } = this.state;
    if (window.confirm('Delete this purchase?')) {
      // Find the purchase to be deleted by id
      let deletedPurchase = purchases.find(purchase => purchase._id === purchaseId);

      // Filter out the selected purchase from the purchase array
      let updatedPurchases = purchases.filter(purchase => purchase._id !== purchaseId);

      // Calculate total spent and left to spend
      let totalSpent = this.state.totalSpent - deletedPurchase.cost;
      let leftToSpend = this.state.leftToSpend + deletedPurchase.cost;

      // Round to the nearest hundredth because Javascript has issues with floating point arithmetic
      totalSpent = Math.round(100 * totalSpent) / 100;
      leftToSpend = Math.round(100 * leftToSpend) / 100;

      this.setState({
        // Update purchases
        purchases: updatedPurchases,
        // Update total spent
        totalSpent: totalSpent,
        // Update amount left to spend (if it's not positive display 0)
        leftToSpend: totalSpent <= budget ? leftToSpend : 0,
        // Update progress bar (if it's more than the budget display 100%)
        progressBar: totalSpent <= budget ? (totalSpent * 100) / budget : 100
      });
    }
  };

  addPurchase = purchase => {
    let budget = this.state.budgetAmount;
    let updatedPurchases = this.state.purchases;

    // Push new purchase to front of array
    updatedPurchases.unshift(purchase);
    // Sort by most recent day
    updatedPurchases.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total spent and left to spend
    let totalSpent = this.state.totalSpent + purchase.cost;
    let leftToSpend = this.state.leftToSpend - purchase.cost;

    // Round to the nearest hundredth because Javascript has issues with floating point arithmetic
    totalSpent = Math.round(100 * totalSpent) / 100;
    leftToSpend = Math.round(100 * leftToSpend) / 100;

    this.setState({
      // Update purchases
      purchases: updatedPurchases,
      // Update total spent
      totalSpent: totalSpent,
      // Update amount left to spend (if it's not positive display 0)
      leftToSpend: totalSpent <= budget ? leftToSpend : 0,
      // Update progress bar (if it's more than the budget display 100%)
      progressBar: totalSpent <= budget ? (totalSpent * 100) / budget : 100,
      page: 'Purchases'
    });
  };

  render() {
    let { page, userFirstName, budgetAmount, progressBar, totalSpent, leftToSpend, purchases, userId } = this.state;

    return (
      <div>
        <Header
          navigate={this.navigate}
          page={page}
          userFirstName={userFirstName}
          budgetAmount={budgetAmount}
          progressBar={progressBar}
          totalSpent={totalSpent}
          leftToSpend={leftToSpend}
        />

        {// Purchases Page
          page === 'Purchases' && (
            <Purchases
              navigate={this.navigate}
              purchases={purchases}
              deletePurchase={this.deletePurchase}
            />
          )
        }

        {// New Purchase page
          page === 'New Purchase' && (
            <NewPurchase addPurchase={this.addPurchase} />
          )
        }

        {// Budget page
          page === 'Budget' && (
            <Budget
              userId={userId}
              budgetAmount={budgetAmount}
              updateBudget={this.updateBudget}
            />
          )
        }

        <Footer />
      </div>
    );
  }
}

export default Home;

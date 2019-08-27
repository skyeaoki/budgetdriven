import React from 'react';
import Header from './Header';
import Spending from './Spending';
import NewPurchase from './NewPurchase';
import Purchases from './Purchases';
import Budget from './Budget';
import Footer from './Footer'

let data = {
    userFirstName: "Skye",
    budgetAmount: 300,
    totalSpent: 88
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "Spending",
            userFirstName: data.userFirstName,
            budgetAmount: data.budgetAmount,
            totalSpent: data.totalSpent,
            leftToSpend: data.totalSpent <= data.budgetAmount ? Math.round((data.budgetAmount - data.totalSpent) * 100) / 100 : 0,
            progressBar: data.totalSpent <= data.budgetAmount ? data.totalSpent * 100 / data.budgetAmount : 100
        }
    }

    // Handles navigation
    navigate = e => {
        this.setState({
            // Set the page to the value of the button clicked
            page: e.target.value
        })
    }

    updateBudget = amount => {
        this.setState({
            budgetAmount: amount
        }, () => {
            this.setState({
                // Update progress bar
                progressBar: this.state.totalSpent <= this.state.budgetAmount ? this.state.totalSpent * 100 / this.state.budgetAmount : 100,
                // Update left to spend amount
                leftToSpend: this.state.totalSpent <= this.state.budgetAmount ? Math.round((this.state.budgetAmount - this.state.totalSpent) * 100) / 100: 0,
                page: "Spending"
            })
        });
    }

    render() {

        let page = this.state.page;

          return (
              <div>
                  <Header 
                      navigate={this.navigate}
                      page={this.state.page}
                      userFirstName={this.state.userFirstName}
                      budgetAmount={this.state.budgetAmount}
                      progressBar = {this.state.progressBar}
                      totalSpent={this.state.totalSpent}
                      leftToSpend={this.state.leftToSpend}
                  />

                  {   // Spending Page
                      page === "Spending" && (
                          <Spending 
                              navigate={this.navigate} 
                          />  
                  )}

                  {   // Purchases Page
                      page === "Purchases" && ( 
                          <Purchases 
                              navigate={this.navigate} 
                          /> 
                  )}
                
                  {   // Budget page
                      page === "Budget" &&  (
                          <Budget 
                                budgetAmount={this.state.budgetAmount}
                                updateBudget={this.updateBudget}
                          />
                  )}

                  {   // New Purchase page
                      page === "NewPurchase" && (
                          <NewPurchase />
                  )}

                  <Footer />
              </div>
        );
    }
}

export default Home;

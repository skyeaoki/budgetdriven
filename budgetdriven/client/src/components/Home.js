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
    totalSpent: 73.28,
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
    ],
    categories: ['Groceries', 'Eating Out', 'Bars/Alcohol', 'Miscellaneous'],
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
            progressBar: data.totalSpent <= data.budgetAmount ? data.totalSpent * 100 / data.budgetAmount : 100,
            purchases: data.purchases,
            categories: data.categories
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

    deletePurchase = e => {
        let purchase = this.state.purchases[e.target.value];
        // Remove purchase from purchases array
        let updatedPurchases = this.state.purchases;
        updatedPurchases.splice(e.target.value, 1);

        this.setState({
            // Update purchases
            purhcases: updatedPurchases,
            // Update total spent
            totalSpent: this.state.totalSpent - purchase.price,
            // Update progress bar
            progressBar: this.state.totalSpent <= this.state.budgetAmount ? (this.state.totalSpent - purchase.price) * 100 / this.state.budgetAmount : 100,
            // Update left to spend amount
            leftToSpend: this.state.totalSpent <= this.state.budgetAmount ? Math.round((this.state.budgetAmount - this.state.totalSpent + purchase.price) * 100) / 100: 0
        })
    }

    addPurchase = purchase => {
        let updatedPurchases = this.state.purchases;
        updatedPurchases.push(purchase);

        this.setState({
            // Update purchases
            purhcases: updatedPurchases,
            // Update total spent
            totalSpent: this.state.totalSpent + purchase.price,
            // Update progress bar
            progressBar: this.state.totalSpent <= this.state.budgetAmount ? (this.state.totalSpent + purchase.price) * 100 / this.state.budgetAmount : 100,
            // Update left to spend amount
            leftToSpend: this.state.totalSpent <= this.state.budgetAmount ? Math.round((this.state.budgetAmount - this.state.totalSpent - purchase.price) * 100) / 100: 0
        })
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
                            purchases={this.state.purchases}
                            deletePurchase={this.deletePurchase}
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
                        <NewPurchase 
                            addPurchase={this.addPurchase}
                            categories={this.state.categories}
                        />
                )}

                <Footer />
            </div>
        );
    }
}

export default Home;

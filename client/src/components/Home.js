import React from 'react';
import Header from './Layout/Header';
import NewPurchase from './Pages/NewPurchase';
import Purchases from './Pages/Purchases';
import Budget from './Pages/Budget';
import Footer from './Layout/Footer'

let data = {
    userFirstName: "Skye",
    budgetAmount: 300,
    totalSpent: 73.28,
    purchases: [
        {
            date: new Date("Friday August 16 2019"),
            formattedDate: "Friday, August 16",
            location: "Whataburger",
            description: "Two burgers for Hunter & I",
            price: 20.33
        },
        {
            date: new Date("Monday August 12 2019"),
            formattedDate: "Monday, August 12",
            location: "Local Bar",
            description: "2 Long Islands",
            price: 21.00
        },
        {
            date: new Date("Tuesday August 13 2019"),
            formattedDate: "Tuesday, August 13",
            location: "Pacifica.com",
            description: "5 lip tints",
            price: 31.95
        },
    ]
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "Purchases",
            userFirstName: this.props.userFirstName,
            budgetAmount: this.props.budget,
            totalSpent: data.totalSpent,
            leftToSpend: data.totalSpent <= this.props.budget ? this.props.budget - data.totalSpent : 0,
            progressBar: data.totalSpent <= this.props.budget ? data.totalSpent * 100 / this.props.budget : 100,
            // Purchases sorted by most recent
            purchases: data.purchases.sort( (a,b) => { return new Date(b.date) - new Date(a.date) })
        }
    }

    // Handles navigation
    navigate = e => {
        this.setState({
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
                leftToSpend: this.state.totalSpent <= this.state.budgetAmount ? this.state.budgetAmount - this.state.totalSpent : 0,
                page: "Purchases"
            })
        });
    }

    deletePurchase = e => {
        if(window.confirm("Delete this purchase?")) {
            let purchase = this.state.purchases[e.target.value];
            // Remove purchase from purchases array
            let updatedPurchases = this.state.purchases;
            updatedPurchases.splice(e.target.value, 1);

            // Calculate total spent and leftToSpend
            // Turn floats into integers before performing arithmetic to avoid issues in Javascript
            let totalSpent = ((this.state.totalSpent * 100) - (purchase.price * 100)) / 100;
            let leftToSpend = ((this.state.leftToSpend * 100) + (purchase.price * 100)) / 100;

            console.log("totalSpent:", this.state.totalSpent, "purchase.price:", purchase.price);
            this.setState({
                // Update purchases
                purchases: updatedPurchases,
                // Update total spent
                totalSpent: totalSpent,
                // Update progress bar
                progressBar: this.state.totalSpent <= this.state.budgetAmount ? (this.state.totalSpent - purchase.price) * 100 / this.state.budgetAmount : 100,
                // Update left to spend amount
                leftToSpend: this.state.totalSpent <= this.state.budgetAmount ? leftToSpend : 0 
            })
        }
    }

    addPurchase = purchase => {
        let updatedPurchases = this.state.purchases;
        // Push new purchase to front of array
        updatedPurchases.unshift(purchase);
        // Sort by most recent day
        updatedPurchases.sort( (a,b) => { return new Date(b.date) - new Date(a.date) });

        // Calculate total spent and leftToSpend
        // Turn floats into integers before performing arithmetic to avoid issues in Javascript
        let totalSpent = ((this.state.totalSpent * 100) + (purchase.price * 100)) / 100;
        let leftToSpend = ((this.state.leftToSpend * 100) - (purchase.price * 100)) / 100;

        this.setState({
            // Update purchases
            purchases: updatedPurchases,
            // Update progress bar
            progressBar: this.state.totalSpent <= this.state.budgetAmount ? (this.state.totalSpent + purchase.price) * 100 / this.state.budgetAmount : 100,
            // Update total spent
            totalSpent: totalSpent,
            // Update left to spend amount
            leftToSpend: this.state.totalSpent <= this.state.budgetAmount ? leftToSpend : 0, 
            page: "Purchases"
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

                {   // Purchases Page
                    page === "Purchases" && ( 
                        <Purchases 
                            navigate={this.navigate} 
                            purchases={this.state.purchases}
                            deletePurchase={this.deletePurchase}
                        /> 
                )}

                {   // New Purchase page
                    page === "New Purchase" && (
                        <NewPurchase 
                            addPurchase={this.addPurchase}
                        />
                )}
            
                {   // Budget page
                    page === "Budget" &&  (
                    <Budget 
                        userId={this.props.userId}
                        budgetAmount={this.state.budgetAmount}
                        updateBudget={this.updateBudget}
                    />
                )}

                <Footer />
            </div>
        );
    }
}

export default Home;

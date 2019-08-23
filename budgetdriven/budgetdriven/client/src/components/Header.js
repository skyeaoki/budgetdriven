import React from 'react';
import moment from 'moment';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userFirstName: "Skye",
          todaysDate: moment().format('MMMM DD'),
          currentMonth: moment().format('MMMM'),
          leftToSpend: "124.66",
          totalSpent: "175.34",
          totalBudget: "300.00"
        };
    }

    componentDidMount() {
        this.setState({ 
            budgetProgress: this.state.totalSpent * 100 / this.state.totalBudget
        })
    }

    render() {
        return (
            <div className="header">
                <div className="greeting">
                <p>Hello <span className="pink">{this.state.userFirstName}</span>, it's <span className="pink">{this.state.todaysDate}</span>.</p>
                <p>You have this much left to spend for {this.state.currentMonth}: </p>
                </div>
                <p className="leftToSpend"><span className="dollarSign">$</span>{this.state.leftToSpend}</p>
                <div className="budgetProgressBar">
                    <div style={{"width" : this.state.budgetProgress + "%"}}></div>
                </div>
                <div className="budgetProgressBarAmounts">
                    <span className="totalSpent">${this.state.totalSpent} <span className="spent">spent</span></span> 
                    <span className="totalBudget">${this.state.totalBudget}</span>
                </div>
                
                <nav>
                    <button onClick={this.props.navigate} className={this.props.page === "Spending" || this.props.page === "NewPurchase" ? "active" : ""} value="Spending">Spending</button>
                    <button onClick={this.props.navigate} className={this.props.page === "Purchases" ? "active" : ""} value="Purchases">Purchases</button>
                    <button onClick={this.props.navigate} className={this.props.page === "Budget" ? "active" : ""} value="Budget">Budget</button>
                </nav>
            </div>
        );
    }
}

export default Header;



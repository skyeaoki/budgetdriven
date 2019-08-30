import React from 'react';
import moment from 'moment';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          todaysDate: moment().format('MMMM DD'),
          currentMonth: moment().format('MMMM')
        };
    }

    render() {
        return (
            <div className="header">
                <div className="greeting">
                <p>Hello <span className="pink">{this.props.userFirstName}</span>, it's <span className="pink">{this.state.todaysDate}</span>.</p>
                <p>You have this much left to spend for {this.state.currentMonth}: </p>
                </div>
                <p className="leftToSpend"><span className="dollarSign">$</span>{this.props.leftToSpend}</p>
                <div className="progressBar">
                    <div style={{"width" : this.props.progressBar + "%"}}></div>
                </div>
                <div className="progressBarAmounts">
                    <span className="totalSpent">${this.props.totalSpent} <span className="spent">spent</span></span> 
                    <span className="budgetAmount">${this.props.budgetAmount}</span>
                </div>
                
                <nav>
                    <button onClick={this.props.navigate} className={this.props.page === "Purchases" ? "active" : ""} value="Purchases">Purchases</button>
                    <button onClick={this.props.navigate} className={this.props.page === "New Purchase" ? "active" : ""} value="New Purchase">New</button>
                    <button onClick={this.props.navigate} className={this.props.page === "Budget" ? "active" : ""} value="Budget">Budget</button>
                </nav>
            </div>
        );
    }
}

export default Header;



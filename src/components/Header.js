import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "Skye",
          todaysDate: "August 16",
          leftToSpend: 124.66,
          budgetProgress: "80%",
          totalSpent: 175.34,
          totalBudget: 300
        };
    }
  render() {
    return (
        <div className="header">
            <div className="greeting">
            <p>Hello <span className="pink">{this.state.name}</span>, it's <span className="pink">{this.state.todaysDate}</span>.</p>
            <p>You have this much left to spend for August: </p>
            </div>
            <p className="leftToSpend"><span className="dollarSign">$</span>{this.state.leftToSpend}</p>
            <div className="progressBar">
                <div style={{"width" : this.state.budgetProgress}}></div>
            </div>
            <div className="progressBarAmounts">
                <span className="totalSpent">${this.state.totalSpent} <span className="spent">spent</span></span> 
                <span className="totalBudget">${this.state.totalBudget}</span>
            </div>
            
            <nav>
                <a href="spending.html"><button className="active">Spending</button></a>
                <a href="purchases.html"><button>Purchases</button></a>
                <a href="budget.html"><button>Budget</button></a>
            </nav>
        </div>
    );
  }
}

export default Header;



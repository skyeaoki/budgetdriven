import React from 'react';
import moment from 'moment';
import Progress from './Progress';
import MainNav from './MainNav';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysDate: moment().format('MMMM DD'),
      currentMonth: moment().format('MMMM')
    };
  }

  render() {
    const { leftToSpend, totalSpent, budgetAmount, navigate, userFirstName, progressBar } = this.props;
    const { todaysDate, currentMonth } = this.state;

    return (
      <div className="header">
        <div className="greetingContainer">
          <p className="greeting">
            Hello <span className="greeting__firstName">{userFirstName}</span>,
            it's <span className="greeting__date">{todaysDate}</span>.
          </p>
          <p>You have this much left to spend for {currentMonth}:</p>
        </div>
        <Progress
          leftToSpend={leftToSpend}
          totalSpent={totalSpent}
          budgetAmount={budgetAmount}
          progressBar={progressBar}
        />
        <MainNav navigate={navigate} />
      </div>
    );
  }
}

export default Header;

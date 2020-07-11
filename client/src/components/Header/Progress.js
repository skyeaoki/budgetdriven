import React from 'react';
class Progress extends React.Component {
  render() {
    const { leftToSpend, progressBar, totalSpent, budgetAmount } = this.props;
    console.log(progressBar);
    return (
      <div className="progress">
        <p className="progress__leftToSpend">
          <span className="progress__currency">$</span>
          {leftToSpend && leftToSpend.toFixed(2)}
        </p>
        <div className="progress__barContainer">
          <div
            className="progress__bar"
            style={{ width: progressBar + '%' }}
          ></div>
        </div>
        <div className="progress__amounts">
          <span className="progress__totalSpent">
            ${totalSpent && totalSpent.toFixed(2)}
            <span className="progress__spent"> spent</span>
          </span>
          <span className="progress__budget">${budgetAmount}</span>
        </div>
      </div>
    );
  }
}

export default Progress;

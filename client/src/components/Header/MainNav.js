import React from 'react';

class MainNav extends React.Component {

  render() {
    const { navigate, page } = this.props;

    return (
      <nav className="mainNav">
        <button
          onClick={navigate}
          className={page === 'Purchases' ? 'mainNav__button active' : 'mainNav__button'}
          value="Purchases"
        >
          Purchases
        </button>
        <button
          onClick={navigate}
          className={page === 'New Purchase' ? 'mainNav__button active' : 'mainNav__button'}
          value="New Purchase"
        >
          New
        </button>
        <button
          onClick={navigate}
          className={page === 'Budget' ? 'mainNav__button active' : 'mainNav__button'}
          value="Budget"
        >
          Budget
        </button>
      </nav>
    );
  }
}

export default MainNav;

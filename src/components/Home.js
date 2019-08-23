import React from 'react';
import Header from './Header';
import Spending from './Spending';
import NewPurchase from './NewPurchase';
import Purchases from './Purchases';
import Budget from './Budget';
import Footer from './Footer'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "Spending"
        }
    }

    // Handles navigation
    navigate = (e) => {
      this.setState({
          // Set the page to the value of the button clicked
          page: e.target.value
      })
    }

    render() {

        let page = this.state.page;

          return (
              <div>
                  <Header 
                      navigate={this.navigate}
                      page={this.state.page}
                  />

                  {   // Spending Page
                      page === "Spending" && (
                          <Spending 
                              navigate={this.navigate} 
                          />  
                  )}

                  {   // Purhcases Page
                      page === "Purchases" && ( 
                          <Purchases 
                              navigate={this.navigate} 
                          /> 
                  )}
                
                  {   // Budget page
                      page === "Budget" &&  (
                          <Budget 
                          
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

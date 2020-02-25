import React, {Component} from 'react';
// Import the styles that will be applied in this component
import './App.css';
// Import the router-dom classes from the react-router-dom library
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Import the components that will be used in this file
import Header from './Header.js';
import Home from './Home.js';
import Ticket from './Ticket.js';
import Draw from './Draw.js';

// A class component that will act as the main component
class App extends Component {
  // A constructor for initialising values in this class
  constructor()
  {
    super();

    this.state = {ticket: []}
  }

  // A function for setting variables to empty
  clean = () => {
    this.setState({ticket: []});
  }

  // Use the lifecycle hook thats fired after a component is mounted
  componentDidMount()
  {
    this.clean();
  }

  // A function for handling the click event on the checkbox accessable in this app
  handleCheck(e) {

    // A condition for checking if a checkbox as been unclicked
    if(document.getElementById(e.target.id).checked === false)
    {
      let bag = [];

      // A function for removing values in an array when they have been unclciked
      bag = this.state.ticket.filter( val => {
        if(val !== e.target.value)
        {
          // Return a value to the array as a number type
          return parseInt(val);
        }
      });

      // Update the state variables with the new information
      this.setState({ticket: [...this.state.ticket, bag[0]]});
    }
    // A condition for checking if a checkbox is clicked by the user
    else if(document.getElementById(e.target.id).checked === true)
    {
      // A condition for checking if the user has not clicked up to five numbers yet
      if((this.state.ticket.length + 1) <= 5)
      {
        this.setState({ticket: [...this.state.ticket, parseInt(e.target.value)]});
      }
      else
      {
        alert("Only up to 5 numbers are accepted for a draw.")

        document.getElementById(e.target.id).checked = false;
      }
    }
  }

  // A function for checking if a number has not been added to the list of checked numbers
  findEntered = ticketVal =>
  {
    let num = this.state.ticket.find(val => {
      
      if(ticketVal === val)
      {
        return val
      }
    });

    return num;
  }

  // A function for warning the user of an invalid entry the switchiing to the Home component
  warning = () => {
    alert("Invalid ticket length. Required five numbers for a valid draw.");

    window.location.href = "/"
  }

  render()
  {
    return (
      <Router>
        <div id="app" className="container">
          <Header />
          <Route exact={true} path={'/'} component={Home}/>
          <Route path={'/Ticket'} render={props => <Ticket {...props} handleCheck={this.handleCheck.bind(this)} />}/>
          {/*A conditional routing statement thats executed if the clicked numbers is more than 0 or less than 6, give the user an alert message if failed*/}
          <Route path={'/Draw'} render={props => (this.state.ticket.length <= 5 && this.state.ticket.length > 0) ? <Draw {...props} ticket={this.state.ticket}/>: this.warning()}/>
          {/*A route used to exit the application by closing the the currently opened window*/}
          <Route path={'https://www.google.com/'} render={() => window.close()}/>
        </div>
      </Router>
    );
  }
}
// Export the App component to be useable on other files
export default App;

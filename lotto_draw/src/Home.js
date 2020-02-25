import React, {Component} from 'react';
// Import the styles for this component
import './Home.css';
// Import the navigator for nevigationg between previous and next component
import Nav from './Navigator.js';

// A class component that is exported at its declaration
export default class Home extends Component
{
	// A constructor for initialising object values
	constructor()
	{
		super();

		this.state = {prev: {address: 'https://www.google.com/', text: 'Exit'}, next: {address: '/Ticket', text: 'Play'}}
	}
	// A render method for returning elements to be rendered on the screen
	render()
	{
		return (
			<div className='row'>				
				<div className='col-sm-12'>
					<Guidelines />
					<Nav btnPrev={this.state.prev} btnNext={this.state.next}/>
				</div>
			</div>
		);
	}
}

function Guidelines()
{
	return (<p>LOTTO PLUS 1 is exactly the same as LOTTO, but gives the player a second chance to win. When buying a LOTTO ticket, the player must pay an extra R2.50 per board to enter the LOTTO PLUS 1 draw. Odds are the same, while prizes are usually slightly lower.	The draw is conducted on Wednesdays and Saturdays on SABC 2 at 20:56.</p>);
}
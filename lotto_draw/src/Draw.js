import React, {Component} from 'react';
// Import the styles applyed to this component
import './Draw.css';
// Import the images used on this component
import Wheel from './wheel.gif';
import Ball from './numberball.jpg';
import White from './white-ball.png';
// Import the navigation buttons to be used in this component
import Nav from './Navigator.js';

window.id = 0;
var store = [];
export default class Draw extends Component
{
	// A constructor for initialising values in this class
	constructor(props)
	{
		super(props);

		this.state = {buttons: {prev: {address: '/Ticket', text: 'Ticket'}, next: {address: '/', text: 'Exit'}}, drawBalls: []}
	}

	// A lifecycle hook thats fired when the state has been updated
	componentDidUpdate()
	{
		this.result()
	}

	// A function that takes in a variable as an arguement the use it to update the state object
	updateMyState = val =>
	{
		store = [];

		store.push(parseInt(val));

		this.setState({drawBalls: [...this.state.drawBalls, store]});
	}

	// A function for generating a unique id for the users ticket\
	result = () =>
	{
		// Use the date object to the the current date and time
		let date = new Date();

		let id = date.getDate() + "-" + date.getMonth() + "-" + window.id + date.getSeconds() + "-" + this.props.ticket.length;

		document.getElementById("results").innerHTML = "Ticket number: " + id + ".";
	}

	// A function for firing a function every given period of time then clearing the timer after a certain period
	handleDraw = () => {
		
		var timer = setInterval(this.numberBallLogic,1000);

		setTimeout(() => clearInterval(timer),5000);
	}

	// A function that generates randowm numbers then returns them to be used by other functions
	getNumbers = () => {

	    let ball = Math.floor(Math.random()* 16) + 1;

	    this.state.drawBalls.forEach((num) => {

	    	if(num[0] === ball)
	    	{
	    		// Incriment a number by one if it has already been drawn
	    		ball = num[0]+1;
	    	}
	    });
	    return ball;
	}

	// A function responsible for retrieving a number then sending it to a function for storing it on the state object
	numberBallLogic = () => {

		let val = this.getNumbers();

		this.updateMyState(val);
	}

	// A function simply for going back to the Ticket component
	reload = () => {
		this.setState({drawBalls: []});

		window.location.href = "/Ticket";
	}

	render()
	{
		return (
			<div className="row">
				<div id="mainStage" className="col-sm-12">
					<SpinningWheel />
					<h1 id="results">Results:</h1>
					<div id="drawTicket">
						{/*Map the randomly generated numbers as they are generated*/}
						{this.state.drawBalls.map((num, id) => 
							{return (<div id="drawBall" key={id++}>
						  		<img src={Ball} alt={num} className="rounded-circle"/>
						  		<div className="draw-block"> 
						    		<h2>{num}</h2>
						  		</div>
						  	</div>)})
						}
					</div>
					<br />
					<div id="buttons">
						<button id="draw" type="button" className="btn btn-success" onClick={this.handleDraw.bind(this)}>Draw</button>
						<button id="retry" type="button" className="btn btn-warning" disabled={false} onClick={this.reload.bind(this)}>Retry</button>
					</div>
					{/*The users ticket numbers mapped*/}
					<UserTicket ticket={this.props.ticket} />
					<Nav btnPrev={this.state.buttons.prev} btnNext={this.state.buttons.next} />
				</div>
			</div>
		);
	}
}

// A function that return the spinning wheel gif to be rendered
function SpinningWheel()
{
	return (
		<div id="wheelBlock">
			<img id="wheel" src={Wheel} alt="Spinning Wheel"/>
		</div>
	);	
}

// A function that returns the user ticket over images mapped to be rendered
function UserTicket(ticket)
{
	let ticketMap = ticket.ticket.map((num, id) => {
		return (
			<div id="numberBall" key={id++}>
			  <img src={White} alt={num}/>
			  <div className="text-block"> 
			    <h4>{num}</h4>
			  </div>
			</div>
		);
	});
	
	return (
		<div id="userTicket">
			{ticketMap}
		</div>
	);
}
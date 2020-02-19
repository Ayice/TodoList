import React, { Component } from 'react'

class Form extends Component {
	// Her laver vi en constructor til vores component, den skal ALTID have props med som parameter,
	// og skal altid have en super(props) inde i sig.
	// Her sætter vi en initialState, dette tilgår vores state, og gør ligesom den lyder. Sætter en state når vi kommer ind på componenten
	constructor(props) {
		super(props)

		this.initialState = {
			name: '',
			time: ''
		}
		// Sætter state til at være initialState
		this.state = this.initialState
	}

	// Her detecter vi hver gang brugeren skriver noget i vores input
	// og tager name og value, fra det input.
	handleChange = event => {
		const { name, value } = event.target
		// Her sætter vi state på det target vi har fra før. name er i [] for at React ved den skal kigge på vores const name
		// og ikke skal ændre state på et evt. item i state med navnet name.
		this.setState({
			[name]: value
		})
	}

	// Submit form her har vi event, som parameter. event er data vi får fra formen.
	submitForm = event => {
		event.preventDefault()

		// Tjekker om vores inputs er tomme
		if (this.state.time === '' || this.state.name === '') {
			// Hvis de er sender vi en alert om at der skal være noget data, og returner, så vi ikke "kører" videre
			return alert('You need to enter something')
		} else {
			// Hvis vi har data kalder vi vores props, som vi har fået fra App component, med den sender vi this.state
			// Her er vores inputs forskellige data.
			this.props.handleSubmit(this.state)
			// Her bruger vi initialState til at "tømme" de forskellige inputs.
			this.setState(this.initialState)
		}
	}

	render() {
		const { name, time } = this.state
		return (
			<form onSubmit={this.submitForm}>
				<fieldset>
					<legend>Add a stupid bitch</legend>

					<label>Name</label>
					{/* Value = name/time i state dette er for at vi kan tømme inputs senere */}
					<input type='text' name='name' id='name' value={name} placeholder='Enter name here' onChange={this.handleChange} />

					<label>time</label>
					<input type='text' name='time' id='time' value={time} placeholder='Enter time here' onChange={this.handleChange} />

					<button type='submit' value='Submit'>
						Submit
					</button>
				</fieldset>
			</form>
		)
	}
}

export default Form

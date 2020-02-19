import React, { Component } from 'react'

class Form extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			name: '',
			time: ''
		}

		this.state = this.initialState
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	submitForm = event => {
		event.preventDefault()
		if (this.state.time === '' || this.state.name === '') {
			return alert('You need to enter something')
		} else {
			this.props.handleSubmit(this.state)
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

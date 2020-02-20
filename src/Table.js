import React, { Component } from 'react'

/**
 * I denne fil har vi flere components, dette aner jeg ikke om er best practice,
 * but who cares ??
 */
class Table extends Component {
	render() {
		return (
			<table>
				{/* 
				Sender PROPS med vores components. Notér at vi ikke behøver en construcor
				for at tilgå props !!! 
				*/}
				<TableHeader headers={this.props.headerData} />
				<TableBody updateTodo={this.props.updateTodo} todoData={this.props.todoData} removeTodo={this.props.removeTodo} />
			</table>
		)
	}
}

// En functional component, med de props vi har sendt som parameter
const TableHeader = props => {
	// Sætter rows til at returne de forskellige table headers
	const rows = props.headers.map((title, index) => {
		// Husk en key for at React kan identificere hver enkelt
		return <th key={index}>{title}</th>
	})
	return (
		<thead>
			<tr>{rows}</tr>
		</thead>
	)
}

class TableBody extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			time: ''
		}
	}
	// Vores handleChange funktion bliver kørt hver gang vores input skifter.
	// Den er meget lig med funktionen i Form.js.
	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}
	// handleSubmit, bliver brugt når vi klikker knappen "Update".
	// Vi sender vores state (som vi satte i funktionen ovenover) og så sender vi eventet med.
	// I eventet har vi fx id'et som vi skal bruge senere
	handleSubmit = event => {
		/**
		 * Her referer vi til vores props og giver den et parameter.
		 * Vi emitter updateTodo så vores Table component kan gøre hvad den skal med updateTodo
		 * I dette tilfælde er det at sende data tilbage i en prop.
		 * Inde i App modtager vi dette og gør hvad vi skal. ( Ret smart :O )
		 */

		this.props.updateTodo(this.state, event)
	}

	render() {
		return (
			<tbody>
				{this.props.todoData.map((row, index) => {
					return (
						<tr key={row.id}>
							<td>
								<button
									// I React skal vi lave en funktion som så kører den funktion når vi laver inline events.
									// Eller ihvertfald, sådan det er nu :O
									onClick={() => {
										this.props.removeTodo(row.id)
									}}
								>
									Delete
								</button>

								<button
									type='submit'
									onClick={() => {
										this.handleSubmit(row.id)
									}}
								>
									Update
								</button>
							</td>
							<td>
								<p> {row.name} </p>
								<input type='text' name='name' placeholder='Enter name here' onChange={this.handleChange} />
							</td>

							<td>
								<p>{row.time} </p>
								<input type='text' name='time' placeholder='Enter time here' onChange={this.handleChange} />
							</td>
						</tr>
					)
				})}
			</tbody>
		)
	}
}

export default Table

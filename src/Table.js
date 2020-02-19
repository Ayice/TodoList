import React, { Component } from 'react'

class Table extends Component {
	render() {
		return (
			<table>
				<TableHeader headers={this.props.headerData} />
				<TableBody updateTodo={this.props.updateTodo} todoData={this.props.todoData} removeTodo={this.props.removeTodo} />
			</table>
		)
	}
}

const TableHeader = props => {
	const rows = props.headers.map((title, index) => {
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

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (event, id) => {
		this.props.updateTodo(this.state, event)
	}

	render() {
		const { name, time } = this.state
		return (
			<tbody>
				{this.props.todoData.map((row, index) => {
					return (
						<tr key={row.id}>
							<td>
								<button
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

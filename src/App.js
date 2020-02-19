import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

// import Api from './Api'
import fire from './firebase'

export default class App extends Component {
	state = {
		headers: ['', 'Todo', 'Time'],
		todos: []
	}

	componentDidMount() {
		this.getTodos()
	}

	getTodos = () => {
		fire.collection('todos').onSnapshot(result => {
			let items = []
			result.docs.map(doc => items.push({ id: doc.id, ...doc.data() }))
			this.setState({
				todos: items
			})
		})
	}

	removeTodo = index => {
		const { todos } = this.state

		this.setState({
			todos: todos.filter(todo => {
				if (index === todo.id) {
					fire
						.collection('todos')
						.doc(todo.id)
						.delete()
						.then(() => console.log('deleted'))
				}
				return todo.id !== index
			})
		})
	}

	handleSubmit = todos => {
		fire.collection('todos').add({
			name: todos.name,
			time: todos.time
		})
		this.setState({ todos: [...this.state.todos, todos] })
	}

	render() {
		const { todos, headers } = this.state

		return (
			<div className='container'>
				<Table removeTodo={this.removeTodo} todoData={todos} headerData={headers} />
				<Form handleSubmit={this.handleSubmit} />
			</div>
		)
	}
}

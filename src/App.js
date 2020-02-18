import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

// import Api from './Api'
import db from './firebase'

export default class App extends Component {
	state = {
		people: [],
		chatRooms: [],
		chatMessages: [],
		headers: ['', 'name', 'job']
	}

	getChatRooms = () => {
		db.collection('chatrooms')
			.get()
			.then(response => {
				console.log(response.docs[0])
				const chatrooms = response.docs.map(doc => doc.data())
				this.setState({
					chatRooms: chatrooms
				})
			})
	}

	getChatMsgs = () => {
		db.collection('chatrooms')
			.doc('Ft94EnGo2osVg6tSNjvt')
			.collection('messages')
			.get()
			.then(response => {
				console.log(response.docs)
				const chats = response.docs.map(doc => doc.data())
				this.setState({
					chatMessages: chats
				})
			})
	}

	removePerson = index => {
		const { people } = this.state

		this.setState({
			people: people.filter((person, idx) => {
				return idx !== index
			})
		})
	}

	handleSubmit = person => {
		this.setState({ people: [...this.state.people, person] })
	}

	render() {
		const { people, headers, chatRooms, chatMessages } = this.state

		const chats = chatRooms.map((entry, index) => {
			return <li key={index}>{entry.name}</li>
		})

		const msgs = chatMessages.map((entry, index) => {
			return <li key={index}>{entry.message}</li>
		})

		return (
			<div className='container'>
				<button onClick={this.getChatRooms}>Click me</button>
				<button onClick={this.getChatMsgs}>Messages</button>
				<Table removePerson={this.removePerson} peopleData={people} headerData={headers} />
				<Form handleSubmit={this.handleSubmit} />
				<ul>{chats}</ul>
				<ul>{msgs}</ul>
			</div>
		)
	}
}

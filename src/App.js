import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

// import Api from './Api'
import fire from './firebase'

export default class App extends Component {
	// Tilføj de forskellige ting vi skal bruge til vores state
	// Ting i state kan ændres, derfor bruges denne.

	state = {
		headers: ['', 'Todo', 'Time'],
		todos: []
	}

	// Noget vores component gør når den bliver initialized
	componentDidMount() {
		this.getTodos()
	}

	// Function til at hente vores todos
	getTodos = () => {
		/**
		 * fire bliver brugt igennem vores firebase.js fil og opretter forbindelse til databasen
		 * Herefter bruger vi Firebase Firecore metoder til at finde hvad vi skal have
		 * onSnapshot() bliver brugt, da den opretholder forbindelsen til databasen og
		 * lytter til om der sker nogle ændring i 'todos' collection
		 */
		fire.collection('todos').onSnapshot(result => {
			// Her laver vi et nyt array, som skal holde vores result fra db
			let items = []

			/**
			 *  Her bruger vi map() på vores result.docs. docs er noget vi kan finde i svaret fra databasen.
			 *  Prøv evt. at console.log(result.docs) for at se hvad vi får.
			 * Map er en funktion, som går igennem et array og gør det samme med alle elementer.
			 * Vi pusher alle resultater ind i items[], hvor vi giver det et id, for at vi nemt kan
			 * tilgå hvert element senere hen.
			 * '...' betyder at vi "bare" skubber resten af vores data ind.
			 * Hvis du console.log(doc.data()) inde i map() vil du kunne se at der er to forskellige key:value pairs
			 * disse bliver bare indsat i arrayet, uden at vi skal til at skrive name: doc.data().name og time: doc.data().time.
			 * derfor bruger vi de 3 punktummer. :)
			 */
			result.docs.map(doc => items.push({ id: doc.id, ...doc.data() }))
			// Her kommer vi tilbage til vores state fra før. Vi sætter state på todos til at være items[], hvor vi lige har pushet data ind i
			this.setState({
				todos: items
			})
		})
	}

	// Remove todos. Her har vi index som parameter for at vi kan sende et id med fra hvor funktionen bliver kaldt.
	removeTodo = index => {
		// Her tilgår vi vores state object fra før og "henter" todos
		const { todos } = this.state

		// SetState på vores todos
		this.setState({
			// Todos = en filter funktion på vores todos, filter() går igennem et array hvor den leder
			// efter en parameter som vi giver den.
			todos: todos.filter(todo => {
				// Her tjekker vi om der er nogle af vores todos som har det samme id, som det index parameter vi fik med fra funktions kaldet
				if (index === todo.id) {
					// Hvis der er det, kører vi en Firebase funktion, som før bare en delete.
					fire
						.collection('todos')
						.doc(todo.id)
						.delete()
						.then(() => console.log('deleted'))
				}
				// Hvis et elementet i arrayet ikke har det samme id, som index så bare return.
				return todo.id !== index
			})
		})
	}

	// Update todo, her skal vi be om at få en todo OG et id med fra funktionskaldet.
	updateTodo = (todo, id) => {
		// fra vores opdatering får vi "kun" todo.name og todo.time...
		// Derfor er vi nødt til også at få et id med, her sætter vi todo.id, til at være det id vi får med.
		todo.id = id

		// Fire update funktion, vi bruger todo.id til at finde dne todo, som skal opdateres i databasen.
		fire
			.collection('todos')
			.doc(todo.id)
			// Set vil opdatere en eller lave en document, hvis id'et er forkert, men det er det ikke ;)
			.set({
				name: todo.name,
				time: todo.time
			})
	}

	/**
	 * Handlesubmit her får vi todos, som parameter. Denne funktion bliver kaldt når Form sender et event "tilbage"
	 * Det de sender tilbage er "handleSubmit", som du kan se i Form tagget.
	 * Dette kaldes at emitte et event !
	 */
	handleSubmit = todos => {
		// Tilføjer dem todos til databasen
		fire.collection('todos').add({
			name: todos.name,
			time: todos.time
		})
	}

	render() {
		// Laver forskellige variabler baseret på vores state
		const { todos, headers } = this.state

		return (
			<div className='container'>
				{/* De ting vi sender med de forskellige componenter er props. */}
				<Table removeTodo={this.removeTodo} todoData={todos} headerData={headers} updateTodo={this.updateTodo} />
				<Form handleSubmit={this.handleSubmit} />
			</div>
		)
	}
}

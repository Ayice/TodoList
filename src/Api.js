import React, { Component } from 'react'

class Api extends Component {
	state = {
		apiKey: 'CruJyQfJcrWL2s6jYuui6ZDOn0IKLwKqWE0ZqLIe',
		apiData: []
	}

	componentDidMount() {
		const url = `https://api.nasa.gov/planetary/apod?api_key=${this.state.apiKey}`
		fetch(url)
			.then(response => response.json())
			.then(response =>
				this.setState({
					apiData: response
				})
			)
	}

	render() {
		const imgStyle = {
			width: '100%'
		}

		const { apiData } = this.state
		return (
			<div>
				<h1>{apiData.title}</h1>
				<img style={imgStyle} src={apiData.hdurl} alt={apiData.title}></img>
				<img style={imgStyle} src={apiData.url} alt={apiData.title}></img>
			</div>
		)
	}
}
export default Api

import React from 'react'

const Table = props => {
	const { peopleData, removePerson, headerData } = props

	return (
		<table>
			<TableHeader headers={headerData} />
			<TableBody peopleData={peopleData} removePerson={removePerson} />
		</table>
	)
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

const TableBody = props => {
	const rows = props.peopleData.map((row, index) => {
		return (
			<tr key={index}>
				<td>
					<button onClick={() => props.removePerson(index)}>Delete</button>
				</td>
				<td>{row.name}</td>
				<td>{row.job}</td>
			</tr>
		)
	})
	return <tbody>{rows}</tbody>
}

export default Table

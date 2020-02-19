import React from 'react'

const Table = props => {
	const { todoData, removeTodo, headerData } = props

	return (
		<table>
			<TableHeader headers={headerData} />
			<TableBody todoData={todoData} removeTodo={removeTodo} />
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
	const rows = props.todoData.map((row, index) => {
		return (
			<tr key={row.id}>
				<td>
					<button
						onClick={() => {
							props.removeTodo(row.id)
						}}
					>
						Delete
					</button>
				</td>
				<td>{row.name}</td>
				<td>{row.time}</td>
			</tr>
		)
	})
	return <tbody>{rows}</tbody>
}

export default Table

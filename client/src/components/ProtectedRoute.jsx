import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

class ProtectedRoute extends Component {
	render() {
		const { isAuthenticated, component: Component, ...routeProps } = this.props

		return (
			<>
				{isAuthenticated ? (
					<Component {...routeProps} />
				) : (
					<Navigate to='/login' />
				)}
			</>
		)
	}
}

export default ProtectedRoute

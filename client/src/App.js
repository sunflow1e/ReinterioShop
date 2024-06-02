import axios from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartPage from './pages/CartPage'
import CataloguePage from './pages/CataloguePage'
import ContactsPage from './pages/ContactsPage'
import DelieveryPage from './pages/DelieveryPage'
import FavouritePage from './pages/FavourtePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NoPage from './pages/NoPage'
import PolicyPage from './pages/PolicyPage'
import { ProductPage } from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import RegistrationPage from './pages/RegistrationPage'
import ReturnProductsPage from './pages/ReturnProductsPage'

//Авторизованные роутинги
import ProtectedRoute from './components/ProtectedRoute'
import OrderingPage from './pages/OrderingPage'
import GratitudePage from './pages/GratitudePage'
import MyOrdersPage from './pages/MyOrdersPage'
import ReviewsPage from './pages/ReviewsPage'
import SearchPage from './pages/SearchPage'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loggeduser_id: null,
			isAuthenticated: false,
			products: [],

			categories: [],
			cartproducts: [],
			current_user: [],
		}
	}

	componentDidMount() {
		this.getCategories()
		this.checkAuth()
		this.getProductCards()
	}

	getCategories() {
		const requestOptions = {
			method: 'GET',
		}

		fetch(`${process.env.REACT_APP_API_URL}/category`, requestOptions)
			.then(response => response.json())
			.then(result => this.setState({ categories: result }))
			.catch(error => console.error(error))

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/category/`,
			headers: {},
		}

		axios
			.request(config)
			.then(response => {
				console.log(JSON.stringify(response.data))
			})
			.catch(error => {
				console.log(error)
			})
	}

	checkAuth() {
		const userId = localStorage.getItem('userId')
		if (userId) {
			this.setState({ isAuthenticated: !!userId }, () => {
				this.getCurrentUser(userId)
			})
			this.setState({ loggeduser_id: userId }, () => {
				console.log(userId)
			})
		}
	}

	getCurrentUser(user_id) {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/user/:id`,
			headers: {
				id: user_id,
			},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ current_user: response.data }, () => {
					console.log(response.data)
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	getProductCards() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/product/cards/`,
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ products: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Routes>
						<Route
							index
							element={
								<HomePage
									user_id={this.state.loggeduser_id}
									categories={this.state.categories}
									cartproducts={this.state.cartproducts}
									onAdd={this.addToCart}
									onDelete={this.deleteFromCart}
								/>
							}
						></Route>
						<Route
							path='/home'
							element={
								<HomePage
									user_id={this.state.loggeduser_id}
									onCountChange={this.changeCountCart}
									onSelectedChange={this.changeSelectedCart}
									products={this.state.products}
									categories={this.state.categories}
									cartproducts={this.state.cartproducts}
									onAdd={this.addToCart}
									onDelete={this.deleteFromCart}
								/>
							}
						/>
						<Route
							path='/cart'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={CartPage}
									user_id={this.state.loggeduser_id}
									onDelete={this.deleteFromCart}
								/>
							}
						/>

						<Route
							path='/ordering'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={OrderingPage}
									user_id={localStorage.getItem('userId')}
									user={this.state.current_user}
								/>
							}
						/>

						<Route
							path='/reviews'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ReviewsPage}
									user_id={localStorage.getItem('userId')}
									user={this.state.current_user}
								/>
							}
						/>

						<Route
							path='/myorders'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={MyOrdersPage}
									user_id={localStorage.getItem('userId')}
									user={this.state.current_user}
								/>
							}
						/>

						<Route
							path='/gratitude'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={GratitudePage}
								/>
							}
						/>

						<Route
							path='/favourite'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={FavouritePage}
									user_id={this.state.loggeduser_id}
								/>
							}
						/>
						<Route
							path='/catalogue'
							element={<CataloguePage user_id={this.state.loggeduser_id} />}
						/>
						<Route
							path='/search'
							element={<SearchPage user_id={this.state.loggeduser_id} />}
						/>
						<Route
							path='/profile'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ProfilePage}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/product/:product_id'
							element={<ProductPage user_id={this.state.loggeduser_id} />}
						/>

						<Route path='/policy' element={<PolicyPage />} />
						<Route path='/delievery' element={<DelieveryPage />} />
						<Route path='/contacts' element={<ContactsPage />} />
						<Route path='/return' element={<ReturnProductsPage />} />

						<Route path='/registration' element={<RegistrationPage />} />
						<Route path='/login' element={<LoginPage />} />

						<Route path='*' element={<NoPage />} />
					</Routes>
				</BrowserRouter>
			</div>
		)
	}
}

export default App

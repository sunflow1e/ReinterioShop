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
import ADMINShop from './pages/ADMINShop'
import ADMINNewUser from './pages/ADMINNewUser'
import ADMINOrders from './pages/ADMINOrders'
import ADMIN_EDIT_status from './pages/ADMIN_EDIT_status'
import ADMIN_EDIT_delivery from './pages/ADMIN_EDIT_delivery'
import ADMINProducts from './pages/ADMINProducts'
import ADMIN_EDIT_styles from './pages/ADMIN_EDIT_styles'
import ADMIN_EDIT_shapes from './pages/ADMIN_EDIT_shapes'
import ADMIN_EDIT_materials from './pages/ADMIN_EDIT_material'
import ADMIN_EDIT_category from './pages/ADMIN_EDIT_category'
import ADMIN_ADD_product from './pages/ADMIN_ADD_product'
import ADMIN_ADDNEWPRODUCT from './pages/ADMIN_ADDNEWPRODUCT'

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
							path='/admin/shop'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMINShop}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/add_user'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMINNewUser}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/orders'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMINOrders}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/products'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMINProducts}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/edit/status'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_EDIT_status}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/edit/delivery'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_EDIT_delivery}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/edit/style'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_EDIT_styles}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/edit/shape'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_EDIT_shapes}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/edit/material'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_EDIT_materials}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/edit/category'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_EDIT_category}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/product/edit/:product_id'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_ADD_product}
									user={this.state.current_user[0]}
								/>
							}
						/>

						<Route
							path='/admin/product/add/'
							element={
								<ProtectedRoute
									isAuthenticated={!!localStorage.getItem('userId')}
									component={ADMIN_ADDNEWPRODUCT}
									user={this.state.current_user[0]}
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

						<Route path='/policy' element={<PolicyPage user={this.state.current_user[0]} />} />
						<Route path='/delievery' element={<DelieveryPage user={this.state.current_user[0]} />} />
						<Route path='/contacts' element={<ContactsPage user={this.state.current_user[0]} />} />
						<Route path='/return' element={<ReturnProductsPage user={this.state.current_user[0]} />} />

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

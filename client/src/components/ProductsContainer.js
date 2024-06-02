import axios from 'axios'
import React, { Component } from 'react'
import ProductCard from './ProductCard'

export class ProductsContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			filterproducts: [],
			favproducts: [],
			cartproducts: [],
		}
		this.getProductCards = this.getProductCards.bind(this)
		this.getFavouriteProductCards = this.getFavouriteProductCards.bind(this)
		this.getCartProductCards = this.getCartProductCards.bind(this)

		this.setFavouiteCartCards = this.setFavouiteCartCards.bind(this)
	}

	componentDidMount() {
		this.getProductCards()
		this.getFavouriteProductCards()
		this.getCartProductCards()
	}

	componentDidUpdate() {
		this.setFavouiteCartCards()
	}

	getProductCards() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/product/cards`,
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ products: response.data }); this.setState({ filterproducts: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getCartProductCards() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/product/cart/` +
				Number.parseInt(localStorage.getItem('userId')),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ cartproducts: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getFavouriteProductCards() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/product/favourite/` +
				Number.parseInt(localStorage.getItem('userId')),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ favproducts: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	setFavouiteCartCards() {
		let allproducts = this.state.products
		let favouriteproducts = this.state.favproducts
		let crtproducts = this.state.cartproducts

		for (let i = 0; i < allproducts.length; i++) {
			for (let j = 0; j < favouriteproducts.length; j++) {
				if (favouriteproducts[j].productd_id === allproducts[i].productd_id) {
					allproducts[i].product_addedtofavourite = true
				}
			}
		}

		for (let i = 0; i < allproducts.length; i++) {
			for (let j = 0; j < crtproducts.length; j++) {
				if (crtproducts[j].productd_id === allproducts[i].productd_id) {
					allproducts[i].product_addedtocart = true
				}
			}
		}
	}

	render() {
		const prods = this.state.filterproducts;


		let all_products = this.state.products
		let filter_products = this.state.filterproducts

		const styles = JSON.parse(localStorage.getItem('styles'));

		//search
		const search = localStorage.getItem('search');
		filter_products = filter_products.filter(a => (a.product_name.toLowerCase().includes(search.toLowerCase()) || String(a.product_article).toLowerCase().includes(search.toLowerCase())))

		//price
		const price = localStorage.getItem('price');

		if (Number.parseInt(price) === 1){
			filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) < 10000)
		}
		if (Number.parseInt(price) === 2){
			filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) < 50000 && Number.parseInt(a.product_disc_price) > 10000)
		}
		if (Number.parseInt(price) === 3){
			filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) < 100000 && Number.parseInt(a.product_disc_price) > 50000)
		}
		if (Number.parseInt(price) === 4){
			filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) > 100000)
		}
		
		console.log(price)

		return (
			<div>
				{Object.keys(filter_products).length > 0 ? (
					<div class='ProductsContainer'>
						{filter_products?.map(CurrentProduct => (
							<ProductCard
								key={CurrentProduct.productd_id}
								user_id={localStorage.getItem('userId')}
								product={CurrentProduct}
								onChange={() => this.getProductCards()}
							/>
						))}
					</div>
				) : (
					<div class='PageContent'>
						<div class='CartCardsContainer'>
							<div
								style={{ flexDirection: 'column', gap: '5px' }}
								class='CartCard'
							>
								<p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
									Ничего не найдено
								</p>
								<p style={{ marginBottom: '20px' }} className='PageCardText'>
									Измените запрос и попробуйте еще раз{' '}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default ProductsContainer

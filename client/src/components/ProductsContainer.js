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
		if (this.props.filter) {
			this.getProductCardsFilter()
		}
		else if (this.props.admin){
			this.getProductCardsAdmin()
		}
		else{
			this.getProductCards()
		}
		if (this.props.user){
			this.getFavouriteProductCards()
			this.getCartProductCards()
		}
	}

	componentDidUpdate() {
		this.setFavouiteCartCards()
	}

	getProductCardsAdmin() {

		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/admin/product/cards/`,
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

	getProductCardsFilter() {
		//ПОДКАТЕГОРИИ ✅

		let subcategories = JSON.parse(localStorage.getItem('subcategories'));
		if (subcategories) {
			subcategories = subcategories.filter(item => item.subcategory_ischecked === true)
		}

		let subcategoriesQueryString = ' AND (';

		if (subcategories) {
			for (let index = 0; index < subcategories.length; index++) {
				if (index !== 0) {
					subcategoriesQueryString += ' OR '
				}
				subcategoriesQueryString += `subcategory_name = '` + subcategories[index].subcategory_name + `'`;
			}
		}

		subcategoriesQueryString += ')'

		if (!subcategories || subcategories?.length < 1) {
			subcategoriesQueryString = '';
		}

		//ЦВЕТА ✅

		let colors = JSON.parse(localStorage.getItem('colors'));
		if (colors) {
			colors = colors.filter(item => item.color_ischecked === true)
		}

		let colorsQueryString = ' AND (';

		if (colors) {
			for (let index = 0; index < colors.length; index++) {
				if (index !== 0) {
					colorsQueryString += ' OR '
				}
				colorsQueryString += `color_name = '` + colors[index].color_name + `'`;
			}
		}

		colorsQueryString += ')'

		if (!colors || colors?.length < 1) {
			colorsQueryString = '';
		}

		//СТИЛИ ✅

		let styles = JSON.parse(localStorage.getItem('styles'));
		if (styles) {
			styles = styles.filter(item => item.style_ischecked === true)
		}

		let stylesQueryString = ' AND (';

		if (styles) {
			for (let index = 0; index < styles.length; index++) {
				if (index !== 0) {
					stylesQueryString += ' OR '
				}
				stylesQueryString += `style_name = '` + styles[index].style_name + `'`;
			}
		}

		stylesQueryString += ')'

		if (!styles || styles?.length < 1) {
			stylesQueryString = '';
		}

		const QueryString = subcategoriesQueryString + colorsQueryString + stylesQueryString;

		console.log(QueryString)

		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/product/cards/` + QueryString,
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ products: response.data }); this.setState({ filterproducts: response.data });
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

		console.log(this.state.filterproducts)

		const prods = this.state.filterproducts;

		let all_products = this.state.products
		let filter_products = this.state.filterproducts

		filter_products = [...new Map(filter_products.map((item) => [item["productd_id"], item])).values(),
		];

		if (this.props.filter === true) {
			//search
			const search = localStorage.getItem('search');
			if (search) {
				filter_products = filter_products.filter(a => (a.product_name.toLowerCase().includes(search.toLowerCase()) || String(a.product_article).toLowerCase().includes(search.toLowerCase())))
			}

			//price
			const price = localStorage.getItem('price');

			if (Number.parseInt(price) === 1) {
				filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) < 10000)
			}
			if (Number.parseInt(price) === 2) {
				filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) < 50000 && Number.parseInt(a.product_disc_price) > 10000)
			}
			if (Number.parseInt(price) === 3) {
				filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) < 100000 && Number.parseInt(a.product_disc_price) > 50000)
			}
			if (Number.parseInt(price) === 4) {
				filter_products = filter_products.filter(a => Number.parseInt(a.product_disc_price) > 100000)
			}
		}

		return (
			
			<div>
				{Object.keys(filter_products).length > 0 ? (
					<div class='ProductsContainer'>
						{filter_products?.map(CurrentProduct => (
							<ProductCard
								admin={this.props.admin}
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

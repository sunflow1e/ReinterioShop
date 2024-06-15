import axios from 'axios'
import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PPCard from '../components/PPCard'
import PPFiles from '../components/PPFiles'
import PPReviews from '../components/PPReviews'

export class ProductPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			product: [],
			favproduct: [],
			cartproduct: [],
			images: [],
			colors: [],
			styles: [],
			materials: [],
			files: [],
			reviews: [],
			rating: [],
			ProdId: window.location.href.split('/')[4],
		}
	}

	componentDidMount() {
		this.getProduct()
		this.getFavourite()
		this.getCart()
		this.getImages()
		this.getColors()
		this.getStyles()
		this.getMaterials()
		this.getFiles()
		this.getReviews()
		this.getRating()
	}

	componentDidUpdate() {
		this.setFavouiteCartCards()
	}

	getProduct() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/product/` + Number.parseInt(this.state.ProdId),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ product: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getImages() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/product/images/` +
				Number.parseInt(this.state.ProdId),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ images: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getReviews() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/pp/reviews/` +
				Number.parseInt(this.state.ProdId),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ reviews: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getRating() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/pp/rating/` +
				Number.parseInt(this.state.ProdId),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ rating: response.data })
			})
			.catch(error => {
				console.log(error)
			})

	}

	getFavourite() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/product/favourite/` +
				this.state.ProdId +
				'/' +
				localStorage.getItem('userId'),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ favproduct: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getCart() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/product/cart/` +
				this.state.ProdId +
				'/' +
				localStorage.getItem('userId'),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ cartproduct: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getColors() {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/colors`,
			headers: {},
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ colors: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getStyles() {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/pp/styles/` + Number.parseInt(this.state.ProdId),
			headers: {},
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ styles: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getMaterials() {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/pp/materials/` +
				Number.parseInt(this.state.ProdId),
			headers: {},
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ materials: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	getFiles() {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/pp/files/` + Number.parseInt(this.state.ProdId),
			headers: {},
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ files: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	setFavouiteCartCards() {
		let allproducts = this.state.product
		let favouriteproducts = this.state.favproduct
		let crtproducts = this.state.cartproduct

		for (let i = 0; i < allproducts.length; i++) {
			for (let j = 0; j < favouriteproducts.length; j++) {
				if (
					favouriteproducts[j].favourite_product === allproducts[i].productd_id
				) {
					allproducts[i].product_addedtofavourite = true
				}
			}
		}

		for (let i = 0; i < allproducts.length; i++) {
			for (let j = 0; j < crtproducts.length; j++) {
				if (crtproducts[j].cart_product === allproducts[i].productd_id) {
					allproducts[i].product_addedtocart = true
				}
			}
		}
	}

	render() {
		let rating = this.state.rating

		if (rating[0]) {
			rating = rating[0].rating
		}

		return (
			<div class='PPContent'>
				{this.state.product?.map(CurrentProduct => (
					<PPCard
						key={CurrentProduct.productd_id}
						materials={this.state.materials}
						styles={this.state.styles}
						product={CurrentProduct}
						allcolors={this.state.colors}
						images={this.state.images}
						rating={this.state.rating}
						user_id={localStorage.getItem('userId')}
					/>
				))}

				{this.state.files?.length > 0 && (
					<div className='ProductPageColumnContainer'>
						<h1 className='ProductPageTitle'>Инструкции и файлы</h1>
						<div className='AllFilesContainer'>
							{this.state.files?.map(CurrentFile => (
								<PPFiles key={CurrentFile.file_id} files={CurrentFile} />
							))}
						</div>
					</div>
				)}

				{this.state.reviews?.length > 0 && (
					<div className='ProductPageColumnContainer'>
						<h1 className='ProductPageTitle'>Отзывы о товаре</h1>
						<p className='PageCardText'>{'★ ' + Number.parseFloat(rating).toFixed(1) + ' / 5 '}
							<p style={{ color: "#B4A39A" }}>{this.state.reviews.length + ' отзывов'}</p>
						</p>
						<div className='OrderContainerLilCard'>
							{this.state.reviews?.map(review => (
								<PPReviews key={review.review_id} review={review} />
							))}
						</div>
					</div>
				)}

				{!this.state.reviews?.length > 0 && (
					<div className='ProductPageColumnContainer'>
						<h1 className='ProductPageTitle'>Отзывы о товаре</h1>
						<p className='PageCardText'>Этот товар пока никто не купил. Будьте первыми!</p>
					</div>
				)}

				<div></div>
				<div></div>
				<Header />
				<Footer />
			</div>
		)
	}
}

export default ProductPage

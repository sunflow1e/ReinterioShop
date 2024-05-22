import axios from 'axios'
import React, { Component } from 'react'

export class ProductCard extends Component {
	constructor(props) {
		super(props)
		this.DeleteFromFavouriteButton = this.DeleteFromFavouriteButton.bind(this)
		this.state = {
			IsAddedToFav: false,
			IsAddedToCart: false,
		}
	}

	DeleteFromFavouriteButton() {
		this.props.DeleteFromFav()
	}

	componentDidMount() {
		this.setState({ IsAddedToFav: this.props.product.product_addedtofavourite })
		this.setState({ IsAddedToCart: this.props.product.product_addedtocart })
	}

	render() {
		return (
			<div class='ProductsCard'>
				{this.props.product.product_discount !== 0 && (
					<div class='Pdiscount'>
						{' '}
						{'-' + this.props.product.product_discount + '%'}{' '}
					</div>
				)}
				<a href={'/product/' + this.props.product.productd_id}>
					<div className='PCardImgContainer'>
						<img
							class='PCardImg'
							src={'./img/' + this.props.product.image_path}
							alt=''
						></img>
					</div>
				</a>
				<div
					onClick={() =>
						localStorage.getItem('userId')
							? (!this.state.IsAddedToFav
									? this.addToFavourite(this.props.product)
									: this.deleteFromFavourite(this.props.product),
							  this.props.DeleteFromFav
									? this.props.DeleteFromFav(this.props.product.productd_id)
									: null)
							: (window.location.href = '/login')
					}
					class='PToFavourite'
				>
					{this.state.IsAddedToFav ? (
						<i style={{ color: 'white' }} class='fi fi-sr-heart'></i>
					) : (
						<i class='fi fi-rr-heart'></i>
					)}
				</div>

				<div class='PCardInfo'>
					<div
						onClick={() =>
							localStorage.getItem('userId')
								? !this.state.IsAddedToCart
									? this.addToCart(this.props.product)
									: this.deleteFromCart(this.props.product)
								: (window.location.href = '/login')
						}
						class={this.state.IsAddedToCart ? 'PAddToCartTrue' : 'PAddToCart'}
					>
						{this.state.IsAddedToCart ? 'Добавлено' : 'В корзину'}
					</div>

					<div class='PNamePrice'>
						<p class='ProductName'>
							<h class='CardText'>{this.props.product.product_name}</h>
						</p>
						<div class='PPrice'>
							<a class='ProductPrice'>
								<h class='CardText'>
									{new Intl.NumberFormat().format(
										this.props.product.product_price
									) + ' ₽'}
								</h>
							</a>
							{this.props.product.product_discount > 0 && (
								<a class='ProductsPriceBefore'>
									{new Intl.NumberFormat().format(
										this.props.product.product_disc_price
									) + ' ₽'}
								</a>
							)}
						</div>
					</div>
					{(this.props.product_discount === null ||
						this.props.product_discount === 0) && (
						<p class='PRating'>
							<h class='CardText'>★ {this.props.product.ProductRating}</h>
						</p>
					)}
				</div>
			</div>
		)
	}

	addToFavourite(prod) {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('user', this.props.user_id)
		urlencoded.append('product', prod.productd_id)

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		}

		fetch(`${process.env.REACT_APP_API_URL}/favourite`, requestOptions)
			.then(response => response.text())
			.then(result => {
				this.setState({ IsAddedToFav: true })
			})
			.catch(error => console.error(error))
	}

	deleteFromFavourite(prod) {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('user', localStorage.getItem('userId'))
		urlencoded.append('product', prod.productd_id)

		const requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		}

		fetch(`${process.env.REACT_APP_API_URL}/favourite`, requestOptions)
			.then(response => response.text())
			.then(result => {
				this.setState({ IsAddedToFav: false })
			})
			.catch(error => console.error(error))
	}

	//// CART

	addToCart(prod) {
		const qs = require('qs')
		let data = qs.stringify({
			user: this.props.user_id,
			product: prod.productd_id,
			count: 1,
		})

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/cart`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				{
					this.setState({ IsAddedToCart: true })
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	deleteFromCart(prod) {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('user', this.props.user_id)
		urlencoded.append('product', prod.productd_id)

		const requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		}

		fetch(`${process.env.REACT_APP_API_URL}/cart`, requestOptions)
			.then(response => response.text())
			.then(result => {
				this.setState({ IsAddedToCart: false })
			})
			.catch(error => console.error(error))
	}
}

export default ProductCard

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
			<div className='ProductsCard'>
				{this.props.product.product_discount !== 0 && (
					<div className='Pdiscount'>
						{' '}
						{'-' + this.props.product.product_discount + '%'}{' '}
					</div>
				)}
				<a href={'/product/' + this.props.product.productd_id}>
					<div className='PCardImgContainer'>
						<img
							className='PCardImg'
							src={'/img/' + this.props.product.image_path}
							alt=''
						></img>
					</div>
				</a>

				{!this.props.admin &&
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
						className='PToFavourite'
					>
						{this.state.IsAddedToFav ? (
							<i style={{ color: 'white' }} className='fi fi-sr-heart'></i>
						) : (
							<i className='fi fi-rr-heart'></i>
						)}
					</div>
				}

				<div className='PCardInfo'>
					{!this.props.admin &&
						<div
							onClick={() =>
								localStorage.getItem('userId')
									? !this.state.IsAddedToCart
										? this.addToCart(this.props.product)
										: this.deleteFromCart(this.props.product)
									: (window.location.href = '/login')
							}
							className={this.state.IsAddedToCart ? 'PAddToCartTrue' : 'PAddToCart'}
						>
							{this.state.IsAddedToCart ? 'Добавлено' : 'В корзину'}
						</div>
					}

					{this.props.admin &&
						<div onClick={() => this.openEditPage()} className={'PAddToCartTrue'}>Редактировать</div>
					}

					<div className='PNamePrice'>
						<p className='ProductName'>
							<h className='CardText'>{this.props.product.product_name}</h>
						</p>
						<div className='PPrice'>
							<p className='ProductPrice'>
								<p className='CardText' style={{whiteSpace: "nowrap"}}>
									{new Intl.NumberFormat().format(
										this.props.product.product_disc_price
									) + ' ₽'}
								</p>
							</p>
							{this.props.product.product_discount > 0 && (
								<p className='ProductsPriceBefore' style={{whiteSpace: "nowrap"}}>
									{new Intl.NumberFormat().format(
										this.props.product.product_price
									) + ' ₽'}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}

	openEditPage() {
		window.location.href = '/admin/product/edit/' + this.props.product.product_id
	}

	addToFavourite(prod) {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('user', localStorage.getItem('userId'))
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
			user: localStorage.getItem('userId'),
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
		urlencoded.append('user', localStorage.getItem('userId'))
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

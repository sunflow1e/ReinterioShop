import axios from 'axios'
import React, { Component } from 'react'
import ColorsContainter from './ColorsContainter'

export class PPCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			IsAddedToFavoutire: false,
			IsAddedToCart: true,
			CurrentImage: null,
		}
	}

	componentDidMount() {
		this.setState({ IsAddedToFav: this.props.product.product_addedtofavourite })
		this.setState({ IsAddedToCart: this.props.product.product_addedtocart })
		this.setState({ CurrentImage: this.props.product.image_path })
	}

	render() {
		return (
			<div className='ProductPageContainer'>
				<div className='ProductPageImagesContainer'>
					<div className='ProductPageSmallImagesContainer'>
						{this.props.images[0] && (
							<div
								onMouseEnter={() =>
									this.setState({
										CurrentImage: this.props.images[0].image_path,
									})
								}
								className='ProductPageSmallImage'
								style={{
									backgroundImage:
										'url(/img/' + this.props.images[0].image_path,
								}}
							></div>
						)}
						{this.props.images[1] && (
							<div
								onMouseEnter={() =>
									this.setState({
										CurrentImage: this.props.images[1].image_path,
									})
								}
								className='ProductPageSmallImage'
								style={{
									backgroundImage:
										'url(/img/' + this.props.images[1].image_path,
								}}
							></div>
						)}
						{this.props.images[2] && (
							<div
								onMouseEnter={() =>
									this.setState({
										CurrentImage: this.props.images[2].image_path,
									})
								}
								className='ProductPageSmallImage'
								style={{
									backgroundImage:
										'url(/img/' + this.props.images[2].image_path,
								}}
							></div>
						)}
						{this.props.images[3] && (
							<div
								onMouseEnter={() =>
									this.setState({
										CurrentImage: this.props.images[3].image_path,
									})
								}
								className='ProductPageSmallImage'
								style={{
									backgroundImage:
										'url(/img/' + this.props.images[3].image_path,
								}}
							></div>
						)}
						{this.props.images[4] && (
							<div
								onMouseEnter={() =>
									this.setState({
										CurrentImage: this.props.images[4].image_path,
									})
								}
								className='ProductPageSmallImage'
								style={{
									backgroundImage:
										'url(/img/' + this.props.images[4].image_path,
								}}
							></div>
						)}
					</div>

					<div
						onClick={() => (
							localStorage.getItem("userId") ?
								(!this.state.IsAddedToFav
									? this.addToFavourite(this.props.product)
									: this.deleteFromFavourite(this.props.product),
									this.props.DeleteFromFav
										? this.props.DeleteFromFav(this.props.product.productd_id)
										: null)
								:
								(window.location.href = '/login')
						)}
						class='ProductPageToFavourite'
					>
						{this.state.IsAddedToFav ? (
							<i style={{ color: 'white' }} class='fi fi-sr-heart'></i>
						) : (
							<i class='fi fi-rr-heart'></i>
						)}
					</div>

					<img
						className='ProductPageMainImage'
						src={'/img/' + this.state.CurrentImage}
					></img>
				</div>

				<div className='MobileProductImagesContainer'>
					{this.props.images[0] && (
						<div
							onMouseEnter={() =>
								this.setState({ CurrentImage: this.props.images[0].image_path })
							}
							className='ProductPageMobileImage'
							style={{
								backgroundImage: 'url(/img/' + this.props.images[0].image_path,
							}}
						></div>
					)}
					{this.props.images[1] && (
						<div
							onMouseEnter={() =>
								this.setState({ CurrentImage: this.props.images[1].image_path })
							}
							className='ProductPageMobileImage'
							style={{
								backgroundImage: 'url(/img/' + this.props.images[1].image_path,
							}}
						></div>
					)}
					{this.props.images[2] && (
						<div
							onMouseEnter={() =>
								this.setState({ CurrentImage: this.props.images[2].image_path })
							}
							className='ProductPageMobileImage'
							style={{
								backgroundImage: 'url(/img/' + this.props.images[2].image_path,
							}}
						></div>
					)}
					{this.props.images[3] && (
						<div
							onMouseEnter={() =>
								this.setState({ CurrentImage: this.props.images[3].image_path })
							}
							className='ProductPageMobileImage'
							style={{
								backgroundImage: 'url(/img/' + this.props.images[3].image_path,
							}}
						></div>
					)}
					{this.props.images[4] && (
						<div
							onMouseEnter={() =>
								this.setState({ CurrentImage: this.props.images[4].image_path })
							}
							className='ProductPageMobileImage'
							style={{
								backgroundImage: 'url(/img/' + this.props.images[4].image_path,
							}}
						></div>
					)}
				</div>

				<div className='ProductPageInfoContainer'>
					<div className='ProductPageTitlePriceContainer'>
						<div className='ProductPageTitleContainer'>
							<h1 className='ProductPageTitle'>
								{this.props.product.product_name}
							</h1>
							{this.props.rating[0] &&
								<p className='RatingText'>{new Intl.NumberFormat().format(this.props.rating[0].rating) != 0 ? '★ ' + Number.parseFloat(this.props.rating[0].rating).toFixed(1) : ''}</p>
							}
						</div>

						<div className='ProductPriceContainer'>
							<h1 className='ProductPageTitle'>
								{new Intl.NumberFormat().format(
									this.props.product.product_disc_price
								) + ' ₽'}
							</h1>
							<div className='ProductPageDicountContainer'>
								{this.props.product.product_discount > 0 && (
									<p
										style={{ fontSize: '20px' }}
										className='ProductsPriceBefore'
									>
										{new Intl.NumberFormat().format(
											this.props.product.product_price
										) + ' ₽'}
									</p>
								)}
								{this.props.product.product_discount > 0 && (
									<p className='CartCardDiscount'>
										{'-' + this.props.product.product_discount + ' %'}
									</p>
								)}
							</div>
							{
								this.props.product.productd_onstock > 0 && <div
									onClick={() =>
										localStorage.getItem('userId')
											? !this.state.IsAddedToCart
												? this.addToCart(this.props.product)
												: this.deleteFromCart(this.props.product)
											: (window.location.href = '/login')
									}
									class={
										this.state.IsAddedToCart
											? 'ProductPageAddedToCart'
											: 'ProductPageAddToCart'
									}
								>
									{this.state.IsAddedToCart ? 'В корзине!' : 'Добавить в корзину'}
								</div>

							}
							{
								this.props.product.productd_onstock < 1 && <div
									class={'ProductPageNoProduct'}>
									Товар закончился
								</div>

							}
						</div>
					</div>
					<ColorsContainter
						CurrentColor={this.props.product.color_name}
						allcolors={this.props.allcolors.filter(
							a => a.product_id == this.props.product.product_id
						)}
					/>
					<div className='ProductPageCharacteristicsContainer'>
						<div className='ProductPageCharacteristicsTitles'>
							<div
								style={{ whiteSpace: 'nowrap' }}
								className='ProductPageCharacteristicsTitle'
							>
								В наличии<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Артикул<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Длина<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Ширина<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Высота<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Вес<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Форма<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Материал<div className='DottedLine'></div>
							</div>
							<div className='ProductPageCharacteristicsTitle'>
								Стиль<div className='DottedLine'></div>
							</div>
						</div>

						<div className='ProductPageCharacteristicsInfos'>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.productd_onstock}
							</p>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.product_article}
							</p>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.product_length + ' см.'}
							</p>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.product_width + ' см.'}
							</p>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.product_height + ' см.'}
							</p>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.product_weight + ' кг.'}
							</p>
							<p className='ProductPageCharacteristicsTitle'>
								{this.props.product.shape_name}
							</p>
							{this.props.materials?.map(cs => (
								<p className='ProductPageCharacteristicsTitle'>
									{cs.product_materials}
								</p>
							))}
							{this.props.styles?.map(cs => (
								<p className='ProductPageCharacteristicsTitle'>
									{cs.product_styles}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		)
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

export default PPCard

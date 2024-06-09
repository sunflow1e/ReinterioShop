import axios from 'axios'
import React, { Component } from 'react'
import CartProductContainer from '../components/CartProductContainer'
import Footer from '../components/Footer'
import Header from '../components/Header'

export class CartPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cart_products: [],
			favproducts: [],
			IsModalShown: false,
		}
		this.changeCountCart = this.changeCountCart.bind(this)
		this.changeSelectedCart = this.changeSelectedCart.bind(this)
		this.deleteProductFromCart = this.deleteProductFromCart.bind(this)
	}

	componentDidMount() {
		this.getCartProductCards()
		this.getFavouriteProductCards()
	}

	componentDidUpdate() {
		this.setFavouiteCartCards()
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
				this.setState({ cart_products: response.data })
			})
			.catch(error => {
				console.log(error)
			})

		this.forceUpdate()
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
		let allproducts = this.state.cart_products
		let favouriteproducts = this.state.favproducts

		for (let i = 0; i < allproducts.length; i++) {
			for (let j = 0; j < favouriteproducts.length; j++) {
				if (favouriteproducts[j].productd_id === allproducts[i].productd_id) {
					allproducts[i].product_addedtofavourite = true
				}
			}
		}
	}

	render() {
		let CurrentDate = new Date()
		CurrentDate.setDate(CurrentDate.getDate() + 15)

		var DelieveryDate = CurrentDate.toLocaleString('ru', {
			month: 'long',
			day: 'numeric',
		})

		let DelieveryPrice = 0

		let ProductsCost = 0
		this.state.cart_products
			.filter(CurrentProduct => CurrentProduct.product_isselected === true)
			.forEach(
				CurrentProduct =>
				(ProductsCost +=
					Number.parseFloat(CurrentProduct.product_price) *
					Number.parseFloat(CurrentProduct.cart_count))
			)

		let TotalDiscount = 0
		this.state.cart_products.forEach(CurrentProduct => {
			if (
				CurrentProduct.product_discount !== '0' &&
				CurrentProduct.product_isselected === true
			) {
				TotalDiscount +=
					(Number.parseFloat(CurrentProduct.product_price) -
						Number.parseFloat(CurrentProduct.product_disc_price)) *
					Number.parseFloat(CurrentProduct.cart_count)
			}
		})

		let TotalCost = ProductsCost - TotalDiscount

		let TotalProducts = 0
		this.state.cart_products.forEach(CurrentProduct => {
			if (CurrentProduct.product_isselected === true) {
				TotalProducts += Number.parseFloat(CurrentProduct.cart_count)
			}
		})

		return (
			<div class='PPContent'>
				<div class='PageTitleContainer'>
					<div class='PageTitle'>
						<div class='PageTitleTextContainer'>
							<h1 class='PageTitleText'>Корзина</h1>
							{Object.keys(this.state.cart_products).length > 0 && (
								<div class='PageTitleButtonsContainer'>
									{this.state.cart_products.find(
										CurrentProd => CurrentProd.product_isselected === true
									) && (
											<div
												onClick={() => this.openModalWindow()}
												id='DeleteSelected'
												class='PageTitleButton'
											>
												<i class='fi fi-sr-trash'></i>Удалить выбранное
											</div>
										)}
									<div
										onClick={() => this.SelectAllProducts()}
										id='SelectAll'
										class='PageTitleButton'
									>
										<i class='fi fi-sr-checkbox'></i>
										{this.state.cart_products.find(
											CurrentProd => CurrentProd.product_isselected === true
										)
											? 'Убрать выделение'
											: 'Выделить все'}
									</div>
								</div>
							)}
						</div>

						<div class='PageTitleLine' />
					</div>

					<div class='PageSideContainer' />
				</div>

				{this.state.IsModalShown && (
					<div className='ModalBackground'>
						<div className='ModalWindow'>
							<div
								onClick={() => this.closeModalWindow()}
								className='CloseModal'
							>
								<i
									style={{ color: '#636363' }}
									class='fi fi-rr-cross-small'
								></i>
							</div>
							<div className='ModalContainer'>
								<p className='ModalTitle'>Удаление выбранного</p>
								<p style={{ lineHeight: '150%', fontSize: '18px' }}>
									Вы уверены, что хотите удалить выбранные товары из корзины?
									Отменить это действие будет невозможно
								</p>
								<div className='ModalButtonsContainer'>
									<div
										onClick={() => this.closeModalWindow()}
										className='ModalSecondaryButton'
									>
										Отмена
									</div>
									<div
										onClick={() => this.deleteAllSelected()}
										className='ModalMainButton'
									>
										Удалить выбранное
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{Object.keys(this.state.cart_products).length > 0 ? (
					<div class='PageContent'>
						<CartProductContainer
							ShowSmallButtons={true}
							cartproducts={this.state.cart_products}
							onDeleteProduct={this.deleteProductFromCart}
							onSelectedChange={this.changeSelectedCart}
							onCountChange={this.changeCountCart}
						/>
						<div class='PageSideContainer'>
							{TotalProducts > 0 && (
								<div class='CartSummaryContainer'>
									<div class='CartSummaryInfoContainer'>
										<p class='BlockContainerTitle'>Ваша корзина</p>
									</div>

									<div class='CartSummaryInfoContainer'>
										<p class='SideContainerText'>
											{'Товары (' + TotalProducts + ')'}
										</p>
										<p class='SideContainerText'>
											{new Intl.NumberFormat().format(ProductsCost) + ' ₽'}
										</p>
									</div>

									{TotalDiscount > 0 && (
										<div class='CartSummaryInfoContainer'>
											<p class='SideContainerText'>Скидка</p>
											<p class='SideContainerText'>
												{'-' +
													new Intl.NumberFormat().format(TotalDiscount) +
													' ₽'}
											</p>
										</div>
									)}

									<div class='CartSummaryInfoContainer'>
										<p class='SideContainerText'>
											<b>Итого</b>
										</p>
										<p class='SideContainerText'>
											<b>{new Intl.NumberFormat().format(TotalCost) + ' ₽'}</b>
										</p>
									</div>

									<div class='SideContainerBuyButton' onClick={() => this.ordering()}>
										<p>К оформлению</p>
										<p class='SideContainerBuyButtonPrice'>
											{new Intl.NumberFormat().format(TotalCost) + ' ₽'}
										</p>
									</div>
									<p class='SideContainertDelieveryDate'>
										Выбрать способ доставки можно при оформлении заказа
									</p>
								</div>
							)}
						</div>

						<div className='MobilePanelContainer'>
							{TotalProducts > 0 && (
								<div class='CartSummaryContainer'>
									<div class='SideContainerBuyButton' onClick={() => this.ordering()}>
										<p>К оформлению</p>
										<p class='SideContainerBuyButtonPrice'>
											{new Intl.NumberFormat().format(TotalCost) + ' ₽'}
										</p>
									</div>
									<p class='SideContainertDelieveryDate'>
										Выбрать способ доставки можно при оформлении заказа
									</p>
								</div>
							)}
						</div>
					</div>
				) : (
					<div class='PageContent'>
						<div class='CartCardsContainer'>
							<div
								style={{ flexDirection: 'column', gap: '5px' }}
								class='CartCard'
							>
								<p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
									Пока тут ничего нет
								</p>
								<p style={{ marginBottom: '20px' }} class='AlertContainerText'>
									Подберите лучшую мебель для вашего дома с нашим каталогом
									товаров{' '}
								</p>
								<a href='../catalogue'>
									<div class='MainButton'>Каталог товаров</div>
								</a>
							</div>
						</div>
						<div class='PageSideContainer' />
					</div>
				)}
				<Header />
				<Footer />
			</div>
		)
	}

	ordering() {
		const products = this.state.cart_products.filter(prd => prd.product_isselected === true)
		console.log(products)
		localStorage.setItem('OrdertingProducts', JSON.stringify(products))
		window.location.href = '/ordering'
	}

	openModalWindow() {
		this.setState({ IsModalShown: true })
	}

	closeModalWindow() {
		this.setState({ IsModalShown: false })
	}

	SelectAllProducts() {
		const originProduts = this.state.cart_products
		let ContainsSelected = this.state.cart_products.find(
			CurrentProd => CurrentProd.product_isselected === true
		)

		console.log(ContainsSelected)

		if (ContainsSelected) {
			originProduts.forEach(
				CurrentProd => (CurrentProd.product_isselected = false)
			)
		} else {
			originProduts.forEach(
				CurrentProd => (CurrentProd.product_isselected = true)
			)
		}

		this.setState({ cart_products: originProduts })
	}

	changeCountCart(productid, newcount) {
		const productindex = this.state.cart_products
			.map(a => a.productd_id)
			.indexOf(productid)

		const originproducts = this.state.cart_products
		originproducts[productindex].cart_count = newcount
		this.setState({ cart_products: originproducts })

		this.changeCountCartBD(productid, newcount)
	}

	changeCountCartBD(productid, newcount) {
		const qs = require('qs');
		let data = qs.stringify({
			'count': newcount,
			'user': localStorage.getItem('userId'),
			'product': productid,
		});

		let config = {
			method: 'put',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/cart/count`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response) => {
				//console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	}


	changeSelectedCart(productid, selection) {
		const productindex = this.state.cart_products
			.map(a => a.productd_id)
			.indexOf(productid)
		const originproducts = this.state.cart_products
		originproducts[productindex].product_isselected = selection

		this.setState({ cart_products: originproducts })
	}

	deleteProductFromCart(productid) {
		let originproducts = this.state.cart_products
		originproducts = originproducts.filter(a => a.productd_id !== productid)
		this.setState({ cart_products: originproducts })

		this.deleteProductFromBD(productid)
	}

	deleteProductFromBD(productid) {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('user', localStorage.getItem('userId'))
		urlencoded.append('product', productid)

		const requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		}

		fetch(`${process.env.REACT_APP_API_URL}/cart/`, requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.error(error))
	}

	deleteAllSelected() {
		let originproducts = this.state.cart_products.filter(
			a => a.product_isselected === true
		)
		originproducts?.map(CurrentCartProduct =>
			this.deleteProductFromBD(CurrentCartProduct.productd_id)
		)
		originproducts = this.state.cart_products.filter(
			a => a.product_isselected === false
		)
		this.setState({ cart_products: originproducts })
		this.closeModalWindow()
	}
}

export default CartPage

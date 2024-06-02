import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

export class ReviewCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            isRated: false,
            isRatingSaved: false,
        }
    }

    componentDidMount() {
        this.setState({ rating: this.props.product.review_rating })
        this.setState({ isRatingSaved: this.props.product.review_rating > 0 ? true : false })
        this.setState({ isRated: this.props.product.review_rating > 0 ? true : false })
    }

    render() {
        return (
            <div className='ReviewCard'>
                <div className='ReviewProduct'>
                    <a href={"/product/" + this.props.product.productd_id}>
                        <div className='CartCardImg'>
                            <img className="PCardImg" src={"./img/" + this.props.product.image_path} alt=""></img>
                        </div></a>
                    <div className="CartCardMobileContainer">
                        <div className="CartCardInfo">
                            <a href={"/product/" + this.props.product.productd_id}>
                                <h className="CartCardName">{this.props.product.product_name}</h>
                            </a>
                            <h className="CartCardArticul">{this.props.product.product_article}</h>
                            <h className="CartCardInfoText">{"Цвет: " + this.props.product.color_name}</h>
                        </div>

                        <div className="CartCardPriceCountContainer">
                            <p className='PageCardText'>Ваша оценка:</p>
                            <div className='StarsContainer'>
                                <div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(1) : null} className={this.state.rating > 0 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div>
                                <div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(2) : null} className={this.state.rating > 1 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div>
                                <div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(3) : null} className={this.state.rating > 2 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div>
                                <div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(4) : null} className={this.state.rating > 3 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div>
                                <div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(5) : null} className={this.state.rating > 4 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <CSSTransition
                    in={this.state.isRated}
                    timeout={500}
                    classNames='smallalert'
                    unmountOnExit
                >
                    <div className='RatingBlock'>
                        <p className='PageCardText'>Комментарий</p>
                        {!this.state.isRatingSaved &&
                            <input
                                id='commentary'
                                type='text'
                                className='AutorizationTextArea'
                                required={true}
                                placeholder='Поделитесь мнением о товаре'
                                style={{ marginBottom: "20px" }}
                            ></input>
                        }
                        {this.state.isRatingSaved &&
                            <input
                                id='commentary'
                                type='text'
                                className='AutorizationTextArea'
                                required={true}
                                defaultValue={this.props.product.review_text}
                                readOnly
                                style={{ marginBottom: "20px" }}
                            ></input>
                        }
                        <p className='PageCardText'>До 5 фотографий товара</p>

                        {!this.state.isRatingSaved &&
                            <div style={{ marginTop: "20px" }} className='ModalButtonsContainer'>
                                <div onClick = {() => this.noRating()} className='ModalSecondaryButton'>Отмена</div>
                                <div className='ModalMainButtonGreen'>Сохранить</div>
                            </div>
                        }

                        {!this.state.isRatingSaved &&
                            <p className='PageCardText'>Внимательно проверьте отзыв - изменить его потом будет нельзя</p>
                        }
                    </div>
                </CSSTransition>
            </div>
        )
    }

    changeRatingStar(StarNum) {
        this.setState({ rating: StarNum })
        this.setState({ isRated: true })
    }

    noRating(){
        this.setState({ rating: 0 })
        this.setState({ isRated: false })
    }
}

export default ReviewCard
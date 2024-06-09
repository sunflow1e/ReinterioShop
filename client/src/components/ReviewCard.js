import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { UploadImage } from './UploadImage'
import axios from 'axios';

export class ReviewCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            isRated: false,
            isRatingSaved: false,
            product: [],
            IsModalShown: false,
        }

        this.uploadImage = this.uploadImage.bind(this)
        this.removeImage = this.removeImage.bind(this)
    }

    componentDidMount() {
        this.setState({ rating: this.props.product.review_rating })
        this.setState({ isRatingSaved: this.props.product.review_rating > 0 ? true : false })
        this.setState({ isRated: this.props.product.review_rating > 0 ? true : false })
        this.setState({ product: this.props.product })
    }

    render() {
        return (
            <div id={'review' + this.state.product.productd_id} className='ReviewCard'>
                <div className='ReviewProduct'>
                    <a href={"/product/" + this.state.product.productd_id}>
                        <div className='CartCardImg'>
                            <img className="PCardImg" src={"./img/" + this.state.product.image_path} alt=""></img>
                        </div></a>
                    <div className="CartCardMobileContainer">
                        <div className="CartCardInfo">
                            <a href={"/product/" + this.state.product.productd_id}>
                                <h className="CartCardName">{this.props.product.product_name}</h>
                            </a>
                            <h className="CartCardArticul">{this.state.product.product_article}</h>
                            <h className="CartCardInfoText">{"Цвет: " + this.state.product.color_name}</h>
                        </div>

                        <div className="CartCardPriceCountContainer">
                            <p className='PageCardText'>Ваша оценка:</p>
                            <div className='StarsContainer'>
                                <a href={'#review' + this.state.product.productd_id}><div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(1) : null} className={this.state.rating > 0 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div></a>
                                <a href={'#review' + this.state.product.productd_id}><div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(2) : null} className={this.state.rating > 1 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div></a>
                                <a href={'#review' + this.state.product.productd_id}><div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(3) : null} className={this.state.rating > 2 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div></a>
                                <a href={'#review' + this.state.product.productd_id}><div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(4) : null} className={this.state.rating > 3 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div></a>
                                <a href={'#review' + this.state.product.productd_id}><div onClick={() => !this.state.isRatingSaved ? this.changeRatingStar(5) : null} className={this.state.rating > 4 ? 'StarButtonActive' : 'StarButton'}><i className='fi fi-sr-star'></i></div></a>
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
                            id={'commentary' + this.state.product.productd_id} 
                                type='text'
                                autocomplete="off"
                                className='CommentTextArea'
                                required={true}
                                placeholder='Поделитесь мнением о товаре'
                                style={{ marginBottom: "20px" }}
                            ></input>
                        }
                        {this.state.isRatingSaved &&
                            <div
                                type='text'
                                className='CommentTextArea'
                                required={true}
                                defaultValue={this.state.product.review_text}
                                readOnly
                                autocomplete="off"
                                style={{ marginBottom: "20px" }}
                            >{this.props.product.review_text}</div>
                        }
                        <p className='PageCardText'>До 5 фотографий товара</p>

                        <div className='ReviewPicturesContainer'>
                            <UploadImage removeImage={this.removeImage} uploadImage={this.uploadImage} imgnum={1} key={1} isRated={this.state.isRatingSaved} image={this.state.product?.review_image1}></UploadImage>
                            <UploadImage removeImage={this.removeImage} uploadImage={this.uploadImage} imgnum={2} key={2} isRated={this.state.isRatingSaved} image={this.state.product?.review_image2}></UploadImage>
                            <UploadImage removeImage={this.removeImage} uploadImage={this.uploadImage} imgnum={3} key={3} isRated={this.state.isRatingSaved} image={this.state.product?.review_image3}></UploadImage>
                            <UploadImage removeImage={this.removeImage} uploadImage={this.uploadImage} imgnum={4} key={4} isRated={this.state.isRatingSaved} image={this.state.product?.review_image4}></UploadImage>
                            <UploadImage removeImage={this.removeImage} uploadImage={this.uploadImage} imgnum={5} key={5} isRated={this.state.isRatingSaved} image={this.state.product?.review_image5}></UploadImage>
                        </div>

                        {!this.state.isRatingSaved &&
                            <div style={{ marginTop: "20px" }} className='ModalButtonsContainer'>
                                <div onClick={() => this.noRating()} className='ModalSecondaryButton'>Отмена</div>
                                <div onClick={() => this.openModalWindow()} className='ModalMainButtonGreen'>Сохранить</div>
                            </div>
                        }

                        {!this.state.isRatingSaved &&
                            <p style={{width: "100%", whiteSpace: "wrap"}} className='PageCardText'>Внимательно проверьте отзыв - изменить его потом будет нельзя</p>
                        }
                    </div>
                </CSSTransition>


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
                                <p className='ModalTitle'>Сохранение отзыва</p>
                                <p className='PageCardText'>
                                    Перед сохранением внимательно проверьте отзыв. Изменить его потом будет нельзя.<br /><br />Сохранить отзыв сейчас?
                                </p>
                                <div className='ModalButtonsContainer'>
                                    <div
                                        onClick={() => this.closeModalWindow()}
                                        className='ModalSecondaryButton'
                                    >
                                        Отмена
                                    </div>
                                    <div
                                        onClick={() => this.SaveReview()}
                                        className='ModalMainButtonGreen'
                                    >
                                        Сохранить отзыв
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    openModalWindow() {
        this.setState({ IsModalShown: true })
    }

    closeModalWindow() {
        this.setState({ IsModalShown: false })
    }

    SaveReview() {
        let CurrentDate = new Date();
        CurrentDate = CurrentDate.toISOString().slice(0, 10);

        const qs = require('qs');
        let data = qs.stringify({
            'user': localStorage.getItem("userId"),
            'product': this.state.product.productd_id,
            'rating': this.state.rating,
            'text': document.getElementById('commentary' + this.state.product.productd_id).value,
            'image1': this.state.product.review_image1,
            'image2': this.state.product.review_image2,
            'image3': this.state.product.review_image3,
            'image4': this.state.product.review_image4,
            'image5': this.state.product.review_image5,
            'date': CurrentDate,
            'review': this.state.product.review_id
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/review`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        window.location.href = '/reviews'
    }











    changeRatingStar(StarNum) {
        this.setState({ rating: StarNum })
        this.setState({ isRated: true })
    }

    noRating() {
        this.setState({ rating: 0 })
        this.setState({ isRated: false })
    }

    removeImage(id) {
        const originproducts = this.state.product

        console.log(originproducts)

        switch (id) {
            case 1:
                originproducts.review_image1 = null
                break;

            case 2:
                originproducts.review_image2 = null
                break;

            case 3:
                originproducts.review_image3 = null
                break;

            case 4:
                originproducts.review_image4 = null
                break;

            case 5:
                originproducts.review_image5 = null
                break;

            default:
                break;
        }

        this.setState({ product: originproducts })
    }

    uploadImage(id, file_path) {
        const originproducts = this.state.product

        console.log(originproducts)

        switch (id) {
            case 1:
                originproducts.review_image1 = file_path
                break;

            case 2:
                originproducts.review_image2 = file_path
                break;

            case 3:
                originproducts.review_image3 = file_path
                break;

            case 4:
                originproducts.review_image4 = file_path
                break;

            case 5:
                originproducts.review_image5 = file_path
                break;

            default:
                break;
        }

        this.setState({ product: originproducts })
    }
}

export default ReviewCard
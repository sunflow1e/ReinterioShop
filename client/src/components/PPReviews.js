import React, { Component } from 'react'

export class PPReviews extends Component {
    render() {

        let Starts = ''

        for (let index = 0; index < this.props.review.review_rating; index++) {
            Starts += '★'
        }

        return (
            <div style={{ maxHeight: "none" }} className='GrayBackground'>
                <div className='AllFilesContainer'>
                    <b className='PageCardText'>{this.props.review.user_name + ' ' + this.props.review.user_surname.charAt(0) + '.'}</b>
                    <p style={{ color: "#E07C20" }} className='PageCardTitle'>{Starts}</p>
                </div>

                <div style={{width: "100%", color: "#B4A39A", fontsize: "16px"}}><p className='ReviewText'>{new Date(this.props.review.review_date).toLocaleDateString()}</p></div>

                <div style={{width: "100%"}}><p className='ReviewText'>{this.props.review.review_text}</p></div>

                <div className='ReviewPicturesContainer'>
                    {this.props.review.review_image1 &&
                        <div
                            className='ReviewPicture'
                            style={{
                                backgroundImage:
                                    'url(/img/' + this.props.review.review_image1,
                            }}
                        ></div>
                    }

                    {this.props.review.review_image2 &&
                        <div
                            className='ReviewPicture'
                            style={{
                                backgroundImage:
                                    'url(/img/' + this.props.review.review_image2,
                            }}
                        ></div>
                    }

                    {this.props.review.review_image3 &&
                        <div
                            className='ReviewPicture'
                            style={{
                                backgroundImage:
                                    'url(/img/' + this.props.review.review_image3,
                            }}
                        ></div>
                    }

                    {this.props.review.review_image4 &&
                        <div
                            className='ReviewPicture'
                            style={{
                                backgroundImage:
                                    'url(/img/' + this.props.review.review_image4,
                            }}
                        ></div>
                    }

                    {this.props.review.review_image5 &&
                        <div
                            className='ReviewPicture'
                            style={{
                                backgroundImage:
                                    'url(/img/' + this.props.review.review_image5,
                            }}
                        ></div>
                    }

                </div>
            </div>
        )
    }
}

export default PPReviews
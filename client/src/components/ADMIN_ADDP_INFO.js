import React, { Component } from 'react'
import axios from 'axios'
import FilterColor from './FilterColor';
import Bubble from './Bubble';
import BubbleMaterial from './BubbleMaterial';

export class ADMIN_ADDP_INFO extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subcategories: [],
            colors: this.props.colors,
            styles: this.props.styles,
            materials: this.props.materials,

            current_category: this.props.currentcategoryname,
            current_subcategory: this.props.product.subcategory_name,
            current_shape: this.props.product.shape_name,
        }
    }

    componentDidMount() {
        this.getSubcategories();
    }

    getSubcategories() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/subcategory`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ subcategories: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        let current_subcategories = this.state.subcategories.filter(el => el.subcategory_category === Number.parseInt(this.props.categoryid))

        return (
            <div className='AdminCard'>
                <div className='AdminInfoContainer'>
                    <p className='PageCardTitle'>Информация о товаре</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p className='PageCardText'>Название</p>
                        <input
                            pattern='[А-Яа-я]+'
                            id={'product_name' + this.props.ProdId}
                            autocomplete="off"
                            type='text'
                            maxLength='50'
                            className='MainTextArea'
                            defaultValue={this.props.product.product_name}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box" }}>
                            <p className='PageCardText'>Цена</p>
                            <input
                                id={'product_price' + this.props.ProdId}
                                autocomplete="off"
                                type='text'
                                pattern='^[ 0-9]+$'
                                maxLength='50'
                                style={{ width: "90%" }}
                                className='MainTextArea'
                                defaultValue={this.props.product.product_price}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>₽</div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box" }}>
                            <p className='PageCardText'>Скидка</p>
                            <input
                                pattern='[0-9]{1,2}'
                                id={'product_discount' + this.props.ProdId}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "90%" }}
                                className='MainTextArea'
                                defaultValue={this.props.product.product_discount}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>%</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "auto" }}>
                        <p className='PageCardText'>Цвета</p>
                        <div className='AllColorsContainer'>
                            {this.state.colors?.map(Color => (
                                <FilterColor changeSelectedColor={this.props.changeSelectedColor} key={Color.color_id} color={Color} />
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                            <p className='PageCardText'>Категория</p>
                            <select onChange={() => this.props.changeCurrentCategory(document.getElementById('select_category').value)} className='DropDown' id="select_category">
                                {this.props.categories[0] && <option value={this.props.categories[0].category_id}>{this.props.categories[0].category_name}</option>}
                                {this.props.categories[1] && <option value={this.props.categories[1].category_id}>{this.props.categories[1].category_name}</option>}
                                {this.props.categories[2] && <option value={this.props.categories[2].category_id}>{this.props.categories[2].category_name}</option>}
                                {this.props.categories[3] && <option value={this.props.categories[3].category_id}>{this.props.categories[3].category_name}</option>}
                                {this.props.categories[4] && <option value={this.props.categories[4].category_id}>{this.props.categories[4].category_name}</option>}
                                {this.props.categories[5] && <option value={this.props.categories[5].category_id}>{this.props.categories[5].category_name}</option>}
                                {this.props.categories[6] && <option value={this.props.categories[6].category_id}>{this.props.categories[6].category_name}</option>}
                                {this.props.categories[7] && <option value={this.props.categories[7].category_id}>{this.props.categories[7].category_name}</option>}
                                {this.props.categories[8] && <option value={this.props.categories[8].category_id}>{this.props.categories[8].category_name}</option>}
                                {this.props.categories[9] && <option value={this.props.categories[9].category_id}>{this.props.categories[9].category_name}</option>}
                                {this.props.categories[10] && <option value={this.props.categories[10].category_id}>{this.props.categories[10].category_name}</option>}
                                {this.props.categories[11] && <option value={this.props.categories[11].category_id}>{this.props.categories[11].category_name}</option>}
                                {this.props.categories[12] && <option value={this.props.categories[12].category_id}>{this.props.categories[12].category_name}</option>}
                                {this.props.categories[13] && <option value={this.props.categories[13].category_id}>{this.props.categories[13].category_name}</option>}
                                {this.props.categories[14] && <option value={this.props.categories[14].category_id}>{this.props.categories[14].category_name}</option>}
                                {this.props.categories[15] && <option value={this.props.categories[15].category_id}>{this.props.categories[15].category_name}</option>}
                                {this.props.categories[16] && <option value={this.props.categories[16].category_id}>{this.props.categories[16].category_name}</option>}
                                {this.props.categories[17] && <option value={this.props.categories[17].category_id}>{this.props.categories[17].category_name}</option>}
                                {this.props.categories[18] && <option value={this.props.categories[18].category_id}>{this.props.categories[18].category_name}</option>}
                                {this.props.categories[19] && <option value={this.props.categories[19].category_id}>{this.props.categories[19].category_name}</option>}

                            </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                            <p className='PageCardText'>Подкатегория</p>
                            <select className='DropDown' id="select_subcategory">
                                {current_subcategories[0] && <option value={current_subcategories[0].subcategory_id}>{current_subcategories[0].subcategory_name}</option>}
                                {current_subcategories[1] && <option value={current_subcategories[1].subcategory_id}>{current_subcategories[1].subcategory_name}</option>}
                                {current_subcategories[2] && <option value={current_subcategories[2].subcategory_id}>{current_subcategories[2].subcategory_name}</option>}
                                {current_subcategories[3] && <option value={current_subcategories[3].subcategory_id}>{current_subcategories[3].subcategory_name}</option>}
                                {current_subcategories[4] && <option value={current_subcategories[4].subcategory_id}>{current_subcategories[4].subcategory_name}</option>}
                                {current_subcategories[5] && <option value={current_subcategories[5].subcategory_id}>{current_subcategories[5].subcategory_name}</option>}
                                {current_subcategories[6] && <option value={current_subcategories[6].subcategory_id}>{current_subcategories[6].subcategory_name}</option>}
                                {current_subcategories[7] && <option value={current_subcategories[7].subcategory_id}>{current_subcategories[7].subcategory_name}</option>}
                                {current_subcategories[8] && <option value={current_subcategories[8].subcategory_id}>{current_subcategories[8].subcategory_name}</option>}
                                {current_subcategories[9] && <option value={current_subcategories[9].subcategory_id}>{current_subcategories[9].subcategory_name}</option>}
                                {current_subcategories[10] && <option value={current_subcategories[10].subcategory_id}>{current_subcategories[10].subcategory_name}</option>}
                                {current_subcategories[11] && <option value={current_subcategories[11].subcategory_id}>{current_subcategories[11].subcategory_name}</option>}
                                {current_subcategories[12] && <option value={current_subcategories[12].subcategory_id}>{current_subcategories[12].subcategory_name}</option>}
                                {current_subcategories[13] && <option value={current_subcategories[13].subcategory_id}>{current_subcategories[13].subcategory_name}</option>}
                                {current_subcategories[14] && <option value={current_subcategories[14].subcategory_id}>{current_subcategories[14].subcategory_name}</option>}
                                {current_subcategories[15] && <option value={current_subcategories[15].subcategory_id}>{current_subcategories[15].subcategory_name}</option>}
                                {current_subcategories[16] && <option value={current_subcategories[16].subcategory_id}>{current_subcategories[16].subcategory_name}</option>}
                                {current_subcategories[17] && <option value={current_subcategories[17].subcategory_id}>{current_subcategories[17].subcategory_name}</option>}
                                {current_subcategories[18] && <option value={current_subcategories[18].subcategory_id}>{current_subcategories[18].subcategory_name}</option>}
                                {current_subcategories[19] && <option value={current_subcategories[19].subcategory_id}>{current_subcategories[19].subcategory_name}</option>}
                            </select>
                        </div>
                    </div>

                </div>

                <div className='AdminInfoContainer'>
                    <p className='PageCardTitle'>Дополнительные характеристики</p>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box" }}>
                            <p className='PageCardText'>Ширина</p>
                            <input
                                pattern='\d+(\.\d{1})?'
                                id={'product_width' + this.props.ProdId}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "90%" }}
                                className='MainTextArea'
                                defaultValue={this.props.product.product_width}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>см.</div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box" }}>
                            <p className='PageCardText'>Высота</p>
                            <input
                                pattern='\d+(\.\d{1})?'
                                id={'product_height' + this.props.ProdId}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "90%" }}
                                className='MainTextArea'
                                defaultValue={this.props.product.product_height}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>см.</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box" }}>
                            <p className='PageCardText'>Длина</p>
                            <input
                                pattern='\d+(\.\d{1})?'
                                id={'product_lenght' + this.props.ProdId}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "90%" }}
                                className='MainTextArea'
                                defaultValue={this.props.product.product_length}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>см.</div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box" }}>
                            <p className='PageCardText'>Вес</p>
                            <input
                                pattern='\d+(\.\d{1})?'
                                id={'product_weight' + this.props.ProdId}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "90%" }}
                                className='MainTextArea'
                                defaultValue={this.props.product.product_weight}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>кг</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                            <p className='PageCardText'>Стили</p>
                            <div className='GrayBackground'>
                                <div className='StylesContainer'>
                                    {this.state.styles?.map(style => (
                                        <Bubble
                                            changeSelected={this.props.changeSelectedStyle}
                                            key={style.style_id}
                                            style={style}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                            <p className='PageCardText'>Материалы</p>
                            <div className='GrayBackground'>
                                <div className='StylesContainer'>
                                    {this.state.materials?.map(material => (
                                        <BubbleMaterial
                                            changeSelected={this.props.changeSelectedMaterial}
                                            key={material.materials_id}
                                            material={material}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                        <p className='PageCardText'>Форма</p>
                        <select className='DropDown' id="select_shape">
                            {this.state.current_shape === this.props.product.shape_name &&
                                <option value={this.props.shapeid} >{this.state.current_shape}</option>
                            }
                            {this.props.shapes[0] && this.state.current_shape !== this.props.shapes[0].shape_name && <option value={this.props.shapes[0].shape_id}>{this.props.shapes[0].shape_name}</option>}
                            {this.props.shapes[1] && this.state.current_shape !== this.props.shapes[1].shape_name && <option value={this.props.shapes[1].shape_id}>{this.props.shapes[1].shape_name}</option>}
                            {this.props.shapes[2] && this.state.current_shape !== this.props.shapes[2].shape_name && <option value={this.props.shapes[2].shape_id}>{this.props.shapes[2].shape_name}</option>}
                            {this.props.shapes[3] && this.state.current_shape !== this.props.shapes[3].shape_name && <option value={this.props.shapes[3].shape_id}>{this.props.shapes[3].shape_name}</option>}
                            {this.props.shapes[4] && this.state.current_shape !== this.props.shapes[4].shape_name && <option value={this.props.shapes[4].shape_id}>{this.props.shapes[4].shape_name}</option>}
                            {this.props.shapes[5] && this.state.current_shape !== this.props.shapes[5].shape_name && <option value={this.props.shapes[5].shape_id}>{this.props.shapes[5].shape_name}</option>}
                            {this.props.shapes[6] && this.state.current_shape !== this.props.shapes[6].shape_name && <option value={this.props.shapes[6].shape_id}>{this.props.shapes[6].shape_name}</option>}
                            {this.props.shapes[7] && this.state.current_shape !== this.props.shapes[7].shape_name && <option value={this.props.shapes[7].shape_id}>{this.props.shapes[7].shape_name}</option>}
                            {this.props.shapes[8] && this.state.current_shape !== this.props.shapes[8].shape_name && <option value={this.props.shapes[8].shape_id}>{this.props.shapes[8].shape_name}</option>}
                            {this.props.shapes[9] && this.state.current_shape !== this.props.shapes[9].shape_name && <option value={this.props.shapes[9].shape_id}>{this.props.shapes[9].shape_name}</option>}
                            {this.props.shapes[10] && this.state.current_shape !== this.props.shapes[10].shape_name && <option value={this.props.shapes[10].shape_id}>{this.props.shapes[10].shape_name}</option>}
                            {this.props.shapes[11] && this.state.current_shape !== this.props.shapes[11].shape_name && <option value={this.props.shapes[11].shape_id}>{this.props.shapes[11].shape_name}</option>}
                            {this.props.shapes[12] && this.state.current_shape !== this.props.shapes[12].shape_name && <option value={this.props.shapes[12].shape_id}>{this.props.shapes[12].shape_name}</option>}
                            {this.props.shapes[13] && this.state.current_shape !== this.props.shapes[13].shape_name && <option value={this.props.shapes[13].shape_id}>{this.props.shapes[13].shape_name}</option>}
                            {this.props.shapes[14] && this.state.current_shape !== this.props.shapes[14].shape_name && <option value={this.props.shapes[14].shape_id}>{this.props.shapes[14].shape_name}</option>}
                            {this.props.shapes[15] && this.state.current_shape !== this.props.shapes[15].shape_name && <option value={this.props.shapes[15].shape_id}>{this.props.shapes[15].shape_name}</option>}
                            {this.props.shapes[16] && this.state.current_shape !== this.props.shapes[16].shape_name && <option value={this.props.shapes[16].shape_id}>{this.props.shapes[16].shape_name}</option>}
                            {this.props.shapes[17] && this.state.current_shape !== this.props.shapes[17].shape_name && <option value={this.props.shapes[17].shape_id}>{this.props.shapes[17].shape_name}</option>}
                            {this.props.shapes[18] && this.state.current_shape !== this.props.shapes[18].shape_name && <option value={this.props.shapes[18].shape_id}>{this.props.shapes[18].shape_name}</option>}
                            {this.props.shapes[19] && this.state.current_shape !== this.props.shapes[19].shape_name && <option value={this.props.shapes[19].shape_id}>{this.props.shapes[19].shape_name}</option>}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default ADMIN_ADDP_INFO
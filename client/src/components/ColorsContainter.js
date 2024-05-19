import React, { Component } from 'react'
import ColorPicker from './ColorPicker';

export class ColorsContainter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='ColorsContainer'>
                <div>{"Цвет: " + this.props.CurrentColor}</div>
                <div className='AllColorsContainer'>
                    {this.props.allcolors?.map(Color => (
                        <ColorPicker key={Color.color_id} CurrentColor={this.props.CurrentColor} color={Color} />
                    ))}
                </div>
            </div>
        )
    }
}

export default ColorsContainter
import React, { Component } from 'react'

export class PPFiles extends Component {
    render() {
        return (
            <a download href={'/files/' + this.props.files.file_path} target="_blank">
            <div title={this.props.files.file_path} className='FileContainer'><i class="fi fi-rr-link"></i>{this.props.files.file_name}</div>
            </a>
        )
    }
}

export default PPFiles
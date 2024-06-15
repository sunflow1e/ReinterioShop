import React from 'react'
import { useState } from 'react'

const hostUrl = process.env.REACT_APP_API_URL + '/upload'

export const UploadImage = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState();

    const handleUpload = async (event) => {

        setSelectedFile(event.currentTarget.files[0])

        if (!event.currentTarget.files[0]) {
            return;
        }

        const formData = new FormData;
        formData.append('file', event.currentTarget.files[0]);

        const res = await fetch(hostUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        setUploaded(data);

        if (!props.small) {
            props.uploadImage(props.imgnum, data.filePath)
        }
        else {
            props.uploadImage(props.productd_id, data.filePath)

            console.log(props.productd_id)
        }
    }

    return (
        <>
            {(props.image) &&
                <div
                    className={props.small ? 'AddProductPicture' : 'ReviewPicture'}
                    style={{
                        backgroundImage:
                            'url(/img/' + props.image,
                    }}
                >
                    {!props.isRated &&
                        <div onClick={() => props.small ? props.removeImage(props.image) : props.removeImage(props.imgnum)} className='RemoveReviewPicture'><i class='fi fi-rr-cross-small' /></div>
                    }
                </div >
            }
            {
                (!props.isRated && !props.image) &&
                <div>
                    <button className={props.small ? 'AdminInpuImgButtonContainer' : 'InpuImgButtonContainer'}><label htmlFor={'file' + props.imgnum + props.productd_id}><div className='InputImgButton'><i class='fi fi-rr-plus' /></div></label></button>
                    <input id={'file' + props.imgnum + props.productd_id} type='file' className='hidden' onChange={handleUpload} accept='image/*, .png, .jpg, .jpeg' />
                </div>
            }
        </>
    )
}
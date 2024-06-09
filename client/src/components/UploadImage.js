import React from 'react'
import { useState } from 'react'

const hostUrl = process.env.REACT_APP_API_URL + '/upload'

export const UploadImage = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState();

    const handleUpload = async (event) => {

        setSelectedFile(event.currentTarget.files[0])

        if (!event.currentTarget.files[0]) {
            alert("Пожалуйста, выберите файл");
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

        props.uploadImage(props.imgnum, data.filePath)
    }

    return (
        <>
            {(props.image) &&
                <div
                    className='ReviewPicture'
                    style={{
                        backgroundImage:
                            'url(/img/' + props.image,
                    }}
                >
                    {!props.isRated &&
                        <div onClick={() => props.removeImage(props.imgnum)} className='RemoveReviewPicture'><i class='fi fi-rr-cross-small' /></div>
                    }
                </div >
            }
            {
                (!props.isRated && !props.image) &&
                <div>
                    <button className='InpuImgButtonContainer'><label for={'file' + props.imgnum}><div className='InputImgButton'><i class='fi fi-rr-plus' /></div></label></button>
                    <input id={'file' + props.imgnum} type='file' className='hidden' onChange={handleUpload} accept='image/*, .png, .jpg, .jpeg' />
                </div>
            }
        </>
    )
}
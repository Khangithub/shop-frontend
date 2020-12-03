import React, {useState} from 'react';
import {storage} from '../../firebase';
import './UploadImgButton.css';

function UploadImgButton({editedProduct, setEditProduct}) {
  // var [image, setImage] = useState(null);
  var [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      const image  = event.target.files[0];
      console.log(event.target.files[0], 'image');
      const uploadTask = storage.ref(`shopeeholic/${image.name}`).put(image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('shopeeholic')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setEditProduct({
                ...editedProduct,
                productImage: url,
              });
            });
        }
      );
    }
  };

  return (
    <div className='upload__img__button'>
      <input
        accept="image/*"
        type="file"
        onChange={handleChange}
        style={{display: 'none'}}
        id="upload-img"
      />

      <label htmlFor="upload-img">
        <span role="img" aria-label="">
          📷
        </span>
      </label>

      <progress value={progress} max="100" />
    </div>
  );
}

export default UploadImgButton;

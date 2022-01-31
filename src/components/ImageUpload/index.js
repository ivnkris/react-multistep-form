import S3 from "react-aws-s3";
import ImageUploading from "react-images-uploading";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import "./ImageUpload.css";

const ImageUpload = ({ setImageUrl, imageUrl }) => {
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onUpload = async () => {
    let files = [];
    let fileNames = [];

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);

    for (let i = 0; i < images.length; i++) {
      files[i] = images[i].file;
      fileNames[i] = uuidv4();

      const s3Data = await ReactS3Client.uploadFile(files[i], fileNames[i]);

      if (s3Data.status === 204) {
        setImageUrl((imageUrl) => [...imageUrl, s3Data.location]);
      } else {
        console.log("Failed to upload image");
      }
    }

    setImages([]);

    console.log(imageUrl);
  };

  const displayImages = (images) => {
    for (let i = 0; i < images.length; i++) {
      return (
        <div>
          <img
            className="preview-image"
            alt={images[i].name}
            src={images[i]["data_url"]}
          />
          <div className="preview-title my-2">Image Preview</div>
        </div>
      );
    }
  };

  const displayUploadedImages = (imageUrl) => {
    return (
      <div className="mt-3">
        <img
          alt={imageUrl[imageUrl.length - 1]}
          className="preview-image"
          src={imageUrl[imageUrl.length - 1]}
        />
        <div className="preview-title mt-2">Successfully Uploaded Image</div>
      </div>
    );
  };

  return (
    <div className="mt-1">
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div>
            <div className="card-action-area">
              {images.length !== 0 && <div>{displayImages(images)}</div>}

              {imageList.length !== 0 && (
                <div>
                  <button
                    className="btn btn-danger mt-1 mb-1 me-2"
                    onClick={onImageRemoveAll}
                  >
                    <span className="">Delete</span>
                  </button>

                  <button
                    className="btn btn-warning m-1"
                    onClick={onImageUpload}
                  >
                    <span className="">Edit</span>
                  </button>
                </div>
              )}
            </div>

            {imageList.length !== 0 && (
              <div className="d-flex gap-2 pt-2">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={onUpload}
                >
                  Upload
                </button>
              </div>
            )}
            {imageList.length === 0 && (
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onImageUpload}
                >
                  {`Select${imageUrl.length !== 0 ? " Another" : ""} Image`}
                </button>

                {imageUrl.length !== 0 && displayUploadedImages(imageUrl)}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUpload;

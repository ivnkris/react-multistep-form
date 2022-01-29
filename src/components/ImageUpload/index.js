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
    const file = images[0].file;
    const fileName = uuidv4();

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);

    const s3Data = await ReactS3Client.uploadFile(file, fileName);

    if (s3Data.status === 204) {
      setImageUrl(s3Data.location);
      setImages([]);
    } else {
      console.log("Failed to upload image");
    }
  };

  return (
    <div className="my-1">
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div>
            <div className="card-action-area text-center">
              {images.length !== 0 && (
                <div>
                  <img
                    className="preview-image"
                    alt={images[0].name}
                    src={images[0]["data_url"]}
                  />
                  <div className="preview-title my-2">Image Preview</div>
                </div>
              )}

              {imageList.length !== 0 && (
                <div>
                  <button
                    className="btn btn-danger m-1"
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
              <div className="d-flex gap-2 justify-content-center py-2">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={onUpload}
                >
                  Upload
                </button>
              </div>
            )}

            <div className="image-upload-actions">
              {imageList.length === 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onImageUpload}
                >
                  Select Image
                </button>
              )}

              {imageUrl && (
                <div className="uploaded-image-div">
                  <img
                    alt={imageUrl}
                    className="preview-image"
                    src={imageUrl}
                  />
                  <div className="preview-title my-2">Uploaded Image</div>
                </div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUpload;

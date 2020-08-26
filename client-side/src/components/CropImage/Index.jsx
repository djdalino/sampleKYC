import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const CropImage = () => {
  const { src, setSrc } = useContext(HeaderContext);
  const { crop, setCrop } = useContext(HeaderContext);
  const { croppedImageUrl, setCroppedImageUrl } = useContext(HeaderContext);
  let imageRef;
  let fileUrl;
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = image => {
    imageRef = image;
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // setState({ crop: percentCrop });
    setCrop(percentCrop);
  };
  const makeClientCrop = async crop => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/png");
    });
  }
  return (
    <div className="position-fixed crop-container w-100 h-100 bg-danger">
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      {croppedImageUrl && (
        <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
      )}
    </div>
  );
};

export default CropImage;

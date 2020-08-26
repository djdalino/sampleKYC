import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const CropImage = () => {
  const { src, setSrc } = useContext(HeaderContext);
  const { upload, setUpload } = useContext(HeaderContext);
  const { crop, setCrop } = useContext(HeaderContext);
  const { croppedImageUrl, setCroppedImageUrl } = useContext(HeaderContext);
  let { imageRef } = useContext(HeaderContext);
  let { fileUrl } = useContext(HeaderContext);
  //   const onSelectFile = e => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () => setSrc(reader.result));
  //       reader.readAsDataURL(e.target.files[0]);
  //     }
  //   };

  const onImageLoaded = image => {
    imageRef = image;
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // setState({ crop: percentCrop });
    setCrop(crop);
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

  const getCroppedImg = (image, crop, fileName) => {
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
      }, "image/jpeg");
    });
  };
  console.log(croppedImageUrl);
  const onSelectedCrop = () => {
    setUpload([...upload, croppedImageUrl]);

    // setUpload(load => [...load, croppedImageUrl]);
    setSrc(null);
  };
  return (
    <div className="position-fixed crop-container w-100 h-100 bg-light">
      <div className="position-relative">
        <div
          className="text-center position-relative"
          style={{ height: "80vh", width: "100wh", margin: "auto" }}
        >
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
        </div>

        {/* {croppedImageUrl && (
        <img alt="Crop" style={{ width: "100%" }} src={croppedImageUrl} />
      )} */}
        <div
          className="text-center m-5 position-relative"
          style={{ zIndex: "1000" }}
        >
          <button className="btn btn-primary" onClick={onSelectedCrop}>
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImage;

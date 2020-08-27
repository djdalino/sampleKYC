import React, { useContext, useRef } from "react";
import HeaderContext from "../../context/HeaderContext";
// import CropImage from "../CropImage/Index";
import Step from "../Common/Step";
import IdWithFace from "../../Images/withID.png";
import loadImage from "blueimp-load-image/js";
const StepTwo = () => {
  const { stepTwoUploadB, setStepTwoUploadB } = useContext(HeaderContext);
  //   const [count, setCount] = useState(0);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const handleFileOnChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      loadImage(
        e.target.files[0],
        setStepTwoUploadB([
          ...stepTwoUploadB,
          URL.createObjectURL(e.target.files[0])
        ]),
        { orientation: true }
      );

      // const reader = new FileReader();
      // reader.addEventListener('load', () =>
      //   this.setState({ src: reader.result })
      // );
      // reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitFile = () => {
    if (stepTwoUploadB.length === 0) {
      alert("Please input image");
    } else if (stepTwoUploadB.length < 2) {
      alert("Upload 1 more image");
    } else if (stepTwoUploadB.length > 2) {
      alert("Choose 2 images only");
    } else {
      alert("Image uploaded");
    }
  };
  const deleteItem = id => {
    const findOne = stepTwoUploadB.map(d => d);
    // const deleteOne = upload.filter(d => d);
    setStepTwoUploadB(stepTwoUploadB.filter(d => d !== findOne[id]));
  };
  return (
    <React.Fragment>
      <Step
        step="Step 2"
        data="Take a Selfie with the 2 Valid IDs one by one"
      />

      <div className="border position-relative mx-auto box-h250 box-w300">
        <div className="position-absolute border-inner-box box-h260 box-w225"></div>
        <div className="position-absolute box-img w-90 h-100 py-10">
          {stepTwoUploadB.length < 1 ? (
            <img
              src={IdWithFace}
              alt="Your Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          ) : (
            <div className="position-relative h-238">
              <button
                className="close position-absolute"
                style={{
                  top: "-20px",
                  right: "-10px",
                  color: "red",
                  zIndex: "100px"
                }}
                aria-label="Close"
                onClick={() => deleteItem(stepTwoUploadB.length - 1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <img
                className="img-fluid-step-two-b "
                src={stepTwoUploadB[stepTwoUploadB.length - 1]}
                alt="Your Selfie"
                height="100%"
                width="100%"
                onClick={handleInputFile}
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-3 text-center text-warning">
        <p>1. One photo per ID</p>
        <p>2. Make sure your in focus</p>
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={handleFileOnChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      <div className="text-center">
        <button onClick={() => onSubmitFile()} className="btn btn-danger">
          Send Photo
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepTwo;

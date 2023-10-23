import React, { useState } from "react";
import "../App.css";
import Loader from "../Assets/Loader";
import axios from "axios";
import Modal from "./Modal/Modal";

const FormData = require("form-data");

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); //for error
  const [showModal, setShowModal] = useState(false);
  const [urls_images, setUrls_images] = useState(null);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const run = async () => {
    try {
      setLoading(true);
      if (!image) return;

      const form = new FormData();
      form.append("image", image);

      const response = await axios.post(`http://localhost:5000/upload`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      const [error, images] = response.data;
      setError(error);
      if (images) {
        setShowModal(true);
      }
      setUrls_images(images);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h1>FaceScanner</h1>
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="selected_image"
            className="picture"
            style={{ opacity: `${loading ? "0.5" : "1"}` }}
          />
        ) : (
          <span className="picture__image">Choose an Image</span>
        )}
      </label>
      <div
        className="ocrloader"
        style={{ display: `${loading ? "block" : "none"}` }}
      >
        <p>Scanning</p>
        <em></em>
        <span></span>
      </div>

      <input
        type="file"
        name="picture__input"
        id="picture__input"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={image}
      />
      <div className="button-div">
        <button
          onClick={() => {
            setImage(null);
            setError(null);
            setUrls_images(null);
          }}
          className="clear-button"
          disabled={loading || !image}
        >
          Clear Image
        </button>

        <button
          onClick={() => {
            run();
            setError(null);
            setUrls_images(null);
          }}
          className="check-button"
          disabled={!image || loading}
          style={{ width: "175px" }}
        >
          {loading ? <Loader /> : "Face Check Now"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {urls_images && showModal && (
        <Modal onClose={() => setShowModal(false)} data={urls_images} />
      )}
      {!error && !showModal && urls_images && (
        <button
          onClick={() => setShowModal(true)}
          className="see-results-button"
        >
          See Results
        </button>
      )}
    </div>
  );
};

export default ImageUpload;

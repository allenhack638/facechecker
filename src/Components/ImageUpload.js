import React, { useEffect, useState } from "react";
import "../App.css";
import Loader from "../Assets/Loader";
import Progressbar from "./ProgressBar";
import axios from "axios";
import SampleCard from "./SampleCard";
import Modal from "./Modal/Modal";
const FormData = require("form-data");

const image1 = "/Images/1698013503393..jpg";

const TESTING_MODE = true;
const APITOKEN =
  "HVgJKyDcslvnJC+331VzzARBNZ/ZcqOqbOIxypdRcGsB/4UHykwAdH/R63GLVhyFosk+nEusZOU=";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); //for error
  const [modalClose, setmodalClose] = useState(false);
  const [urls_images, setUrls_images] = useState([
    {
      score: 85,
      url: "https://example.com/person1ssssssssssssssssssssssssss",
      image_base64:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4Q... (base64 data)",
    },
    {
      score: 72,
      url: "https://example.com/person2sssssssssssssssssssssssssss",
      image_base64:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4Q... (base64 data)",
    },
    {
      score: 94,
      url: "https://example.com/person3sssssssssssssssssssssssssss",
      image_base64:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4Q... (base64 data)",
    },
  ]);

  useEffect(() => {
    if (urls_images) {
      setmodalClose(true);
    }
  }, [urls_images]);


  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    console.log(selectedImage);
    setImage(selectedImage);
  };

  const run = async () => {
    setLoading(true);

    if (!image) return;

    const form = new FormData();
    form.append("image", image);

    await axios.post(`http://localhost:5000/upload`, form, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="image-upload-container">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Choose an Image"
            className="picture"
          />
        ) : (
          <span className="picture__image">Choose an Image</span>
        )}
      </label>

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
          onClick={() => setImage(null)}
          className="clear-button"
          disabled={loading || !image}
        >
          Clear Image
        </button>

        <button
          onClick={run}
          className="check-button"
          disabled={!image}
          style={{ width: "175px" }}
        >
          {loading ? <Loader /> : "Face Check Now"}
        </button>
      </div>

      {/* {urls_images && modalClose && (
        <Modal onClose={() => setmodalClose(false)} />
      )} */}
    </div>
  );
};

export default ImageUpload;

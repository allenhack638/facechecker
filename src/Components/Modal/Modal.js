import React from "react";
import "./Modal.css";
import { getFavicon, checkImage } from "../Functions";
import Image from "../Image";
const Modal = ({ data, onClose }) => {
  console.log(data);
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h1>Fetched Results</h1>
        <ul className="auto-grid">
          {data.map((item) => (
            <div href="#" className="image_item" key={item.indexDB}>
              <img src={item.base64} alt={item.guid} srcSet="" />
              <div className="content-items">
                <Image item={item.url} />
                {/* <img
                  src={
                    checkImage(getFavicon(item.url))
                      ? getFavicon(item.url)
                      : "https://cdn-icons-png.flaticon.com/512/5602/5602732.png"
                  }
                  alt="Profile Icon"
                  className="favi-icon"
                /> */}
                <a
                  href={item.url}
                  className="item-url"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.url}
                </a>
                <div className="score">{item.score}</div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;

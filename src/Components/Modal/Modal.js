import React from "react";
import "./Modal.css";

const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h1>Fetched Results</h1>
        <ul class="auto-grid">
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div className="content-items">
              <div className="link">Hello World</div>
              <div className="score">94</div>
            </div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
          <a className="image_item">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt=""
              srcset=""
            />
            <div>Hello World</div>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Modal;

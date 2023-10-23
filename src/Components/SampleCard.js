import React from "react";

const SampleCard = ({ data }) => {
  console.log(data);
  return (
    <div className="card">
      <div className="card-details">
        <div className="score">
          <strong>{data.score}</strong>
        </div>
        <div className="url">
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.url}
          </a>
        </div>
      </div>
      <div className="image-placeholder">
        <p className="image-text">{data.image_base64}</p>
      </div>
    </div>
  );
};

export default SampleCard;

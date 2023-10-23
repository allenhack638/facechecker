import React, { useState, useEffect } from "react";
import { getFavicon, checkImage } from "./Functions";

function Image({ item }) {
  const [faviconSrc, setFaviconSrc] = useState(
    require("./../Assets/loading image.png")
  );
  useEffect(() => {
    async function fetchFavicon() {
      try {
        const imageUrl = getFavicon(item);
        const response = await checkImage(imageUrl);

        if (response) {
          setFaviconSrc(imageUrl);
        } else {
          setFaviconSrc(
            "https://cdn-icons-png.flaticon.com/512/5602/5602732.png"
          );
        }
      } catch (error) {
        console.error("Error:ddddd", error);
        setFaviconSrc(
          "https://cdn-icons-png.flaticon.com/512/5602/5602732.png"
        );
      }
    }

    fetchFavicon();
  }, [item.url]);

  return <img src={faviconSrc} alt="Profile Icon" className="favi-icon" />;
}

export default Image;

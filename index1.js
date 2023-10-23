// import axios from "axios";
// import fileType from "file-type";

// async function checkImage(url) {
//   try {
//     const response = await axios.get(url, { responseType: "arraybuffer" });

//     if (response.status === 200) {
//       const imageType = fileType(response.data);

//       if (imageType && imageType.mime.startsWith("image/")) {
//         console.log("It's an image.");
//       } else {
//         console.log("It's not an image.");
//       }
//     } else {
//       console.log("Failed to fetch the image.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// const faviconURL = "https://google.com/favicon.ico";
// checkImage(faviconURL);

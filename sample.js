const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const multer = require("multer");
const path = require("path");
const FormData = require("form-data");
const fs = require("fs");

const TESTING_MODE = true;
const APITOKEN =
  "HVgJKyDcslvnJC+331VzzARBNZ/ZcqOqbOIxypdRcGsB/4UHykwAdH/R63GLVhyFosk+nEusZOU=";

const search_by_face = async (image_file) => {
  if (TESTING_MODE) {
    console.log(
      "****** TESTING MODE search, results are inacurate, and queue wait is long, but credits are NOT deducted ******"
    );
  }

  const site = "https://facecheck.id";
  const headers = {
    accept: "application/json",
    Authorization: APITOKEN,
  };

  let form = new FormData();
  form.append("images", fs.createReadStream(image_file));
  form.append("id_search", "");

  let response = await axios.post(site + "/api/upload_pic", form, {
    headers: {
      ...form.getHeaders(),
      accept: "application/json",
      Authorization: APITOKEN,
    },
  });
  response = response.data;

  if (response.error) {
    return [`${response.error} (${response.code})`, null];
  }

  const id_search = response.id_search;
  console.log(`${response.message} id_search=${id_search}`);
  const json_data = {
    id_search: id_search,
    with_progress: true,
    status_only: false,
    demo: TESTING_MODE,
  };

  while (true) {
    response = await axios.post(site + "/api/search", json_data, {
      headers: headers,
    });
    response = response.data;
    if (response.error) {
      return [`${response.error} (${response.code})`, null];
    }
    if (response.output) {
      return [null, response.output.items];
    }
    console.log(`${response.message} progress: ${response.progress}%`);
    await new Promise((r) => setTimeout(r, 1000));
  }
};

const run = async (fileLocation) => {
  // Search the Internet by face
  const [error, urls_images] = await search_by_face(`Images/${fileLocation}`);
  if (urls_images) {
    urls_images.forEach((im) => {
      const score = im.score; // 0 to 100 score how well the face is matching found image
      const url = im.url; // url to webpage where the person was found
      const image_base64 = im.base64; // thumbnail image encoded as base64 string
      console.log(`${score} ${url} ${image_base64.slice(0, 32)}...`);
    });
    console.log(error, urls_images);
    return [error, urls_images];
  } else {
    console.log(error);
    return [error, null];
  }
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let fileLocation = undefined;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images");
  },
  filename: function (req, file, cb) {
    fileLocation = file.originalname;
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const response = await run(fileLocation);
  res.json(response);
});

app.listen(5000, () => {
  console.log("Proxy server is running on port 5000");
});

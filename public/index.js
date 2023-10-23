const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const https = require("https");

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

const run = async (selectedFile) => {
  const [error, urls_images] = await search_by_face(selectedFile);

  if (urls_images) {
    urls_images.forEach((im) => {
      const score = im.score; // 0 to 100 score how well the face is matching found image
      const url = im.url; // url to webpage where the person was found
      const image_base64 = im.base64; // thumbnail image encoded as base64 string
      console.log(`${score} ${url} ${image_base64.slice(0, 32)}...`);
    });
  } else {
    console.log(error);
  }
};

document.getElementById("checkButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    await run(selectedFile);
  } else {
    alert("Please select an image to check.");
  }
});

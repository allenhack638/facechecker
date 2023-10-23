const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const https = require('https');


app.use(cors())
app.use(express.json())

const TESTING_MODE = true;
const APITOKEN = 'HVgJKyDcslvnJC+331VzzARBNZ/ZcqOqbOIxypdRcGsB/4UHykwAdH/R63GLVhyFosk+nEusZOU=';


// const downloadImage = (url, filename) => {
//   return new Promise((resolve, reject) => {
//     const file = fs.createWriteStream(filename);
//     https.get(url, response => {
//       response.pipe(file);
//       file.on('finish', () => {
//         file.close(resolve);
//       });
//       file.on('error', reject);
//     });
//   });
// };


const search_by_face = async (image_file) => {
  if (TESTING_MODE) {
    console.log('****** TESTING MODE search, results are inacurate, and queue wait is long, but credits are NOT deducted ******');
  }


  const site = 'https://facecheck.id';
  const headers = {
    accept: 'application/json',
    Authorization: APITOKEN,
  };


  let form = new FormData();
  form.append('images', fs.createReadStream(image_file));
  form.append('id_search', '');


  let response = await axios.post(site + '/api/upload_pic', form, {
    headers: {
      ...form.getHeaders(),
      'accept': 'application/json',
      'Authorization': APITOKEN
    }
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
    response = await axios.post(site + '/api/search', json_data, { headers: headers });
    response = response.data;
    if (response.error) {
      return [`${response.error} (${response.code})`, null];
    }
    if (response.output) {
      return [null, response.output.items];
    }
    console.log(`${response.message} progress: ${response.progress}%`);
    await new Promise(r => setTimeout(r, 1000));
  }
};


const run = async () => {
  // await downloadImage('https://www.indiewire.com/wp-content/uploads/2018/01/daniel-craig.jpg?w=300', 'daniel.jpg');

  // Search the Internet by face
  const [error, urls_images] = await search_by_face('image/daniel.jpg');


  if (urls_images) {
    return (urls_images)
  } else {
    console.log(error);
  }
}

app.get('/api/allmatchingfaces', async (req, res) => {
   try {
    let data  = await run()
    res.send(data)
   } catch (error) {
    res.send(error)
   }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import { ImgurClient } from 'imgur';
import 'dotenv/config'
import axios, { AxiosRequestConfig } from 'axios'
import * as fs from 'fs'
import { createAlbum } from './album';


let accessToken = process.env.ACCESS_TOKEN
export const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});

const updateFile = async ({ imgSource, name }: { imgSource: string, name: string }) => {
  try {
    console.log('start upload image file name :' + name)
    const result = await client.upload({
      image: imgSource,
      type: 'base64',
      name,
    })
  } catch (e) {
    console.log(e)
  }
}

function toBase64(filePath: string) {
  const img = fs.readFileSync(filePath);

  return Buffer.from(img).toString('base64');
}

const getImageIds: () => Promise<string[]> = async () => {
  let page = 0
  let results: string[] = []
  let getResponse = async (page: number) => {

    let config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.imgur.com/3/account/hiunji6431415/images/ids/${page}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    return axios<GetImageIdsResponse>(config).then(res => res.data)
  }
  while (true) {
    const { data } = await getResponse(page)
    results = results.concat(data)
    page++
    if (data.length === 0) break
  }
  return results
}

const uploadFolderImages = async (path: string) => {
  try {
    const files = fs.readdirSync(path)
    for (let file of files) {
      const result = toBase64(path + '/' + file)
      await updateFile({ imgSource: result, name: file.split('.')[0] })
    }
    console.log(`success upload files, total : ${files.length}`)
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
}
const getImageInfo = async () => {
  let getResponse = (page: number) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.imgur.com/3/account/hiunji6431415/images/${page}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };
    return axios<GetImagesResponse>(config).then(res => res.data)
  }

  let page = 0
  let result: Datum[] = []
  while (true) {
    const { data } = await getResponse(page)
    result = result.concat(data)
    page++
    if (data.length === 0) break
  }
  return result
}


const getImagesDeleteHash = async () => {
  const data = await getImageInfo()
  return data.map(img => img.deletehash)
}

const deleteImages = async () => {
  try {
    const imageDeleteHashs = await getImagesDeleteHash()
    for (let deleteHash of imageDeleteHashs) {
      deleteImageApi(deleteHash)
    }
    console.log('success delete images')
  } catch (e) {
    console.log('error delete images')
  }
}
const deleteImageApi = async (deleteHash: string) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://api.imgur.com/3/account/hiunji6431415/image/${deleteHash}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  let result = await axios(config)
}

const printImageInfoToJson = async () => {
  const images = await getImageInfo()
  let jsonData = '{"data":{'
  for (let [index, { name, link }] of images.entries()) {
    jsonData += `"${name}":"${link}" ${index === images.length - 1 ? '' : ','}`
  }
  jsonData += "}}"
  let jsonObj = JSON.parse(jsonData);
  let jsonContent = JSON.stringify(jsonObj, null, 2);
  fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}

// createAlbum({ title: 'dannytest', description: 'description' })
// uploadFolderImages('./assets/slope')
// uploadImagesToAlbum('mb2JyNG')
printImageInfoToJson()
// deleteImages()





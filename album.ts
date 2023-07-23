
import 'dotenv/config'
import axios, { AxiosRequestConfig } from 'axios'
export const createAlbum = async ({ title, description }: { title: string, description: string }) => {
  let data = new FormData();
  data.append('title', title);
  data.append('description', description)

  let config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgur.com/3/album',
    headers: {
      'Authorization': 'Bearer 8c292a6f9b01eec2b9722b760a6d7aa28f3b3e35',
    },
    data: data
  };

  const result = await axios(config).then(res => res.data)
  console.log(result)
}

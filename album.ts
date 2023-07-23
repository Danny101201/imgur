
import axios, { AxiosRequestConfig } from 'axios'
export const createAlbum = async ({ title, description, accessToken }: { title: string, description: string, accessToken: string }) => {
  let data = new FormData();
  data.append('title', title);
  data.append('description', description)

  let config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgur.com/3/album',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    data: data
  };

  const result = await axios(config).then(res => res.data)
  console.log(result)
}

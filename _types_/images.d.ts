interface GetImageIdsResponse {
  data: string[];
  success: boolean;
  status: number;
}

interface GetImagesResponse {
  data: Datum[];
  success: boolean;
  status: number;
}

interface Datum {
  id: string;
  title?: string;
  description?: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  vote?: any;
  favorite: boolean;
  nsfw?: any;
  section?: any;
  account_url: string;
  account_id: number;
  is_ad: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  tags: any[];
  ad_type: number;
  ad_url: string;
  edited: string;
  in_gallery: boolean;
  deletehash: string;
  name: string;
  link: string;
}
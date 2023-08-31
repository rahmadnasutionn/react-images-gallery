

interface ImageSource {
  landscape: string;
  large: string
  large2x: string;
  medium: string;
  original: string;
  potrait: string;
  small: string;
  tiny: string;
}

export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  liked: boolean;
  photographer: string;
  photographer_id: number
  photographer_url: string;
  url: string;
  alt: string;
  src: ImageSource;
};

export interface PexelResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsImage[];
  next_page: string;
  prev_page: number;
}
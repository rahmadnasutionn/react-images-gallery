import * as React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { 
  getInitialImage, 
  loadMoreImage, 
  setLoading 
} from '../redux/imageSlice';
import ImageCard from './ImageCard';
import { PexelResponse, PexelsImage } from '../interfaces';

const API_KEY = 'xgtEdxDsYWZmQzE2N7LdhqkrjYLfCgI8bP2F5KAQw5gulMpgmgyOYqXi'

async function fetchImages(url: string): Promise<PexelResponse> {
  const headers = { Authorization: API_KEY }
  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
}

function ImageList() {
  const dispatch = useDispatch();
  const {
    query,
    photos,
    isLoading,
    next_page,
  } = useSelector(
    (state: RootState) => state.image
  );

  const loadMoreImages = async (url: string) => {
    dispatch(setLoading());
    try {
      const response = await fetchImages(url);
      if (response?.photos) {
        dispatch(loadMoreImage(response));
      }
    } catch (error) {
      throw error;
    }
  };

  const handleScroll = () => {
    const scrollTop = 
      window.innerHeight + document.documentElement.scrollTop + 150;
    const isBottom = scrollTop > document.documentElement.offsetHeight;
    if (isBottom && !isLoading && next_page) {
      loadMoreImages(next_page);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [next_page]);

  React.useEffect(() => {
    const fetchInitialImage = async () => {
      try {
        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=8`;
        const data = await fetchImages(url);

        if (data?.photos) {
          dispatch(getInitialImage(data))
        }
      } catch (error) {
        throw error;
      }
    }

    fetchInitialImage();
  }, [query]);

  return (
    <section className='w-[90vw] grid gap-8 mx-auto pb-20 photos'>
      {photos.length > 0 ? (
        photos.map((photo: PexelsImage) => (
          <ImageCard
            key={`key-${photo.id}_yaitu_${photo.alt}`}
            photo={photo}
          />
        ))
      ) : (
        <>
          {[1, 2, 3, 4, 5].map((item: number) => (
            <div 
              key={`key-${item}`} 
              className='w-60 rounded h-[400px] bg-neutral-300 animate-pulse'
            />
          ))}
        </>
      )}

      {isLoading && (
        <div className="flex w-full mx-auto items-center justify-center">
          <div className="loader" />
        </div>
      )}

    </section>
  );
};

export default ImageList;
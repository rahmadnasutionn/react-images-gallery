import * as React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { 
  getInitialImage, 
  loadMoreImage, 
  setError, 
  setLoading 
} from '../redux/imageSlice';
import useIntersectionObserver from '../lib/hooks';
import Loading from './Loading';
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
  const [isIntersecting, ref] = useIntersectionObserver<HTMLDivElement>();
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
    if (isBottom && !isLoading && next_page && isIntersecting) {
      loadMoreImages(next_page);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [next_page, isIntersecting]);

  React.useEffect(() => {
    const fetchInitialImage = async () => {
      try {
        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=8`;
        const data = await fetchImages(url);

        if (data?.photos) {
          dispatch(getInitialImage(data))
        }
      } catch (error) {
        dispatch(setError());
      }
    }

    fetchInitialImage();
  }, [query]);

  return (
    <section className='w-[90vw] grid gap-8 mx-auto pb-20 photos'>
      {photos.length > 0 ? (
        photos.map((photo: PexelsImage) => (
          <div 
            key={`key-${photo.id}`} 
            className="relative overflow-hidden group"
            ref={ref}
          >
            <ImageCard 
              photo={photo}
            />
          </div>
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
          <Loading />
        </div>
      )}

    </section>
  );
};

export default ImageList;
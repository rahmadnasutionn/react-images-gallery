import * as React from 'react';
import { PexelsImage } from '../interfaces'
import { useIntersectionObserver } from '../lib/hooks';
import PlaceholderImage from './PlaceholderImage';

function ImageCard({ photo }: { photo: PexelsImage }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});

  return (
    <div 
      className="relative overflow-hidden group"
      ref={ref}
    >
      <article 
        aria-label='Card Image'
      >
        <PlaceholderImage
          url={photo?.src.large}
          thumbnail={photo?.src.medium}
          alt={photo.photographer}
          isVisible={Boolean(!!entry?.isIntersecting)}
        />
        <div 
          className='transition-all ease-linear duration-300 translate-y-[100%] group-hover:translate-y-0 absolute bottom-0 left-0 w-full py-1 px-4 bg-black/60'
        >
          <h4 className='text-xl mb-1 text-zinc-100 font-normal tracking-wider'>
            Photo by {' '}
            <a 
              href={photo.photographer_url}
              target='_blank'
              rel='noreferrer'
              className='text-blue-300'
            >
              {photo.photographer}
            </a>
          </h4>
          <a 
            href={photo.url}
            target='_blank'
            className='flex flex-wrap text-lg text-zinc-100 hover:text-zinc-200 font-normal tracking-wider'
          >
            {photo.alt}
          </a>
        </div>
      </article>
    </div>
  )
}

export default ImageCard
import { PexelsImage } from '../interfaces'
import PlaceholderImage from './PlaceholderImage';

interface PropTypes {
  photo: PexelsImage;
}

function ImageCard({ photo }: PropTypes) {
  return (
    <article 
      aria-label='Card Image'
    >
      <PlaceholderImage
        url={photo?.src.large}
        thumbnail={photo?.src.medium}
        alt={photo.photographer}
        isVisible
        className='w-full h-[400px] object-cover rounded'
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
  )
}

export default ImageCard
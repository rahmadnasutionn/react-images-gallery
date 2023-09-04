import { useImageLoad } from '../lib/hooks';

interface PlaceholderImageType {
  url: string;
  thumbnail?: string;
  alt: string;
  isVisible: boolean;
  className?: string;
}

function PlaceholderImage({
  url = '',
  thumbnail = '',
  alt = '',
  isVisible,
  className,
}: PlaceholderImageType) {
  const { handleImageLoad, originalImageStyle, thumbnailStyle } = useImageLoad();

  const canLoad = isVisible && url && thumbnail;
  return (
    <>
      {canLoad ? (
        <>
        <img 
          src={thumbnail || ''}
          alt={alt || ''}
          style={{
            ...thumbnailStyle,
            height: '400px'
          }}
          width={'100%'}
          className='w-full object-cover h-[400px] rounded'
        />

        <img 
          src={url}
          alt={alt || ''}
          style={{
            ...originalImageStyle,
            height: '400px'
          }}
          width={'100%'}
          onLoad={handleImageLoad}
          className={[
            'w-full object-cover h-[400px] rounded', 
            className,
          ].join(' ')}
        />
        </>
      ) : (
        <div className='w-[90vw] grid gap-8 mx-auto pb-20 photos'>
          <div className='w-60 bg-gray-300 animate-pulse h-[400px]' />
        </div>
      )}
    </>
  )
}

export default PlaceholderImage
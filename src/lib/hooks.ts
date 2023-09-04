import * as React from 'react';

interface ImageLoadType {
  handleImageLoad: () => void;
  thumbnailStyle: React.CSSProperties;
  originalImageStyle: React.CSSProperties;
}

export function useImageLoad(): ImageLoadType {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleImageLoad = () => setIsLoaded(true);

  const thumbnailStyle: React.CSSProperties = {
    display: isLoaded ? 'none' : 'block',
    filter: 'blur(10px)',
    transition: 'display 0ms ease-out 500ms'
  };

  const originalImageStyle: React.CSSProperties = {
    opacity: isLoaded ? 1 : 0,
    display: 'block',
    transition: 'opacity 500ms ease-in 0ms'
  };

  return {
    handleImageLoad,
    thumbnailStyle,
    originalImageStyle,
  }
}

export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
  }: IntersectionObserverInit,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  React.useEffect(() => {
    const node = ref?.current;

    if (!node || frozen || typeof IntersectionObserver !== 'function') return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

  }, [
    ref?.current,
    threshold,
    root,
    rootMargin,
    frozen
  ])
  
  return entry
}
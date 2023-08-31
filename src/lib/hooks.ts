import * as React from 'react';

export function useDocumentTitle(title: string): void {
  React.useEffect(() => {
    document.title = title + ' - ' + 'Treloo';
  }, [title]);
};

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

export default function useIntersectionObserver<T extends HTMLElement>(): [
  boolean,
  React.Ref<T>
] {
  const [intersecting, setIntersecting] = React.useState<boolean>(false)
  const [element, setElement] = React.useState<HTMLElement>()
  React.useEffect(() => {
    if (!element) return
    const observer = new IntersectionObserver((entries) => {
      setIntersecting(entries[0]?.isIntersecting)
    })
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [element])

  return [intersecting, (el) => el && setElement(el)]
}
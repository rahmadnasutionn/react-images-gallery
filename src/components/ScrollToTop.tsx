import * as React from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai';
import cn from 'classnames';

function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const goToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed right-6 bottom-6 z-50',
        isVisible ? 'block' : 'hidden'
      )}
    >
      <button
        type='button'
        aria-label='Scroll to Top'
        className='py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center'
        onClick={goToTop}
      >
        <AiOutlineArrowUp className='w-6 h-6' />
        <span className="sr-only">Arrow Up</span>
      </button>
    </div>
  );
};

export default ScrollToTop;
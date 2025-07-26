import { useState, useEffect } from 'react';

const useIsDesktop = (breakpoint = 1024) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isDesktop;
};

export default useIsDesktop;

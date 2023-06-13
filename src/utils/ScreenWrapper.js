import React from 'react';

const ScreenWrapper = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width < 360) {
    return <p className='text-primary text-center'>Does not work on smaller screens</p>;
  }

  return <>{children}</>;
};

export default ScreenWrapper;

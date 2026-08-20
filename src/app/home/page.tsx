import React from 'react';
import Banner from './banner/page';
import QuickDonationCard from './QuickDonationCard/page';

const HomePage = () => {
  return (
    <div className='relative h-full'>
      <div>
        <Banner />
      </div>

      {/* QuickDonationCard-কে সব সময় Horizontally Center রাখার জন্য */}
      <div className='absolute top-3/4 sm:top-11/12 left-1/2 -translate-x-1/2 w-11/12 md:w-10/12 z-20'>
        <QuickDonationCard />
      </div>
    </div>
  );
};

export default HomePage;
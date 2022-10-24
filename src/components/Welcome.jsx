import teddy from '../assets/mocha.gif'
import React from 'react';
import { useAuth } from '../context/AuthProvider';

export default function Welcome() {
   const {currentUser} = useAuth();



  return (
<>
  <div className='py-20 md:py-32 lg:py-48
  lg:h-[29rem] md:h-[26rem] h-[18rem] bgRelative'>

      <div className='item-center justify-center flex'>
      <img src={teddy} alt="teddy" className='object-cover h-18 w-18 '/>
      </div>
      <div className='text-center'>
      <h2 className='tracking-widest font-semibold'>
          <span> Welcome <span className='underline capitalize
           text-[#80809f] text-lg md:text-xl lg:text-xl' >{currentUser.displayName}</span> </span>
      </h2>
      <h3 className='font-semibold capitalize text-sm md:text-lg lg:text-xl text-gray-500'>
        Please Select a Chat to Start Message.
      </h3>

      </div>
    </div>
  </>
  )
}



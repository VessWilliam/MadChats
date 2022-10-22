import teddy from '../assets/mocha.gif'
import React from 'react';
import { useAuth } from '../context/AuthProvider';

export default function Welcome() {
   const {currentUser} = useAuth();



  return (
<>
  <div className='pt-36 md:pt-36 lg:pt-72 lg:col-span-2 lg:h-[37rem]
       md:h-[26rem] h-[25rem] bgRelative'>

      <div className='item-center justify-center flex'>
      <img src={teddy} alt="teddy" className='object-cover h-48 w-48'/>
      </div>
      <div className='text-center'>
      <h2 className='tracking-widest font-semibold'>
          <span> Welcome <span className='underline capitalize
           text-[#80809f] text-xl' >{currentUser.displayName}</span> </span>
      </h2>
      <h3 className='font-semibold capitalize text-gray-500'>
        Please Select a Chat to Start Message.
      </h3>

      </div>
    </div>
  </>
  )
}



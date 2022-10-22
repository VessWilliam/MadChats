import React from 'react'
import Logo from '../assets/Logo.png'

export default function Brands() {
  return (
    <>
    <div className=' flex-shrink-0 p-2 flex flex-col 
    mt-24 bottom-0 w-[300px] item-center justify-center mx-auto'>
    <img src={Logo} 
      className='h-[200px] w-[400px] rounded object-contain justify-center' 
      alt="" />
    </div>
    <div className='pt-2 items-center'>
      <h1>Mad # Tag</h1>
      </div>
    </>
  )
}

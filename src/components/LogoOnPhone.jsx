import React from 'react'
import Logo from '../assets/Logo.png'

export default function LogoOnPhone() {
  return (
    <>
        <div className="flex-shrink-0 
        flex items-center 
        top-0 flex-col mx-auto 
        sticky pb-0">
        <img src={Logo} 
        alt="logo" 
        className="h-25 w-32 object-contain top-0 pb-0 -z-10" />
        <h2 className="relative justify-center 
        tracking-[0.5rem] top-0 text-gray-600 uppercase pt-0
        items-center hidden lg:flex  ">Mad # Tag</h2>
        </div>
    </>
  )
}

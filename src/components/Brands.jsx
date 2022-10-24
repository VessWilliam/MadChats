import React from "react";
import Logo from "../assets/Logo.png";

export default function Brands() {
  return (
    <>
      <div
        className=" flex-shrink-0 p-2 flex flex-col mt-10 bottom-0 item-center
         justify-center mx-auto"
      >
        <img
          src={Logo}
          className="h-[10rem]
           lg:w-[25rem] md:w-[20rem] w-[15rem] rounded object-contain justify-center"
          alt=""
        />
      </div>
        <h1 className="text-sm">Mad # Tag</h1>
    </>
  );
}

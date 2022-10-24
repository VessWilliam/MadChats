import React from "react";
import UserProfile from "./UserProfile";

export default function AllUsers() {
  return (
    <>
      <ul className=" py-1 relative overflow-y-auto scrollbarDesign h-[5rem] md:h-[15rem] lg:h-[18rem]">
        <h2 className="hidden md:flex lg:flex mb-1 ml-2 tracking-[0.1rem] underline text-gray-700 uppercase">
          buddy
        </h2>
        <li>
          <div className="flex flex-col items-start px-2 text-sm border-rounded">
            <UserProfile />
          </div>
        </li>
      </ul>
    </>
  );
}

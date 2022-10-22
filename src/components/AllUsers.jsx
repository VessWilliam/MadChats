import React from "react";
import UserProfile from "./UserProfile";

export default function AllUsers() {
  return (
    <>
      <ul className="relative overflow-y-auto scrollbarDesign h-[4rem] md:h-[4em] lg:h-[20rem]">
        <h2 className="hidden lg:flex mb-1 ml-2 tracking-[0.1rem] underline text-gray-700 uppercase">
          buddy
        </h2>
        <li>
          <div className="flex flex-col items-start px-3 text-sm border-rounded">
            <UserProfile />
          </div>
        </li>
      </ul>
    </>
  );
}

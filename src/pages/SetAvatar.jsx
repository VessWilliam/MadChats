import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import loader from "../assets/loader.gif";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";

function className(...classs) {
  return classs.filter(Boolean).join("");
}

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectAvatar, setSelectAvatar] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectAvatar === undefined) {
      return console.log("Please select avatar");
    }
    try {
      console.log(avatar[selectAvatar]);
      await updateProfile(auth.currentUser, {
        photoURL: avatar[selectAvatar],
      });
      console.log("success");
      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        photoURL: avatar[selectAvatar],
      });
      navigate("/");
    } catch (erro) {
      console.log(erro);
      console.log(avatar[selectAvatar]);
    }
  };

  useEffect(() => {
    const data = [];
    function loadData() {
      for (let i = 0; i < 4; i++) {
        const image = `${api}/${Math.round(Math.random() * 1000)}.svg`;
        data.push(image);
      }
      setIsLoading(false);
      setAvatar(data);
    }
    loadData();
  }, []);

  console.log(avatar);

  return (
    <>
      {isLoading ? (
        <div
          className="flex items-center justify-center 
    mx-auto h-screen w-screen"
        >
          <img
            src={loader}
            alt=""
            className="w-36 h-36 object-cover object-center block"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto h-screen w-screen">
          <div className="relative mt-24 bottom-3 px-8 mx-auto pb-2 tracking-[1rem]">
            <h2 className="uppercase text-slate-400 ">Please pick an Avatar</h2>
          </div>
          <div>
            <form className="space-y-6 mt-3" onSubmit={handleFormSubmit}>
              <div className="flex flex-wrap">
                {avatar.map((avatars, index) => (
                  <div
                    key={index}
                    className="mx-auto flex items-center justify-center"
                  >
                    <div className="w-full md:p-2 p-1">
                      <img
                        className={className(
                          index === selectAvatar
                            ? "border-4 border-purple-500"
                            : "cursor-pointer ",
                          "block object-cover hover:border-4 hover:border-purple-400 relative object-center mx-auto rounded-full w-36 h-36 sm:w-24 sm:h-24 md:h-32 md:w-32"
                        )}
                        src={avatars}
                        alt="avatar"
                        onClick={() => setSelectAvatar(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button type="submit" className="avatarselect">
                Set as Profile Picture
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

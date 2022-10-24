export default function UserSearch({ user }) {
  // console.log(user);
  return (
    <>
      {user && (
        <div className="relative flex pl-2 border-b gap-1 border-b-purple-400">
          <img
            src={user.photoURL}
            alt="profile"
            className="userPhoto h-8 w-8"
          />
          <span className="block gap-3 pt-1 text-sm lg:text-lg text-black">
            {user.username}
          </span>
        </div>
      )}
    </>
  );
}

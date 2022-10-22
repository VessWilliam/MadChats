export default function UserSearch({ user }) {
  // console.log(user);
  return (
    <>
      {user && (
        <div className="relative flex pl-2 border-b gap-1 border-b-purple-400">
          <img
            src={user.photoURL}
            alt="profile"
            className="userPhoto h-10 w-10"
          />
          <span className="block gap-2 text-lg text-black font-semibold">
            {user.username}
          </span>
        </div>
      )}
    </>
  );
}

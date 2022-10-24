import Logout from "./Logout"
import UserBottom from "./UserBottom"

export default function ChatContact() {
  return (
    <div className='relative flex
     items-center justify-between
     overflow-auto h-[4rem] md:h-[5rem] lg:h-[6rem] pt-2 px-3'>
        <UserBottom/>   
        <Logout/>
    </div>
  )
}

  
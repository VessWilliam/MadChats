import Logout from "./Logout"
import UserBottom from "./UserBottom"

export default function ChatContact() {
  return (
    <div className='relative flex
     items-center justify-between
     overflow-auto h-[4rem] lg:h-[6rem] pt-1 px-5'>
        <UserBottom/>   
        <Logout/>
    </div>
  )
}

  
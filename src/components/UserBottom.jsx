import { useAuth } from '../context/AuthProvider'


export default function ChatContainer() {
     
  const { currentUser } = useAuth();

  return (
    <div className='relative flex item-center justify-center pb-2 pl-2 rounded'>
        <img src={currentUser.photoURL} 
       alt="profile"
       className=' h-12 w-12 
       md:h-15 md:w-15 
       object-cover items-center'/>

       <span className='flex 
       ml-3 gap-5 text-xl items-center underline py-2 
       text-gray-400 tracking-[0.5rem]'>
        {currentUser.displayName}
       </span>
    </div>
  )
} 




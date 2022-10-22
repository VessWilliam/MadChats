import { useAuth } from '../context/AuthProvider'


export default function ChatContainer() {
     
  const { currentUser } = useAuth();

  return (
    <div className='relative flex pl-2 rounded'>
        <img src={currentUser.photoURL} 
       alt="profile"
       className=' h-12 w-12 
       md:h-15 md:w-15 lg:h-20 lg:w-20 
       object-cover items-center'/>

       <span className='flex 
       ml-3 gap-4 text-xl lg:text-3xl items-center underline py-4 
       text-gray-400 tracking-[0.5rem]'>
        {currentUser.displayName}
       </span>
    </div>
  )
} 





import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { signout,isAuthenticated } from '../auth';
import { RiHotelBedFill } from "react-icons/ri";

const Header = () => {
  const{user}=isAuthenticated()
  const navigate=useNavigate()
  return (
    <>
         <header className="flex  p-4 justify-between bg-slate-100 " >
          <div className='flex items-center gap-2'>
          <Link to={'/'} className='logo flex items-center gap-1'>
          <RiHotelBedFill className='w-6 h-6'/>
          <span className="font-bold text-xl">BookMyHotel</span>
          </Link>
          <Link className='p-2' to='/hotel'><span className="text-lg">Hotels</span></Link>
          <Link className='p-2' to='/room'><span className="text-lg">Rooms</span></Link>

          </div>
        
          <div className="relative w-80 ">
          <input 
            type="text" 
            placeholder="" 
            className=" w-full pl-10 pr-12 py-2 border  border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 absolute  right-2  top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

          {/* <div className="flex border border-gray-300 rounded-full gap-3 px-4 py-2 shadow-md shadow-grey-300">
          <div>Anywhere</div>
          <div className="border-l border-grey-300 "></div>
          <div> Any times </div>
          <div className="border-l border-grey-300 "></div>

          <div>Add guest</div>
          <div className="border-l border-grey-300 "></div>

          <button className='bg-slate-400 text-white p-2 rounded-full'> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</button>
          </div> */}
          <div className="flex border items-center border-gray-400 rounded-full gap-3 px-4 py-2 shadow-sm shadow-grey-50" >
            {isAuthenticated() && isAuthenticated().user.role===0 &&
            <div className='flex'>
                
               <Link className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden" to='/profile'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg> 
       </Link>  
         <div> 
          &nbsp;{user.name}
        </div> 
            
            </div>
          
            
            }
             {isAuthenticated() && isAuthenticated().user.role===1 &&
             <div className='flex'>
                
             <Link className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden" to='/admin/dashboard'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg> 
     </Link>  
       <div> 
        &nbsp;
      Admin
      </div> 
          
          </div>
            }
            { !isAuthenticated() && 
              <div  className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
  <Link className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden mx-2" to='/signin '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </Link>
              </div>
            }
            {isAuthenticated() &&
              <button className='bg-gray-300 rounded-full overflow-hidden px-1.5 py-1'
              onClick={()=>signout(()=>{
                navigate('/signin')
                  })}
            >Logout</button>
            }
          
   
          </div>
         
      </header>
 
    </>
  );
}

export default Header;

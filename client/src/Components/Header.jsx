import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"


export default function Header() {
  return (
   <header   className="bg-slate-200 shadow-md" >   
        <div className="flex justify-between max-w-6xl items-center mx-auto p-3">
            <Link  to="/"  >
                  <h1  className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500" >Olumide</span>
                    <span  className="text-slate-700">Estate</span>
                 </h1> 
            </Link>
        
        
           <form  className="bg-slate-100 p-3 rounded-lg flex text-sm    items-center w-26 sm:w-64">
            <input  type="text" placeholder="Search..."  className=" w-[80%] sm:w-full bg-transparent focus:outline-none"   /> 
            <FaSearch     />
           </form>
           
           <ul  className="flex gap-4" >
                <Link to="/">
                      <li  className="hidden sm:inline hover:underline"  >Home</li>   
                </Link>      
              
                <Link to="/about" >
                      <li  className="hidden sm:inline hover:underline"  >About</li>   
                </Link>      
             
                <Link to="/sign-up">
                      <li >Sign up</li>   
                </Link>      
                  
           </ul>

        </div>

   </header>
  )
}

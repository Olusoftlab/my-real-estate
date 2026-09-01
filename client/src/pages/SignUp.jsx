import { Link } from "react-router-dom"


export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto ">
         <h1  className="text-3xl text-center font-semibold my-7" >Sign up</h1>
         <form className="flex flex-col gap-4">
              <input  type="text" placeholder="username" id="username"   className="border p-3 rounded-lg bg-white"    />
              <input  type="email" placeholder="email"  id="email" className="border p-3 rounded-lg  bg-white"    />
              <input  type="password" placeholder="password"  id="password"   className="border p-3 rounded-lg  bg-white"    />
              <button  className="bg-slate-700 text-white p-3 cursor-pointer
              rounded-lg uppercase hover:opacity-95 disabled:opacity-80"  >Sign up</button>
              <button className="bg-red-600 cursor-pointer  text-white p-3 rounded-lg uppercase hover:opacity-70"  >Continue with page</button>
         </form>
         <div className="mt-5 flex gap-2">
               <p>Have an account?</p>
               <Link to={"/sign-in"}>
                   <span className="text-blue-700 hover:underline" >Sign in</span>
               </Link> 
         </div>
    </div>
  )
}

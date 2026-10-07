import { BrowserRouter, Route, Routes } from "react-router-dom"
import DeleteInfo from "./Components/DeleteInfo"
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import ProtectedHome from "./Components/ProtectedHome"
import About from "./pages/About"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

export default function App() {
  return (
  
      <BrowserRouter>
            <Header/>
            <Routes>

                  <Route  path="/"  element={<ProtectedHome/>}>
                      <Route   path="/"   element={<Home/>}  />       
                  </Route>   
                  <Route path="/about" element={<About/>} />      
                  <Route path="/sign-in" element={<SignIn/>} />      
                  <Route path="/sign-up" element={<SignUp/>} />
                  <Route  path="/profile"   element={<PrivateRoute/>}>
                      

                       <Route path="/profile" element={<Profile/>} />    
                         
                  </Route>
                  <Route  path="/deleteInfo"  element={<DeleteInfo/>} />     
            </Routes>      
      
      </BrowserRouter>

  )
}

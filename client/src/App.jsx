import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"


export default function App() {
  return (
  
      <BrowserRouter>
            <Header/>
            <Routes>

                  <Route path="/" element={<Home/>} />      
                  <Route path="/about" element={<About/>} />      
                  <Route path="/sign-in" element={<SignIn/>} />      
                  <Route path="/sign-up" element={<SignUp/>} />      
                  <Route path="/profile" element={<Profile/>} />      
                   
            </Routes>      
      
      </BrowserRouter>

  )
}

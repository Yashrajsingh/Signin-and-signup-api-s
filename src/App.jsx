import Home from "./pages/home"
import Signin from "./pages/signin"
import Profile from "./pages/profile.jsx"
import Signup from "./pages/signup"
import Header from "./components/header.jsx"
import Aboutus from "./pages/aboutus"
import PrivateRoute from "./components/privateRoute.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
}

export default App
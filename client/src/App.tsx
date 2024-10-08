import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from "recoil";
import {Authenticated} from "./atom"
import Sidebar from "./components/elements/Sidebar";
import TopBar from "./components/elements/Topbar";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Properties from "./pages/Properties";


const Navigate = () => {

  const navigate = useNavigate(); 
  const location = useLocation();
  const [isAuthenticated, setisAuthenticated] = useRecoilState(Authenticated);

  useEffect(
    ()=>{
      const check = localStorage.getItem("token");

      if(check){
        setisAuthenticated(true);
        if(location.pathname == "/auth"){
          navigate('/')
        }        
      }
      else{
        setisAuthenticated(false);
        if(location.pathname == "/"){
          navigate('/auth')
        }        
      }
    }
    ,[navigate,setisAuthenticated,location])

  return (
    <div>
      {isAuthenticated && (
        <div className="flex flex-row bg-gray-200 w-screen h-screen">
          <div className="z-10">
            <Sidebar/>
          </div>
          <div className="flex flex-col">
            <TopBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/properties' element={<Properties/>} />
            </Routes> 
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path='/onboarding' element={<Onboarding/>}/>
        </Routes>
      )}
    </div>
  )
}

const App = () => {
  return(
    <Router>
      <Navigate/>
    </Router>
  );
}

export default App
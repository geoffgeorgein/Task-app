import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Protected from "./pages/protected";
import { UserContextProvider } from "./userContext";
import Register from "./pages/register";
import LoginPage from "./pages/loginPage";
import { useContext } from "react";
import UserContext from './userContext';

function App() {

  const {setUserInfo,userInfo} = useContext(UserContext);
  console.log("UserINNFo",userInfo);
  // console.log("userInfo",userInfo);
  return (
    <>
      <UserContextProvider>
        <Routes>

        {
          userInfo?<Home />:(
            <>
            
            <Route path={"/login"} element={<LoginPage />} />

            <Route path={"/register"} element={<Register />} />
            <Route path={"/home"} element={<Home />} />
            </>
          )
        }
          
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          ></Route>
          
        </Routes>
      </UserContextProvider>
      
    </>
  );
}

export default App;

import React, {useContext, useEffect} from 'react';
import { UserContext } from './context/UserContext';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    //check if token already exists in local storage
    let token = localStorage.getItem("auth-token");
    if (token === null) {

      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {

      //if token exists in localStorage then use auth to verify token and get user info
      const userRes = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": token },
      });
      // console.log(userRes);
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      {/* <Header1 logout={logout} /> */}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
      </Routes>
    </Router>
  );
}

export default App;

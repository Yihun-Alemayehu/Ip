import React, { useContext, useEffect } from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Home({logout}) {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!userData.user) navigate("./login");
  }, [userData.user, navigate])

  return (
    <div>
      <h1>Welcome {userData.user?.display_name} </h1>
      <button onClick={logout}> Log out </button>
    </div>
  )
}

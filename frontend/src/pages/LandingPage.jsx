// pages/index.js
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();
  useEffect(() => {
    
    console.log(jwtToken);
    if (jwtToken) {
      navigate("/feed");
    }
  }, [jwtToken]);

  return <h1>This is Landing page</h1>;
};

export default LandingPage;




  


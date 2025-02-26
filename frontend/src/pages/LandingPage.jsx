// pages/index.js
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "./ MultiStepForm";

const LandingPage = () => {
  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();
  // useEffect(() => {
    
  //   console.log(jwtToken);
  //   if (jwtToken) {
  //     navigate("/feed");
  //   }
  // }, [jwtToken]);

  return (
    <>
    <MultiStepForm />
    <p>sas</p>
    </>
  )
};

export default LandingPage;




  


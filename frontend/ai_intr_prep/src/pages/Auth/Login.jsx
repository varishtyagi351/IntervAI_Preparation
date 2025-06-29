/*import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import Input from '../../components/Inputs/Input';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle Login form submit 
  const handleLogin = async (e) => {
    e.preventDefault();
  }

  return 
     <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
      <form onSubmit={handleLogin}>
        <Input 
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Adddress"
          placeholder="john@example.com"
          type="text"
        />

        <Input
         value={password}
         onChange={({target}) => setPassword(target.value)}
         label="Password"
         placeholder="Min 8 Character"
         type="password" 
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">Login</button>
        <p className="text-[13px] text-slate-800 mt-3">Don't have an account?{""}
          <button 
           className="font-medium text-primary underline cursor-pointer"
           onClick={()=> {
            setCurrentPage("signup");
           }}
          >
            SignUp
          </button>
        </p>

      </form>
     </div>
}

export default Login */

import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';



const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const{ updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handle Login form submit 
  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here
    if(!validateEmail(email)){
      setError("Please Enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");


    //Login API calls
    try{

       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
           email,
           password,
       });   

       
       
       const { token } = response.data;

       if(token) {
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
       }

    } catch(error){


      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
      <form onSubmit={handleLogin}>
        <Input 
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"  // Fixed typo in "Address"
          placeholder="john@example.com"
          type="email" 
           // Changed from "text" to "email" for better validation
          autocomplete="email" 
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Character"
          type="password" 
          autocomplete="current-password" 
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button 
          type="submit" 
          className="w-full bg-primary text-white py-2.5 rounded-md hover:bg-primary-dark transition-colors mt-2"
        >
          Login
        </button>
        
        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button 
            type="button"  // Added type="button" to prevent form submission
            className="font-medium text-primary underline cursor-pointer bg-transparent border-none"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
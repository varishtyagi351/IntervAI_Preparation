/*import React from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";


const Input = ({value,onChange,label,placeholder,type}) => {
    const [showPassword,setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return <div>
    <label className="text-[13px] text-slate-800">{label}</label>

    <div className="input-box">
        <Input 
         type={type=='password'?(showPassword ?"text":"password"):type}
         placeholder={placeholder}
         className='w-full bg-transparent outline none'
         value={value}
         onChange={(e) => onChange(e)}
        />

        {
            type==='password' && (
                <>
                   {
                    showPassword ? (
                        <FaRegEye 
                          size={22}
                          className="text-primary cursor-pointer"
                          onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                          size={22}
                          className="text-slate-400 cursor-pointer"
                          onClick={() => toggleShowPassword()} 
                        
                        />
                    )
                   }
                </>
            )
        }
    </div>
  </div>
}

export default Input */

import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, autocomplete}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
            <div className="input-box relative">
                <input
                    type={type === 'password' ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md p-2 pr-10"
                    value={value}
                    onChange={onChange}
                    autoComplete={autocomplete}
                />
                {type === 'password' && (
                    <div className="absolute right-3 top-3">
                        {showPassword ? (
                            <FaRegEye
                                size={18}
                                className="text-gray-500 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={18}
                                className="text-gray-500 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
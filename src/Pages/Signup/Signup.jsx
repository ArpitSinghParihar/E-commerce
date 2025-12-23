import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/toastUtil";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const{users,setUsers} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      username: name,
      password: password,
      email: email,
    };
    try {
      const data = users?.find((f)=>f.email == email)
      if(data != null){
        handleError("User already exist go to login..!")
      }
      setUsers([...users,newUser]);
      handleSuccess("Signup Successfully")
      setTimeout(()=>{
        navigate('/login')
      },1000)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='w-full h-screen p-1 flex justify-center items-center'>
      <form
       className='flex flex-col justify-center items-center gap-4 min-h-90 h-auto p-3 border rounded-xl shadow'
        onSubmit={handleSubmit}
      >
        <h2 className='font-bold text-2xl text-center underline p-1 cursor-default'>Signup Page</h2>
        <label className="w-full p-1">
          Name:
          <input
            className="border rounded p-1 w-full"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name..."
          />
        </label>

        <label className="w-full p-1">
          Email:
          <input
            className='border rounded p-1 w-full'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email..."
          />
        </label>
        <label className="w-full p-1">
          Password:
          <input
            className="border rounded p-1 w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password..."
          />
        </label>
        <button
          className='w-full p-1 bg-blue-600 border rounded text-white cursor-pointer'
          type="submit"
        >
          Signup
        </button>
        <p className='text-gray-700 cursor-default'>
          Already have an account?
          <span className="text-blue-600 underline">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;

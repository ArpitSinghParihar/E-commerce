import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/toastUtil";
import { AuthContext } from "../../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { users, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      handleError("All fields are required !");
    }

    const data = users?.find((s) => s.email == email && s.password == password);
    if (data != null) {
      handleSuccess("Login Successfully");
      setUser(data);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      handleError("Invalid email and password..!");
    }
  };

  return (
    <div className="w-full h-screen p-1 flex justify-center items-center">
      <form
        className="flex flex-col justify-center items-center gap-4 min-h-90 h-auto p-3 border rounded-xl shadow-md hover:shadow-2xl transition-all"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl text-center underline">Login Page</h2>
        <label className="w-full p-1">
          Email:
          <input
            className="border rounded p-1 w-full"
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
          className="w-full p-1 bg-blue-600 border rounded text-white cursor-pointer"
          type="submit"
        >
          Login
        </button>
        <p className="text-gray-700 cursor-default">
          Don't have an account?{" "}
          <span className="text-blue-600 underline">
            <Link to={"/signup"}>Signup</Link>
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

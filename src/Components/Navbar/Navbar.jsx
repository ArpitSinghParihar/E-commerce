import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import logo from "../../assets/logo.png";
import { GiShoppingCart } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user, setUser, cart} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  const length = cart.reduce((acc,item)=>{
     return acc+item.qty;
  },0)

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };
  return (
    <div className="flex w-full justify-between items-center p-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-600">
      <div className="flex justify-center items-center p-1 gap-2">
        <img className="w-6 h-6" src={logo} alt="logo" />
        <h1 className="font-bold text-xl md:text-lg text-fuchsia-200">
          E-commerce
        </h1>
      </div>

      <div className="hidden md:flex gap-4 justify-center items-center px-2 text-white">
        <Link to={"/"}>Home</Link>
        {!user ? (
          <button
            className="cursor-pointer  bg-blue-500 px-1 rounded hover:bg-blue-600 text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <>
            <Link to={"/my-products"}>My Products</Link>
            <Link to={"/create-product"}>Create</Link>
            <Link to={"/products/cart"} className="flex text-sm">
              <GiShoppingCart size={25} />
              {length}
            </Link>
            <button
              className="cursor-pointer text-white bg-blue-500 px-1 rounded hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <div
        className="cursor-pointer block text-white  md:hidden"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu size={20} />
      </div>
      {open && (
        <div
          className={`absolute top-12 right-5.5 w-[90%] p-3 flex flex-col gap-2 items-center bg-gray-300 z-1 transition-all duration-300 transform-view rounded `}
        >
          <Link to={"/"}>Home</Link>
          {!user ? (
            <button
              className="cursor-pointer  bg-blue-500 px-1 rounded hover:bg-blue-600 text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <>
              <Link to={"/my-products"}>My Products</Link>
              <Link to={"/create-product"}>Create</Link>
              <Link to={"/products/cart"} className="flex text-sm">
                <GiShoppingCart size={25} />
                {length}
              </Link>
              <button
                className="cursor-pointer text-white bg-blue-500 px-1 rounded hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

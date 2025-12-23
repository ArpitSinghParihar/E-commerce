import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import Cards from "../../Components/Card/Cards";
import noSearch from '../../assets/no_product.png'

const Home = () => {
  const { setQuery,query,filterProduct,value,setValue } = useContext(AuthContext);


  return (
    <div className="w-full flex flex-col gap-8 h-auto mt-2">
      {/* Hero Section */}
      <div className="relative w-full h-screen md:h-96 lg:h-148 bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden rounded-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative  w-full px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Discover Your Next <span className="text-yellow-300">Favorite</span> Product
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 font-light">
              Explore thousands of premium products at unbeatable prices. Shop the latest trends and essentials with fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="px-8 py-3 md:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 text-center w-full sm:w-auto"
              >
                Shop Now
              </Link>
              <button className="px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Shopping Bag Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Bag */}
                  <div className="w-48 h-56 md:w-56 md:h-64 bg-white rounded-lg shadow-2xl flex items-center justify-center relative">
                    {/* Bag Handle */}
                    <div className="absolute -top-6 left-8 right-8 h-16 border-4 border-white rounded-full"></div>
                    {/* Bag Content */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-6xl md:text-7xl mb-4">🛍️</div>
                      <p className="text-blue-600 font-bold text-lg md:text-xl">Premium</p>
                      <p className="text-blue-600 font-bold text-lg md:text-xl">Shopping</p>
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center text-3xl md:text-4xl animate-bounce">
                    ⭐
                  </div>
                  <div className="absolute bottom-8 -left-4 w-12 h-12 md:w-16 md:h-16 bg-pink-300 rounded-full shadow-lg flex items-center justify-center text-2xl md:text-3xl">
                    ❤️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="w-full px-6 md:px-4 lg:px-1">
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
          <input 
            className="border-2 border-gray-300 rounded-lg w-full md:flex-1 px-4 py-2 md:py-3 focus:outline-none focus:border-blue-500 transition-colors"
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
            placeholder="Search your product here..."
          />
          <select
            className="border-2 border-gray-300 rounded-lg px-4 py-2 md:py-3 w-full md:w-auto focus:outline-none focus:border-blue-500 transition-colors"
            onChange={(e)=>setValue(e.target.value)}
            value={value}
          > 
            <option className="text-gray-400" value=""> Filter </option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="lh">Low-high</option>
            <option value="hl">High-low</option>
          </select>
        </div>

        <p className="font-bold text-lg md:text-xl my-6 text-gray-800">All products are listed here...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-12">
          {filterProduct && filterProduct.length>0 ?
            filterProduct.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}> 
                <Cards p={p} />
              </Link>
            )):<div className="w-full h-60 flex justify-center items-center p-2">
                <img className="w-full h-full object-cover" src={noSearch}/>
              </div>}
        </div>
      </div>
    </div>
  );
};

export default Home;

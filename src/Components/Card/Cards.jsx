import React from 'react'

const Cards = ({p}) => {
  return (
    <div className='h-full flex flex-col bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100'>
      {/* Image Section */}
      <div className='relative w-full h-48 sm:h-24 md:h-34 lg:h-44 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group'>
          <img className='h-full w-full object-cover group-hover:scale-110 transition transform duration-300' src="https://picsum.photos/200" alt="image" />
        
      </div>
      {/* Content Section */}     
      <div className='flex flex-col grow p-4 sm:p-5 md:p-4 gap-3'>
        {/* Title */}
        <h2 className='font-bold text-base sm:text-lg md:text-xl text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200'>
          {p?.name}
        </h2>

        {/* Description */}
        <p className='text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 grow'>
          {p?.description}
        </p>

        {/* Footer - Price  */}
        <div className='flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 mt-auto'>
          <div className='flex flex-col'>
            <p className='text-xs text-gray-500'>Price</p>
            <span className='font-bold text-lg sm:text-xl md:text-2xl text-blue-600'>₹{p?.price}</span>
          </div>
          <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95'>
            View
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cards

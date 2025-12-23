import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full h-auto p-2 min-h-16 md:min-h-64 lg:min-h-74 xl:min-h-91  bg-gray-700 rounded md:p-10'>
        <div className='flex flex-col justify-center items-center p-2 h-auto'>
            <div className='hidden md:flex gap-2 w-full md:flex-col lg:flex-row'>
                <div className='flex gap-4 text-white font-bold p-5 w-full'>
                    <Link className='flex flex-col gap-1 w-full'>
                        <p className='text-gray-500 text-sm pb-2'>ABOUT</p>
                        <p>Contact Us</p>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>E-commerce stories</p>
                    </Link>
                    <div className='flex flex-col gap-1 w-full'>
                        <p className='text-gray-500 text-sm pb-2'>GROUP COMPANIES</p>
                        <p>Flipkart</p>
                        <p>Myntra</p>
                        
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <p className='text-gray-500 text-sm pb-2'>HELP</p>
                        <p>Payments</p>
                        <p>Shipping</p>
                        <p>Cancellation & Returns</p>
                        <p>FAQ</p>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <p className='text-gray-500 text-sm w-full pb-2'>CONSUMER POLICY</p>
                        <p>Cancellation & Returns</p>
                        <p>Terms of Use</p>
                        <p>Security</p>
                        <p>Privacy</p>
                        <p>Sitemap</p>
                        <p>ConnectApp</p>
                    </div>
                </div>
                <div className='w-full border lg:border-l  border-gray-500 flex text-white font-bold p-5 gap-6 '>
                    <Link className='flex flex-col gap-1 w-full'>
                        <p className='text-gray-500 pb-2'>Mail Us:</p>
                        <p>parihararpit455@gmail.com</p>
                        <p>+91 9691380973</p>
                        <p>Careers</p>
                        <p>E-commerce stories</p>
                    </Link>
                    <div className='flex flex-col gap-1 w-full'>
                        <p className='text-gray-500 text-sm w-full pb-2'>Registered Office Address:</p>
                        <p>Hackerkernel IT-park</p>
                        <p className='text-sm'>Gandhi nagar abbas nagar, Bhopal</p>
                        
                    </div>
                </div>
            </div>
            <div className='border-t border-gray-500 font-bold text-xs md:sm w-full flex justify-center items-center p-2 text-white'>
                &copy;2025-2028 E-commerce.com
            </div>
        </div>
    </footer>
  )
}

export default Footer

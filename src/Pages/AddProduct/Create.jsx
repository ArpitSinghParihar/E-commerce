import React, { useContext, useState } from 'react'
import { handleError, handleSuccess } from '../../utils/toastUtil';
import { AuthContext } from '../../AuthContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const[name,setName] = useState('');
    const[price,setPrice] = useState(0);
    const[description,setDescription] = useState('');
    const{user, setAllProducts} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handlesubmit = (e)=> {
        e.preventDefault();
        if(!name || !price || !description){
            handleError("All fields are required..!")
            return;
        } 
        const newProduct = {
            id:Date.now().toString(),
            userId:user.id,
            name:name,
            price:price,
            description:description
        }
        setAllProducts(prev => [...prev,newProduct])
        handleSuccess("Product created successfully")
        setTimeout(()=>{
            navigate('/')
        },1000)
    }
  return (
    <div className='w-full h-auto min-h-screen p-1 m-4 flex justify-center items-center '>
      <form className='flex flex-col justify-center items-center gap-6 min-h-90 lg:min-h-100 h-auto p-3 border rounded-xl shadow-md hover:shadow-2xl mt-4'
       onSubmit={handlesubmit}>
        <h2 className='font-bold text-2xl text-center underline'>Add Products</h2>
        <label className='w-full p-1'>Name:
            <input
                className='w-full p-1 border rounded'
                onChange={(e)=>setName(e.target.value)}
                value={name}
                placeholder='Enter product name..'
            />
        </label>
        <label className='w-full p-1'>Price:
            <input
                className='w-full p-1 border rounded'
                onChange={(e)=>setPrice(e.target.value)}
                value={price}
                placeholder='Enter product price..'
                type='number'
            />
        </label>
        <label className='w-full p-1'>Description:
            <input
                className='w-full p-1 border rounded'
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                placeholder='Enter product description..'
            />
        </label>
        <button className='w-full p-1 bg-blue-600 border rounded text-white cursor-pointer hover:scale-101 transition-all transform duration-300 '>Add Product</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Create

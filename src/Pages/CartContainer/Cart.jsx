import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { GrAddCircle } from "react-icons/gr";
import { GrSubtractCircle } from "react-icons/gr";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(AuthContext);

  const decrement = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id == id) {
          const newQty = item.qty - 1;

          return newQty > 0
            ? { ...item, qty: newQty, price: item.unitPrice * newQty }
            : null;
        }
        return item;
      })
      .filter(Boolean);
    // console.log(updatedCart)
    setCart(updatedCart);
  };
  const increment = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id == id) {
        const newQty = item.qty + 1;
        return { ...item, qty: newQty, price: item.unitPrice * newQty };
      }
      return item;
    });
    setCart(updatedCart);
  };
  const totalAmount = cart.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-screen p-1 flex justify-center items-center ">
      {!cart.length > 0 ? (
        <p className="font-bold">Cart is empty...!</p>
      ) : (
        <div className="w-full h-screen mt-5 flex flex-col gap-6 m-2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {cart?.map((c) => (
              <div
                key={c.id}
                className="flex flex-col grow gap-3 p-2 h-auto min-h-44 justify-center items-center shadow-md hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2"
              >
                <Link to={`/product/${c.id}`}>
                  <h2 className="font-bold text-center w-full p-4 ">
                    {c?.name}
                  </h2>
                </Link>
                <div className="w-full p-1">
                  <p className="text-gray-600">{c?.description}</p>
                  <span className="font-medium text-blue-600">₹{c?.price}</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => decrement(c.id)}
                    className="cursor-pointer"
                  >
                    <GrSubtractCircle size={20} />
                  </button>
                  <p className="font-bold "> {c.qty} </p>
                  <button
                    onClick={() => increment(c.id)}
                    className="cursor-pointer"
                  >
                    <GrAddCircle size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Price detail */}
          <div className="flex flex-col gap-2 p-2 h-auto w-full mb-2">
            <div>
              <p className="font-bold">Price Details</p>
            </div>
            <div className="border-t mb-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center items-center "
                >
                  <div className="flex justify-between items-center w-80">
                    <p>
                      {item.name}({item.qty})
                    </p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-2 flex flex-col gap-2 justify-center items-center h-auto">
              <div className=" flex justify-between items-center w-66 md:w-80  ">
                <p className="font-bold text-sm">Total Amount</p>
                <p className="font-semibold">₹{totalAmount}/-</p>
              </div>
              <button
                className="bg-blue-600 px-2 py-1 border rounded-xl text-white cursor-pointer"
                onClick={handlePrint}
              >
                Print reciept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

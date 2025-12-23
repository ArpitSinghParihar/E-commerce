import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { ToastContainer } from "react-toastify";
import { BiSend } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { handleError, handleSuccess } from "../../utils/toastUtil";

const Details = () => {
  const [data, setData] = useState({});
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [review, setReview] = useState("");
  const { user, allProducts, setAllProducts, cart, setCart } =
    useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueProduct = async () => {
      const data = allProducts.find((f) => f.id == id);
      setData(data);
    };
    uniqueProduct();
  }, []);

  const handleEdit = () => {
    setEditId(data.id);
    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
  };

  const handleDelete = () => {
    const update = allProducts.filter((f) => f.id !== data.id);
    setAllProducts(update);
    handleSuccess("Product deleted successfully..✅");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleRem = (d) => {
    const update = data.reviews?.filter((f) => f.id != d.id);
    setData((prevData) => ({ ...prevData, reviews: update }));
    const copy = [...allProducts];
    const index = copy.findIndex((f) => f.id == data.id);
    const updatedData = { ...data, reviews: update };
    copy[index] = updatedData;
    setAllProducts(copy);
  };

  const handleReview = () => {
    if (!review) {
      return;
    }
    const newReview = {
      id: Date.now().toString(),
      userId: user.id,
      review: review,
    };
    const reviews = [...(data.reviews || []), newReview];
    const update = { ...data, reviews };
    const copy = [...allProducts];
    const index = copy.findIndex((f) => f.id == data.id);
    if (index != -1) {
      copy[index] = update;
    }
    setData(update);
    setAllProducts(copy);
    setReview("");
  };

  const handleCart = () => {
    if (!user) {
      handleError("Login First...❗");
      return;
    }
    const storedData = [...cart] || [];
    const index = storedData.findIndex((f) => f.id == data.id);
    if (index != -1) {
      storedData[index].qty += 1;
      storedData[index].price =
        storedData[index].unitPrice * storedData[index].qty;
    } else {
      storedData.push({ ...data, qty: 1, unitPrice: Number(data.price) });
    }
    handleSuccess("Added to cart ✅");
    setCart(storedData);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description) {
      handleError("All fields are required..!");
      return;
    }
    const newProduct = {
      id: data.id,
      userId: user.id,
      name: name,
      price: price,
      description: description,
    };
    setData(newProduct);
    const updatedProduct = allProducts.map((item) =>
      item.id === data.id ? newProduct : item
    );
    setAllProducts(updatedProduct);
    setEditId(null);
    handleSuccess("Product updated successfully...");
  };

  return (
    <div className="w-full relative p-1 flex flex-col gap-2 justify-center items-start mt-3">
      {editId == null ? (
        <div className="w-full flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-col md:flex-row justify-start items-start w-full gap-6">
            <div className="w-full md:w-[40%] h-80 ">
              <img
                className="w-full h-full object-cover rounded-2xl "
                src="https://picsum.photos/200"
                alt="image"
              />
            </div>
            <div className="w-full md:w-[50%] h-auto min-h-34 md:min-h-44 lg:min-h-54 xl-min-h-64 flex flex-col  gap-2">
              <p className=" font-bold p-1 text-2xl"> ⋙{data?.name}</p>
              <p className="w-full text-green-600 p-1">₹{data?.price}</p>
              <p className="w-full p-1">{data?.description}</p>
              {data.userId == user?.id && (
                <div className="flex justify-start items-center gap-2">
                  <button
                    className="text-blue-400 border rounded px-2 cursor-pointer"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 border rounded px-2 cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
              <button className="cursor-pointer" onClick={handleCart}>
                <FaCartPlus size={20} />
              </button>
            </div>
          </div>

          {/* Review functioning........ */}

          <div className="bg-gray-200 w-full p-2 min-h-64 h-auto border rounded-xl">
            <div className="mt-5 flex flex-col gap-3 w-full justify-center items-center">
              <p className="text-center font-bold underline">
                All reviews are listed here...
              </p>
              <div className="my-5 w-full flex justify-center ">
                <textarea
                  className="border rounded px-1 resize-none w-[90%]"
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                  rows={1}
                  placeholder="Write your review here..."
                />
                <button
                  onClick={handleReview}
                  className=" rounded mx-1 cursor-pointer"
                >
                  <BiSend size={24} />
                </button>
              </div>
            </div>

            {/* All reviews list ...........*/}
            <div>
              <span className="font-bold">Reviews:</span>
              {!data.reviews?.length > 0 && (
                <p className="text-gray-400">
                  You are the first to review here....
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.reviews?.map((d) => (
                  <div key={d.id} className="flex flex-col gap-1 w-50">
                    <p className="text-gray-500">{d.userId}: </p>
                    <div className="flex gap-1">
                      <p className="text-gray-500">{d.review}</p>
                      {d.userId == user?.id && (
                        <button onClick={() => handleRem(d)}>
                          <MdOutlineDelete
                            size={20}
                            className="cursor-pointer"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen p-1 flex justify-center items-center">
          <form
            className="flex flex-col justify-center items-center gap-4 min-h-100 h-auto p-3 border rounded-xl shadow"
            onSubmit={handlesubmit}
          >
            <h2 className="font-bold text-2xl text-center underline">
              Update Products
            </h2>
            <label className="w-full p-1">
              Name:
              <input
                className="w-full p-1 border rounded"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter product name.."
              />
            </label>
            <label className="w-full p-1">
              Price:
              <input
                className="w-full p-1 border rounded"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter product price.."
                type="number"
              />
            </label>
            <label className="w-full p-1">
              Description:
              <input
                className="w-full p-1 border rounded"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Enter product description.."
              />
            </label>
            <button className="w-full p-1 bg-blue-600 border rounded text-white cursor-pointer">
              Update Product
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Details;

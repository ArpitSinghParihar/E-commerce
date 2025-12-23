import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import Cards from "../../Components/Card/Cards";
import { Link } from "react-router-dom";
import image from "../../assets/no_product1.png"

const MyProducts = () => {
  const { user, allProducts } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user && allProducts.length > 0) {
      const data = allProducts.filter((f) => f.userId == user.id);
      setData(data);
    }
  }, [user, allProducts]);

  return (
    <div className="w-full font-bold text-center flex flex-col gap-3 mt-3 min-h-screen h-auto">
      Welcome {user.username}
      {data.length === 0 ? (
        <div className="w-full h-screen flex justify-center items-center">
          <img  className="w-80 h-80 " alt="image" src={image}/>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  xl:grid-cols-4 pb-12">
          {data?.map((data) => (
            <Link to={`/product/${data.id}`}>
              <Cards p={data} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;

import { createContext, useEffect, useRef, useState } from "react";
import data from '../data/db.json'
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const[user,setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [allProducts, setAllProducts] = useState(data.products);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  const[cart, setCart] = useState([]);
  const debounceRef = useRef(null);
   const cartKey = `Cart_${user?.id}`;

  useEffect(()=>{
    if(allProducts.length>0){
      const data = JSON.parse(localStorage.getItem('products'))
      setAllProducts(data || [])
    }
  },[])

  // All Users
  useEffect(() => {
    if (users) {
       localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

// single User...
useEffect(()=>{
  if(user){
    return localStorage.setItem("user",JSON.stringify(user))
  }else{
    localStorage.removeItem("user");
  }
})

 // allProducts....
 useEffect(()=>{
    if(allProducts){
      localStorage.setItem("products",JSON.stringify(allProducts))
    }
 },[allProducts])

  useEffect(() => {
    setFilterProduct(allProducts);
  }, [allProducts]);

  //search logic
  const applyFilter = () => {
    let cp = [...allProducts];
    if (query) {
      cp = cp.filter((f) =>
        f.name.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    switch (value) {
      case "az":
        cp.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        break;

      case "za":
        cp.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
        break;

      case "lh":
        cp.sort((a, b) => a.price - b.price);
        break;

      case "hl":
        cp.sort((a, b) => b.price - a.price);
        break;
    }
    setFilterProduct(cp);
  };

  // Search query
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyFilter();
    }, 500);
  }, [query, value, allProducts]);

  // Cart 
  useEffect(()=>{
    if(!user){
      setCart([]);
      return;
    }
    if(user){
     const data = JSON.parse(localStorage.getItem(cartKey))
      setCart(data || [])
    }
  },[user])

  useEffect(()=>{
    if(cart.length>0){
      localStorage.setItem(cartKey,JSON.stringify(cart))
    }
  },[cart])

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        cart,
        setCart,
        value,
        setValue,
        allProducts,
        setAllProducts,
        query,
        setQuery,
        filterProduct,
        setFilterProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

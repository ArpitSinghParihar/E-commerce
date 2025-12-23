import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Details from "./Pages/Detail/Details";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Create from "./Pages/AddProduct/Create";
import Navbar from "./Components/Navbar/Navbar";
import MyProducts from "./Pages/MyProduct/MyProducts";
import Cart from "./Pages/CartContainer/Cart";
import Footer from "./Components/footer/Footer";

function App() {
  return (
    <div className="w-[90%] h-auto min-h-screen flex flex-col m-auto ">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <Home />
            // </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/product/:id"
          element={
            // <PrivateRoute>
              <Details />
            // </PrivateRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-products"
          element={
            <PrivateRoute>
              <MyProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

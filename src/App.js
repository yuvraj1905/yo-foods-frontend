// App.js
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import FoodDetail from "./pages/FoodDetail";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

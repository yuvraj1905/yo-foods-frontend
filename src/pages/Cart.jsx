// Cart.js
import CartItemCard from "../components/CartItemCard";
import CartTotalCard from "../components/CartTotalCard";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useCartContext();
  const cartItems = state.cart;
  const navigate = useNavigate();

  return (
    <div className="py-3 ">
      {cartItems.length > 0 && (
        <h1 className="text-2xl font-bold px-5 ">Cart({cartItems.length})</h1>
      )}
      {cartItems.length ? (
        <div className="md:grid md:grid-cols-3 gap-5 mt-4">
          <main className="md:col-span-2">
            {cartItems.map((product) => (
              <CartItemCard product={product} />
            ))}
          </main>
          <CartTotalCard cartItems={cartItems} dispatch={dispatch} />
        </div>
      ) : (
        <div className="h-[60vh] w-full flex flex-col items-center justify-center  gap-3 ">
          <img
            src={"/images/hungry.jpg"}
            alt="empty bag"
            className="h-36 mt-5 drop-shadow-lg"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold aref-ruqaa-ink-bold">
              Hey, it feels so light!
            </h2>
            <p className="text-sm text-gray-400 aref-ruqaa-ink-regular">
              There's nothing in your Plate. Let's add some items.
            </p>
          </div>

          <button
            className=" text-md mt-5 bg-[#296E4E] p-2 text-white px-3 rounded-lg font-semibold"
            onClick={() => navigate("/")}
          >
            Explore Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

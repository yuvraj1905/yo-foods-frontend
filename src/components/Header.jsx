// Header.js
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

const Header = () => {
  const { state } = useCartContext();
  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center p-5">
      <Link className="text-3xl font-bold" to="/">
        <img
          src={"./logo.jpg"}
          alt={"logo"}
          height={60}
          width={60}
          className="bg-red-200 object-fill rounded-full"
        />
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/cart">
          <button className="text-yellow-500 relative border-[#664229] fill-none rounded-full">
            <FiShoppingCart size={30} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
        <img
          src={"./avatar.png"}
          alt={"avatar"}
          className="w-12 h-12 bg-red-200 border object-fill rounded-full"
        />
      </div>
    </nav>
  );
};

export default Header;

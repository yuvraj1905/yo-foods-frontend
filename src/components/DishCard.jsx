import React from "react";
import { FaShoppingCart, FaStar, FaCheck } from "react-icons/fa"; // FaCheck for checkmark icon
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DishCard({ dish }) {
  const {
    dispatch,
    state: { cart },
  } = useCartContext();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: dish });
  };

  const navigate = useNavigate();
  const notify = () => toast.success(`${dish.name} added to cart.`);

  const isInCart = cart?.some((item) => item.id === dish.id);

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 max-w-sm border border-gray-200"
      onClick={() => {
        navigate(`/food/${dish.id}`);
      }}
    >
      {/* Image Section */}
      <img
        src={dish.previewImg}
        alt={dish.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Dish Info */}
      <div className="mt-4">
        {/* Dish Name */}
        <h3 className="text-lg font-semibold ">{dish.name}</h3>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 mt-2">
          <FaStar size={16} />
          <span className="ml-1 text-sm">{dish.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-start justify-between">
          <div className="mt-2">
            <span className="text-gray-500 line-through mr-2">
              ₹{dish.price * 1.5}
            </span>
            <span className="text-red-500 font-bold text-xl">
              ₹{dish.price}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart) {
                handleAddToCart();
                notify();
              }
            }}
            className={`p-2 rounded-full shadow-lg ${
              isInCart ? "bg-green-500" : "bg-[#296E4E]"
            } text-white`}
          >
            {isInCart ? <FaCheck size={20} /> : <FaShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishCard;

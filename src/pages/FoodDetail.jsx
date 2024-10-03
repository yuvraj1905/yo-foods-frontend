import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";
import { foodItemsDummy } from "../constants";
import { FaSnowflake } from "react-icons/fa";

function FoodDetail() {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const item = foodItemsDummy?.find((food) => food.id === parseInt(id));
    setFoodItem(item);
  }, [id]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const {
    dispatch,
    state: { cart },
  } = useCartContext();
  const isInCart = cart?.some((item) => item.id === foodItem?.id);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: foodItem });
  };
  if (!foodItem) {
    return <div>Loading...</div>;
  }
  const notify = () => toast.success(`${foodItem.name} added to cart.`);

  return (
    <div className="p-5 pt-2 flex flex-col justify-between items-center !bg-white">
      {/* Back Button */}
      <div className="flex justify-between w-full ">
        <button
          className="text-gray-600"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-lg text-yellow-200 border rounded-md bg-[#296E4E] py-1 px-3">
          {foodItem.energyInKcal} Kcal
        </span>
      </div>

      {/* 3D Food Model */}
      <div className="w-full h-[35vh] mb-4 flex justify-center rounded-lg ">
        <model-viewer
          src={process.env.PUBLIC_URL + foodItem.modelUrl}
          alt={foodItem.name}
          ar
          camera-controls
          auto-rotate
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
          // ar-placement="wall"
          // ar-scale="fixed"
          // field-of-view="10deg"
        >
          <button
            slot="ar-button"
            className="bg-white absolute bottom-0 right-0 flex justify-center items-center border p-1 px-3 gap-2 rounded-md"
          >
            {/* 👋 View on your Table */}
            <FaSnowflake size={16} color="#296E4E" />
            <span className="text-md text-[#296E4E] font-semibold ">
              View in AR
            </span>
          </button>
        </model-viewer>
      </div>

      {/* Food Name and Price */}
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold mb-2 ">{foodItem.name}</h1>
        <p className="text-lg text-red-500 font-semibold">₹{foodItem.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center space-x-4 mb-3">
        <button
          className="rounded-md px-3 py-1 font-bold text-white bg-[#296E4E]"
          onClick={decrementQuantity}
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          className="rounded-md px-3 py-1 font-bold text-white bg-[#296E4E]"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>

      {/* Ingredients */}
      <div className="flex flex-col gap-2 self-start py-2 max-w-full">
        <h3 className="text-lg font-bold">Ingredients</h3>
        <div className="flex gap-2 overflow-x-scroll container">
          {foodItem?.ingredients?.map((ingredient, index) => (
            <p
              key={index}
              className=" rounded-lg bg-gray-100 text-lg text-gray-700 min-w-fit px-3 py-1"
            >
              {ingredient}
            </p>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isInCart) {
            handleAddToCart();
            notify();
          }
        }}
        className="bg-[#296E4E] text-white py-2 px-8 rounded-lg font-semibold w-full mx-4 mt-2 text-lg"
      >
        {isInCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default FoodDetail;

import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartItemCard = ({ product }) => {
  const { state, dispatch } = useCartContext();
  const cartItems = state.cart;
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  return (
    <div
      className="m-auto flex flex-col gap-2 px-5 rounded-sm shadow-sm bg-white/[0.6] mb-3 max-w-xl pb-3"
      onClick={() => {
        navigate(`/food/${product.id}`);
      }}
    >
      <div className="flex items-center flex-wrap gap-2 w-full relative">
        <div className="flex flex-wrap xs:flex-nowrap xs:justify-start flex-1 items-center gap-3 relative">
          <div
            className={` bg-black/[0.075] h-28 w-28 rounded-md flex items-center`}
          >
            <img
              src={product.previewImg}
              alt=""
              className="object-fit w-full"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <h2 className="text-xl font-semibold">{product.name}</h2>

            <div className="flex flex-col gap-2 relative">
              <div className="flex gap-2 items-center">
                <span className="text-gray-700 text-sm">Quantity: </span>
                <button
                  className="p-1 bg-slate-200 rounded-md  text-xs disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.id, product?.quantity - 1);
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <span className="h-full w-7 bg-black/[0.075] text-sm rounded-sm flex items-center justify-center">
                  {product?.quantity}
                </span>
                <button
                  className="p-1 bg-slate-200 rounded-md text-xs disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.id, product?.quantity + 1);
                  }}
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <div className="flex gap-1 sm:gap-3 relative">
                <button
                  className="text-xs p-2 w-full rounded-md border sm:text-sm mt-2 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.id, 0);
                  }}
                >
                  Remove from Bag
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end self-start mt-1">
          <span>₹{product.price}</span>
          <span className="text-xs line-through text-gray-600">
            ₹ {product.price * 1.5}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

import React, { useEffect, useState } from "react";
import PriceCard from "./PriceCard";

const CartTotalCard = ({ cartItems, dispatch }) => {
  const [totalPriceOfCartProducts, settotalPriceOfCartProducts] = useState(0);
  const handleCheckout = () => {
    dispatch({ type: "PLACE_ORDER", payload: { totalPriceOfCartProducts } });
  };
  useEffect(() => {
    const subtotal = cartItems?.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    settotalPriceOfCartProducts(subtotal || 0);
  }, [cartItems]);
  return (
    <section className="md:col-span-1 py-7 px-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-4 w-full h-min">
      <h1 className="text-xl aref-ruqaa-ink-bold">Price Details</h1>
      {cartItems?.map((product) => (
        <PriceCard key={product._id} product={product} />
      ))}

      <hr />
      <div className="flex justify-between items-center">
        <p className=" text-gray-600 aref-ruqaa-ink-bold">Total</p>
        <p className="text-2xl aref-ruqaa-ink-bold">
          ₹ {totalPriceOfCartProducts}
        </p>
      </div>

      <div className="w-full py-2   flex gap-4 items-center">
        <button
          className="px-5 bg-[#296E4E] text-white font-semibold w-full py-2 text-center rounded-md  md:text-sm lg:text-base"
          onClick={() => {
            handleCheckout();
          }}
        >
          Place Order
        </button>
      </div>
    </section>
  );
};

export default CartTotalCard;

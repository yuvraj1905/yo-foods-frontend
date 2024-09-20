import React from "react";

const PriceCard = ({ product }) => {
  return (
    <div key={product.id} className=" flex  justify-between  ">
      <p className=" text-gray-600 flex-1">
        {product.name} ({product.quantity})item
      </p>

      <p className="text-lg">₹ {product.quantity * product.price}</p>
    </div>
  );
};

export default PriceCard;

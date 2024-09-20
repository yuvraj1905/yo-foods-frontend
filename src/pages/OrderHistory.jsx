// OrderHistory.js
import { useCartContext } from "../contexts/CartContext";

const OrderHistory = () => {
  const { state } = useCartContext();
  const orders = state.orders;

  return (
    <div className="p-5">
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-5">
              <div>Order ID: {order.id}</div>
              <div>Date: {order.date}</div>
              <div>Subtotal: {order.subtotal} INR</div>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price} INR
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;

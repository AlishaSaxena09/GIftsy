import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { getPreviousOrders, getProducts } from "../lib/mockServer";

const MyAccount = () => {
  const { user, handleLogout } = useContext(UserContext);
  const products = getProducts();
  const previousOrders = getPreviousOrders({
    token: localStorage.getItem("auth-token"),
  });

  return (
    <div>
      <h2 className="text-3xl font-bold my-4">Welcome {user.name}!</h2>
      <button
        onClick={handleLogout}
        className="mb-6 text-white bg-stone-800 text-lg px-6 py-3 uppercase tracking-widest hover:bg-stone-600"
      >
        Logout
      </button>

      <h3 className="text-4xl font-bold my-4">Previous Orders</h3>
      <div className="flex justify-between flex-col items-center">
        {previousOrders.length > 0 ? (
          <>
            {previousOrders
              .slice()
              .sort((a, b) => b.creationTime - a.creationTime)
              .map((order) => (
                <OrderItem products={products} order={order} key={order.id} />
              ))}
          </>
        ) : (
          <p>No previous orders found!</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

const OrderItem = ({ order, products }) => {
  const { products: cartItems } = order;
  return (
    <div className="w-full max-w-xl p-4 border border-gray-200 border-solid rounded-md my-6">
      <h2 className="text-lg font-bold">Order id: #{order.id} </h2>
      <p className="mb-4">
        Order placed on {new Date(order.creationTime).toLocaleString()}
      </p>
      <div className="pb-4">
        {Object.keys(cartItems).map((productId) => {
          const product = products.find((product) => product.id === productId);
          const quantity = cartItems[productId];
          return (
            <div className="flex justify-around items-center">
              <p className="font-bold">{product.name}</p>
              <p>
                {quantity} * ₹{product.price}
              </p>
              <p>₹{quantity * product.price}</p>
            </div>
          );
        })}
      </div>
      <p className="flex justify-between font-bold text-xl border-t border-solid border-gray-200 w-full max-w-xl px-8 pt-4">
        <span>Total:</span>
        <span>
          ₹
          {Object.keys(cartItems).reduce((acc, productId) => {
            const product = products.find(
              (product) => product.id === productId
            );
            if (!product) return acc;
            return acc + cartItems[productId] * product.price;
          }, 0)}
        </span>
      </p>
    </div>
  );
};

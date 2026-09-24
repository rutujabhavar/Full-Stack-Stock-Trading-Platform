import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://tradex-stock-trading-platform.onrender.com/allOrders"
        );

        console.log("Orders:", response.data);

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">
        Orders ({orders.length})
      </h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => {
                const quantity = Number(order.qty);
                const price = Number(order.price);
                const total = quantity * price;

                const isBuy =
                  order.mode?.toUpperCase() === "BUY";

                return (
                  <tr key={order._id || index}>
                    <td>{order.name}</td>

                    <td
                      className={
                        isBuy ? "profit" : "loss"
                      }
                    >
                      {order.mode?.toUpperCase()}
                    </td>

                    <td>{quantity}</td>

                    <td>
                      ₹{price.toFixed(2)}
                    </td>

                    <td>
                      ₹{total.toFixed(2)}
                    </td>

                    <td className="profit">
                      COMPLETED
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions")
      .then((res) => {
        console.log("Positions:", res.data);
        setAllPositions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
      });
  }, []);

  return (
    <>
      <h3 className="title">
        Positions ({allPositions.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock, index) => {
              const curValue =
                Number(stock.price) * Number(stock.qty);

              const pnl =
                curValue -
                Number(stock.avg) * Number(stock.qty);

              const isProfit = pnl >= 0;

              const profClass = isProfit
                ? "profit"
                : "loss";

              const dayClass = stock.isLoss
                ? "loss"
                : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>

                  <td>{stock.name}</td>

                  <td>{stock.qty}</td>

                  <td>
                    {Number(stock.avg).toFixed(2)}
                  </td>

                  <td>
                    {Number(stock.price).toFixed(2)}
                  </td>

                  <td className={profClass}>
                    {pnl.toFixed(2)}
                  </td>

                  <td className={dayClass}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
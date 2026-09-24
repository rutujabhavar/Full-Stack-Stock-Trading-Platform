require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// login signup
const authRoutes = require("./routes/auth");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

// ==========================================
// HOLDINGS
// ==========================================

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});

    res.json(allHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ==========================================
// POSITIONS
// ==========================================

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});

    res.json(allPositions);
  } catch (err) {
    console.error("Error fetching positions:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ==========================================
// ORDERS
// ==========================================

// Get all BUY and SELL orders
app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({
      _id: -1,
    });

    res.json(allOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
});

// ==========================================
// FUNDS
// ==========================================

// GET FUNDS
app.get("/funds", async (req, res) => {
  try {
    let funds = await FundsModel.findOne();

    // Create funds account if it doesn't exist
    if (!funds) {
      funds = new FundsModel({
        availableBalance: 100000,
        usedMargin: 0,
        totalBalance: 100000,
      });

      await funds.save();

      console.log(
        "New funds account created with ₹1,00,000"
      );
    }

    res.json(funds);
  } catch (err) {
    console.error("Error fetching funds:", err);

    res.status(500).json({
      message: "Failed to fetch funds",
      error: err.message,
    });
  }
});

// ==========================================
// ADD FUNDS
// ==========================================

app.post("/addFunds", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Please enter a valid amount",
      });
    }

    let funds = await FundsModel.findOne();

    // Create funds account if it doesn't exist
    if (!funds) {
      funds = new FundsModel({
        availableBalance: 100000,
        usedMargin: 0,
        totalBalance: 100000,
      });
    }

    // Add money
    funds.availableBalance =
      Number(funds.availableBalance) + amount;

    // Calculate total balance
    funds.totalBalance =
      Number(funds.availableBalance) +
      Number(funds.usedMargin);

    await funds.save();

    console.log(
      `₹${amount.toFixed(2)} added successfully`
    );

    res.json({
      success: true,
      message: `₹${amount.toFixed(2)} added successfully`,
      funds: funds,
    });
  } catch (err) {
    console.error("Error adding funds:", err);

    res.status(500).json({
      message: "Failed to add funds",
      error: err.message,
    });
  }
});

// ==========================================
// WITHDRAW FUNDS
// ==========================================

app.post("/withdrawFunds", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Please enter a valid amount",
      });
    }

    let funds = await FundsModel.findOne();

    if (!funds) {
      return res.status(400).json({
        message: "Funds account not found",
      });
    }

    // Check available balance
    if (
      amount >
      Number(funds.availableBalance)
    ) {
      return res.status(400).json({
        message: `Insufficient available balance. You can withdraw up to ₹${Number(
          funds.availableBalance
        ).toFixed(2)}`,
      });
    }

    // Remove money
    funds.availableBalance =
      Number(funds.availableBalance) - amount;

    // Calculate total balance
    funds.totalBalance =
      Number(funds.availableBalance) +
      Number(funds.usedMargin);

    await funds.save();

    console.log(
      `₹${amount.toFixed(2)} withdrawn successfully`
    );

    res.json({
      success: true,
      message: `₹${amount.toFixed(2)} withdrawn successfully`,
      funds: funds,
    });
  } catch (err) {
    console.error(
      "Error withdrawing funds:",
      err
    );

    res.status(500).json({
      message: "Failed to withdraw funds",
      error: err.message,
    });
  }
});

// ==========================================
// BUY ORDER
// ==========================================

app.post("/newOrder", async (req, res) => {
  try {
    console.log(
      "BUY REQUEST RECEIVED:",
      req.body
    );

    const {
      name,
      qty,
      price,
      mode,
    } = req.body;

    const buyQty = Number(qty);
    const buyPrice = Number(price);

    // Validate input
    if (
      !name ||
      buyQty <= 0 ||
      buyPrice < 0
    ) {
      return res.status(400).json({
        message: "Invalid buy order details",
      });
    }

    // ==========================================
    // CHECK FUNDS
    // ==========================================

    const buyAmount =
      buyQty * buyPrice;

    let funds =
      await FundsModel.findOne();

    // Create funds account if it doesn't exist
    if (!funds) {
      funds = new FundsModel({
        availableBalance: 100000,
        usedMargin: 0,
        totalBalance: 100000,
      });

      await funds.save();
    }

    // Check available balance
    if (
      buyAmount >
      Number(funds.availableBalance)
    ) {
      return res.status(400).json({
        message: `Insufficient funds. Available balance: ₹${Number(
          funds.availableBalance
        ).toFixed(2)}`,
      });
    }

    // ------------------------------------------
    // 1. Save BUY order
    // ------------------------------------------

    const newOrder =
      new OrdersModel({
        name: name,
        qty: buyQty,
        price: buyPrice,
        mode: mode || "BUY",
      });

    await newOrder.save();

    console.log(
      "Buy order stored successfully:",
      newOrder._id
    );

    // ==========================================
    // UPDATE FUNDS AFTER BUY
    // ==========================================

    funds.availableBalance =
      Number(funds.availableBalance) -
      buyAmount;

    funds.usedMargin =
      Number(funds.usedMargin) +
      buyAmount;

    funds.totalBalance =
      Number(funds.availableBalance) +
      Number(funds.usedMargin);

    await funds.save();

    console.log(
      `Funds updated after BUY: Available ₹${funds.availableBalance.toFixed(
        2
      )} | Used ₹${funds.usedMargin.toFixed(2)}`
    );

    // ------------------------------------------
    // 2. Find existing holding
    // ------------------------------------------

    let holding =
      await HoldingsModel.findOne({
        name: name,
      });

    // ------------------------------------------
    // 3. Update existing holding
    // ------------------------------------------

    if (holding) {
      const oldQty =
        Number(holding.qty);

      const oldAvg =
        Number(holding.avg);

      const newQty =
        oldQty + buyQty;

      // Calculate new average price
      const newAvg =
        (
          oldQty * oldAvg +
          buyQty * buyPrice
        ) / newQty;

      holding.qty = newQty;
      holding.avg = newAvg;
      holding.price = buyPrice;

      // Calculate current P&L
      const currentValue =
        holding.price *
        holding.qty;

      const investmentValue =
        holding.avg *
        holding.qty;

      const pnl =
        currentValue -
        investmentValue;

      holding.net =
        `${pnl >= 0 ? "+" : ""}${pnl.toFixed(
          2
        )}`;

      await holding.save();

      console.log(
        `Holding updated: ${name} | Qty: ${newQty} | Avg: ${newAvg.toFixed(
          2
        )}`
      );
    }

    // ------------------------------------------
    // 4. Create new holding
    // ------------------------------------------

    else {
      const newHolding =
        new HoldingsModel({
          name: name,
          qty: buyQty,
          avg: buyPrice,
          price: buyPrice,
          net: "0.00",
          day: "0.00",
        });

      await newHolding.save();

      console.log(
        `New holding created: ${name} | Qty: ${buyQty}`
      );
    }

    // ==========================================
    // 5. UPDATE POSITION
    // ==========================================

    let position =
      await PositionsModel.findOne({
        name: name,
      });

    // ------------------------------------------
    // Existing position
    // ------------------------------------------

    if (position) {
      const oldPositionQty =
        Number(position.qty);

      const oldPositionAvg =
        Number(position.avg);

      const newPositionQty =
        oldPositionQty + buyQty;

      // Calculate new average price
      const newPositionAvg =
        (
          oldPositionQty *
            oldPositionAvg +
          buyQty * buyPrice
        ) / newPositionQty;

      position.qty =
        newPositionQty;

      position.avg =
        newPositionAvg;

      position.price =
        buyPrice;

      // Calculate position P&L
      const currentPositionValue =
        buyPrice *
        newPositionQty;

      const positionInvestment =
        newPositionAvg *
        newPositionQty;

      const positionPnl =
        currentPositionValue -
        positionInvestment;

      position.net =
        `${positionPnl >= 0 ? "+" : ""}${positionPnl.toFixed(
          2
        )}`;

      position.day = "0.00";

      position.isLoss =
        positionPnl < 0;

      await position.save();

      console.log(
        `Position updated: ${name} | Qty: ${newPositionQty} | Avg: ${newPositionAvg.toFixed(
          2
        )}`
      );
    }

    // ------------------------------------------
    // New position
    // ------------------------------------------

    else {
      const newPosition =
        new PositionsModel({
          product: "CNC",
          name: name,
          qty: buyQty,
          avg: buyPrice,
          price: buyPrice,
          net: "0.00",
          day: "0.00",
          isLoss: false,
        });

      await newPosition.save();

      console.log(
        `New position created: ${name} | Qty: ${buyQty}`
      );
    }

    // ==========================================
    // Response
    // ==========================================

    res.json({
      success: true,
      message:
        "Buy order placed successfully!",
      order: newOrder,
      funds: {
        availableBalance:
          funds.availableBalance,

        usedMargin:
          funds.usedMargin,

        totalBalance:
          funds.totalBalance,
      },
    });
  } catch (err) {
    console.error(
      "Error processing buy order:",
      err
    );

    res.status(500).json({
      message: "Buy order failed",
      error: err.message,
    });
  }
});

// ==========================================
// SELL ORDER
// ==========================================

app.post("/sellOrder", async (req, res) => {
  try {
    console.log(
      "SELL REQUEST RECEIVED:",
      req.body
    );

    const {
      name,
      qty,
      price,
      mode,
    } = req.body;

    const sellQty = Number(qty);
    const sellPrice = Number(price);

    // Validate input
    if (
      !name ||
      sellQty <= 0 ||
      sellPrice < 0
    ) {
      return res.status(400).json({
        message:
          "Invalid sell order details",
      });
    }

    // ------------------------------------------
    // 1. Find holding
    // ------------------------------------------

    const holding =
      await HoldingsModel.findOne({
        name: name,
      });

    if (!holding) {
      return res.status(404).json({
        message: `You don't own ${name}`,
      });
    }

    // ------------------------------------------
    // 2. Check available quantity
    // ------------------------------------------

    if (
      sellQty >
      Number(holding.qty)
    ) {
      return res.status(400).json({
        message: `You only have ${holding.qty} shares of ${name}`,
      });
    }

    // ==========================================
    // CALCULATE SELL VALUES
    // ==========================================

    const sellAmount =
      sellQty * sellPrice;

    // Amount originally invested
    const releasedMargin =
      sellQty *
      Number(holding.avg);

    // ------------------------------------------
    // 3. Save SELL order
    // ------------------------------------------

    const newSellOrder =
      new OrdersModel({
        name: name,
        qty: sellQty,
        price: sellPrice,
        mode: mode || "SELL",
      });

    await newSellOrder.save();

    console.log(
      "Sell order stored successfully:",
      newSellOrder._id
    );

    // ==========================================
    // UPDATE FUNDS AFTER SELL
    // ==========================================

    let funds =
      await FundsModel.findOne();

    if (!funds) {
      funds = new FundsModel({
        availableBalance: 100000,
        usedMargin: 0,
        totalBalance: 100000,
      });
    }

    // Add sale proceeds
    funds.availableBalance =
      Number(funds.availableBalance) +
      sellAmount;

    // Release original investment
    funds.usedMargin =
      Number(funds.usedMargin) -
      releasedMargin;

    if (
      funds.usedMargin < 0
    ) {
      funds.usedMargin = 0;
    }

    // Total account value
    funds.totalBalance =
      Number(funds.availableBalance) +
      Number(funds.usedMargin);

    await funds.save();

    console.log(
      `Funds updated after SELL: Available ₹${funds.availableBalance.toFixed(
        2
      )} | Used ₹${funds.usedMargin.toFixed(2)}`
    );

    // ------------------------------------------
    // 4. Reduce holding quantity
    // ------------------------------------------

    const newHoldingQty =
      Number(holding.qty) -
      sellQty;

    // ------------------------------------------
    // 5. If all shares are sold
    // ------------------------------------------

    if (
      newHoldingQty === 0
    ) {
      await HoldingsModel.deleteOne({
        _id: holding._id,
      });

      console.log(
        `Holding completely sold: ${name}`
      );
    }

    // ------------------------------------------
    // 6. If some shares remain
    // ------------------------------------------

    else {
      holding.qty =
        newHoldingQty;

      // Update latest price
      holding.price =
        sellPrice;

      const currentValue =
        Number(holding.price) *
        Number(holding.qty);

      const investmentValue =
        Number(holding.avg) *
        Number(holding.qty);

      const pnl =
        currentValue -
        investmentValue;

      holding.net =
        `${pnl >= 0 ? "+" : ""}${pnl.toFixed(
          2
        )}`;

      await holding.save();

      console.log(
        `Holding updated after sell: ${name} | Qty: ${holding.qty}`
      );
    }

    // ==========================================
    // 7. UPDATE POSITION
    // ==========================================

    const position =
      await PositionsModel.findOne({
        name: name,
      });

    if (position) {
      const newPositionQty =
        Number(position.qty) -
        sellQty;

      // ----------------------------------------
      // If all position shares are sold
      // ----------------------------------------

      if (
        newPositionQty <= 0
      ) {
        await PositionsModel.deleteOne({
          _id: position._id,
        });

        console.log(
          `Position completely sold: ${name}`
        );
      }

      // ----------------------------------------
      // If some position shares remain
      // ----------------------------------------

      else {
        position.qty =
          newPositionQty;

        // Update latest price
        position.price =
          sellPrice;

        const currentValue =
          sellPrice *
          newPositionQty;

        const investmentValue =
          Number(position.avg) *
          newPositionQty;

        const pnl =
          currentValue -
          investmentValue;

        position.net =
          `${pnl >= 0 ? "+" : ""}${pnl.toFixed(
            2
          )}`;

        position.day = "0.00";

        position.isLoss =
          pnl < 0;

        await position.save();

        console.log(
          `Position updated after sell: ${name} | Qty: ${newPositionQty}`
        );
      }
    }

    // ==========================================
    // Response
    // ==========================================

    res.json({
      success: true,
      message:
        "Sell order placed successfully!",
      order: newSellOrder,
      funds: {
        availableBalance:
          funds.availableBalance,

        usedMargin:
          funds.usedMargin,

        totalBalance:
          funds.totalBalance,
      },
    });
  } catch (err) {
    console.error(
      "Error processing sell order:",
      err
    );

    res.status(500).json({
      message: "Sell order failed",
      error: err.message,
    });
  }
});

// ==========================================
// DATABASE TEST ROUTE
// ==========================================

app.get("/db-test", async (req, res) => {
  try {
    await mongoose.connection.db
      .admin()
      .ping();

    res.json({
      connected: true,
      database:
        mongoose.connection.name,
      message:
        "MongoDB is working!",
    });
  } catch (err) {
    console.error(
      "Database test failed:",
      err
    );

    res.status(500).json({
      connected: false,
      error: err.message,
    });
  }
});

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
  res.send(
    "Backend is running successfully 🚀"
  );
});

// ==========================================
// CONNECT TO MONGODB
// ==========================================

mongoose
  .connect(uri)
  .then(() => {
    console.log(
      "MongoDB connected successfully!"
    );

    console.log(
      "Database:",
      mongoose.connection.name
    );

    app.listen(PORT, () => {
      console.log(
        `App started on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      "MongoDB connection failed:",
      err
    );
  });
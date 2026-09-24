const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  availableBalance: {
    type: Number,
    default: 100000,
  },
  usedMargin: {
    type: Number,
    default: 0,
  },
  totalBalance: {
    type: Number,
    default: 100000,
  },
});

module.exports = { FundsSchema };
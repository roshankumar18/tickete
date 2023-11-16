const {DataTypes} = require('sequelize');
const { sq } = require('../sequelize/dbConnection');
const Slot = sq.define('slots', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  providerSlotId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  remaining: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currencyCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paxAvailability: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

Slot.sync().catch((err)=>{
    console.log(err)
})
module.exports =   Slot;
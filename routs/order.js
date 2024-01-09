const express = require("express");
const { successmessage, errormessage } = require("../response/Response.js");
const {
  SERVER_ERROR,
  CREATE_SUCCESS,
  NOT_FOUND,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} = require("../response/HttpError.js");
const Order = require("../model/Order.js");
const Countermodle = require("../model/OrderidCount.js");
const Product = require("../model/product.js");
const Payment = require("../model/Payment.js");

const OrderList = async ({ io, userData }) => {
  try {
    let finddata = await Order.find({ userid: userData.userid });
    if (finddata.length === 0) {
      return successmessage(NOT_FOUND);
    } else {
      return successmessage(finddata);
    }
  } catch (error) {
    console.log(error);
    return errormessage(SERVER_ERROR);
  }
};

const OrderAdd = async ({ io, userData, data }) => {
  try {
    var sqid;

    const today = new Date().toLocaleDateString();
    const counterDoc = await Countermodle.findOne({ titles: "autoval" });
    var sqid;

    if (!counterDoc || counterDoc.lastUpdatedDate !== today) {
      await Countermodle.findOneAndUpdate(
        { titles: "autoval" },
        { $set: { id: 1, lastUpdatedDate: today } },
        { upsert: true, new: true }
      );
      sqid = 1;
    } else {
      const cd = await Countermodle.findOneAndUpdate(
        { titles: "autoval" },
        { $inc: { id: 1 } },
        { new: true }
      );
      if (cd === null) {
        const newval = new Countermodle({ titles: "autoval", id: 1 });
        await newval.save();
        sqid = 1;
      } else {
        sqid = cd.id;
      }
    }

    var totalamount = 0;
    try {
      await Promise.all(data.map(async (e) => {
        let find_product = await Product.find({ _id: e.id });
        let quantity_amt
        if (find_product[0].mesur === 'gm') {
          quantity_amt = parseInt(e.qty, 10) / 1000
        } else {
          quantity_amt = parseInt(e.qty, 10)

        }
        let quantity = parseInt(e.qty, 10)
        var amount = quantity_amt * parseInt(find_product[0].price, 10);
        totalamount += amount;
        await Order.create({
          Product: find_product[0]._id,
          amount: amount,
          qty: quantity,
          orderserv: false,
          orderid: sqid,
        });
      }));
    } catch (error) {
      console.log(error);
      return errormessage("Order Entry Error");
    }

    try {
      await Payment.create({
        amount: totalamount,
        orderid: sqid,
      });
      io.emit('kitchen_order_list', sqid);
      return successmessage(CREATE_SUCCESS);
    } catch (error) {
      return errormessage("Payment Entry Error");
    }
  } catch (error) {
    console.error('Error:', error);
    return errormessage(SERVER_ERROR);
  }
};

const OrderRenewAdd = async ({ io, data, id }) => {
  try {
    var totalamount = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    let find_product = await Product.find({ _id: data.selectedproid });
    let quantity_amt
    if (find_product[0].mesur === 'gm') {
      quantity_amt = parseInt(data.qty, 10) / 1000
    } else {
      quantity_amt = parseInt(data.qty, 10)
    }
    let quantity = parseInt(data.qty, 10)
    var amount = quantity_amt * parseInt(find_product[0].price, 10);
    totalamount += amount;
    try {
      await Order.create({
        Product: find_product[0]._id,
        amount: amount,
        qty: quantity,
        orderserv: false,
        orderid: id,
      });

      let find_payment = await Payment.find({
        orderid: id, orderdate: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      });
      let paymentamt = find_payment[0].amount + totalamount
      let datas = await Payment.findByIdAndUpdate(find_payment[0]._id, { $set: { amount: paymentamt } })
      return successmessage(CREATE_SUCCESS);
    } catch (error) {
      return errormessage(SERVER_ERROR)
    }

  } catch (error) {
    console.error('Error:', error);
    return errormessage(SERVER_ERROR);
  }
};

const OrderUpdate = async ({ io, data, id }) => {
  try {
    var sqid = 0;
    var totalamount = 0;
    var oldamount = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    let find_product = await Product.find({ _id: data.Product._id });
    let quantity_amt
    if (find_product[0].mesur === 'gm') {
      quantity_amt = parseInt(data.qty, 10) / 1000
    } else {
      quantity_amt = parseInt(data.qty, 10)
    }
    let quantity = parseInt(data.qty, 10)
    let amount = quantity_amt * parseInt(find_product[0].price, 10);
    totalamount += amount;
    oldamount += data.amount
    try {
      await Order.findOneAndUpdate({ _id: data._id }, { $set: { amount: totalamount, qty: quantity } }, { new: true });

      let find_payment = await Payment.find({
        orderid: id, orderdate: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      });
      let paymentamt = find_payment[0].amount + totalamount - oldamount
      await Payment.findByIdAndUpdate(find_payment[0]._id, { $set: { amount: paymentamt } }, { new: true })
      io.emit('kitchen_order_list', id);
      return successmessage(CREATE_SUCCESS);
    } catch (error) {
      console.log(error)
      return errormessage("Order Update Error");
    }

  } catch (error) {
    console.error('Error:', error);
    return errormessage(SERVER_ERROR);
  }
};
const OrderRemove = async ({ io, data }) => {
  try {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    await Order.findByIdAndDelete(data._id);
    let find_payment = await Payment.find({
      orderid: data.orderid, orderdate: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    let paymentamt = find_payment[0].amount - data.amount
    await Payment.findByIdAndUpdate(find_payment[0]._id, { $set: { amount: paymentamt } }, { new: true })
    io.emit('kitchen_order_list', data.orderid);
    return successmessage(DELETE_SUCCESS);
  } catch (error) {
    console.error(error);
    return errormessage(SERVER_ERROR);
  }
};

module.exports = { OrderList, OrderAdd, OrderUpdate, OrderRemove, OrderRenewAdd };

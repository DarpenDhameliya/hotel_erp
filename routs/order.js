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

const OrderList = async ({ io, userData }) => {
  try {
    let successmessage = await Order.find({ userid: userData.userid });
    if (finddata.length === 0) {
      return successmessage(NOT_FOUND);
    } else {
      return successmessage(successmessage);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

const OrderAdd = async ({ io, userData }) => {
  try {
    let { orderserv, orderdate, Product, amount, qty } = userData;

    try {
      let cd = await Countermodle.findOneAndUpdate(
        { titles: "autoval" },
        { $inc: { id: 1 } },
        { new: true }
      );
      let sqid;
      if (cd === null) {
        const newval = new Countermodle({ titles: "autoval", id: 1 });
        await newval.save();
        sqid = 1;
      } else {
        sqid = cd.id;
      }
    } catch (error) {
      console.log("autoincrment err", error);
    }
    console.log(sqid);
    try {
      let responce = await Order.create({
        orderserv,
        orderdate,
        Product,
        amount,
        qty,
        orderid: sqid,
      });

      return successmessage(CREATE_SUCCESS);
    } catch (error) {
      if (error.name === "ValidationError") {
        var fieldErrors = {};
        Object.keys(error.errors).forEach((key) => {
          fieldErrors = error.errors[key].message;
        });
        return errormessage(fieldErrors);
      } else {
        return errormessage(error);
      }
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

const ProductUpdate = async ({ io, userData }) => {
  try {
    let { name, price, status, mesur, id } = userData;
    let Find_Product = await Order.findById(id);

    if (Find_Order.length > 0) {
      try {
        let new_data = {};
        if (orderserv) {
          new_data.orderserv = orderserv;
        }
        if (orderdate) {
          new_data.orderdate = orderdate;
        }
        if (Product) {
          new_data.Product = Product;
        }
        if (amount) {
          new_data.amount = amount;
        }
        if (qty) {
          new_data.qty = qty;
        }

        let responce = await Order.findByIdAndUpdate(
          id,
          { $set: new_data },
          { new: true }
        );
        return successmessage(UPDATE_SUCCESS);
      } catch (error) {
        if (error.name === "ValidationError") {
          var fieldErrors = {};
          Object.keys(error.errors).forEach((key) => {
            fieldErrors = error.errors[key].message;
          });
          return errormessage(fieldErrors);
        } else {
          return errormessage(error);
        }
      }
    } else {
      return errormessage(NOT_FOUND);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

const ProductRemove = async ({ io, userData }) => {
  try {
    let { id } = userData;
    try {
      let responce = await Order.findByIdAndDelete(id);
      return successmessage(DELETE_SUCCESS);
    } catch (error) {
      return errormessage(error);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

module.exports = { productList, ProductAdd, ProductUpdate, ProductRemove };

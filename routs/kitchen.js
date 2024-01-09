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


const OrderList_kitchen = async (io, data) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        let finddata = await Order.find({
            orderdate: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },orderserv:false
        }).populate({
            path: 'Product',
            select: 'name mesur' // Fields you want to select from the Product model
        })
            .exec();
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



module.exports = { OrderList_kitchen};

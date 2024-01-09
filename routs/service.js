const express = require("express");
const { successmessage, errormessage } = require("../response/Response.js");
const {
    SERVER_ERROR,
    UPDATE_SUCCESS,
} = require("../response/HttpError.js");
const Order = require("../model/Order.js");

const orderServed = async (io) => {
    console.log(io.data)
    try {
        if (io.data.orderserv) {
            let finddata = await Order.findByIdAndUpdate(io.data._id, { $set: { orderserv: false } }, { new: true })
            return successmessage(io.data.orderid);
        } else {
            let finddata = await Order.findByIdAndUpdate(io.data._id, { $set: { orderserv: true } }, { new: true })
            return successmessage(io.data.orderid);
        }
    } catch (error) {
        console.log(error);
        return errormessage(SERVER_ERROR);
    }
};



module.exports = { orderServed };

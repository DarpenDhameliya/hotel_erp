const express = require("express");
const { successmessage, errormessage } = require("../response/Response.js");
const {
    SERVER_ERROR,
    CREATE_SUCCESS,
    NOT_FOUND,
    UPDATE_SUCCESS,
    DELETE_SUCCESS,
} = require("../response/HttpError.js");
const Payment = require("../model/Payment");
const Order = require("../model/Order.js");
const Product = require("../model/product.js");

const PaymentList = async (io, userData, userSockets) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        let finddata = await Payment.find({
            orderdate: {
                $gte: today,
                $lt: new Date(today.getTime() + 25 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
            }, Receive: false,
        }).sort({ orderdate: -1 });
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
const PaymentReport = async (io, userData, userSockets) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        let finddata = await Payment.find({
            orderdate: {
                $gte: today,
                $lt: new Date(today.getTime() + 25 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
            },Receive: true,
        }).sort({ orderdate: -1 });
        console.log(finddata)
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
const PaymentReport_fieldwise = async (io) => {
    let { startdate, enddate, o_id } = io.userToken
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(3, 0, 0, 0);
    const criteria = {};

    if (enddate && startdate) {
        criteria.orderdate = {
            $gte: startDate,
            $lt: endDate,
        };
        criteria.Receive = true
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (o_id) {
        criteria.orderid = o_id;
        criteria.Receive = true
        if (!startdate && !enddate) {
            criteria.orderdate = {
                $gte: today,
                $lt: new Date(today.getTime() + 25 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // Next date at 3 am
            }
        }
    }

    try {
        let finddata = await Payment.find(criteria, null, { sort: { orderdate: -1 } })
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


const PaymentDetailList = async (io, data) => {
    console.log('====', io.data)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        let finddata = await Order.find({
            orderdate: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
            orderid: io.data
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



const PaymentAdd = async ({ userToken }) => {
    try {
        console.log(userToken)
        let { Receive, discount, id, amount, drinkamount } = userToken;
        try {
            let responce = await Payment.findByIdAndUpdate(
                id,
                { $set: { Receive: true, discount: discount, receiveamount: Receive, amount: parseInt(amount, 10), drinkamount: parseInt(drinkamount, 10) } },
                { new: true }
            );
            return successmessage(CREATE_SUCCESS);
        } catch (error) {
            if (error.name === "ValidationError") {
                var fieldErrors = {};
                Object.keys(error.errors).forEach((key) => {
                    fieldErrors = error.errors[key].message;
                });
                return errormessage(fieldErrors);
            } else {
                console.log(error)
                return errormessage(error);
            }
        }
    } catch (error) {
        return errormessage(SERVER_ERROR);
    }
};

const PaymentEditList = async ({ updtid }) => {
    try {
        let finddata = await Payment.findById(updtid);
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

const PaymentUpdate = async ({ io, userData, userToken }) => {
    console.log('=========', userData)
    console.log(userToken.updateId)
    try {
        let { orderdate, orderid, amount, updateId } = userToken;
        let Find_Product = await Payment.findById(updateId);
        console.log('find data from update', Find_Product)
        if (Find_Payment.length !== 0) {
            try {
                let new_data = {};
                if (amount) {
                    new_data.amount = amount;
                }
                if (orderid) {
                    new_data.orderid = orderid;
                }
                if (orderdate) {
                    new_data.status = orderdate;
                }

                let responce = await Payment.findByIdAndUpdate(
                    updateId,
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

const PaymentRemove = async ({ io, userData, userToken }) => {
    console.log("Product Remove", userToken)
    try {
        try {
            let responce = await Payment.findByIdAndDelete(userToken.data);
            return successmessage(DELETE_SUCCESS);
        } catch (error) {
            return errormessage(error);
        }
    } catch (error) {
        return errormessage(SERVER_ERROR);
    }
};

module.exports = { PaymentList, PaymentReport, PaymentAdd, PaymentReport_fieldwise, PaymentUpdate, PaymentRemove, PaymentEditList, PaymentDetailList };

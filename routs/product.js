const express = require("express");
const { successmessage, errormessage } = require("../response/Response.js");
const {
  SERVER_ERROR,
  CREATE_SUCCESS,
  NOT_FOUND,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} = require("../response/HttpError.js");
const Product = require("../model/product.js");

const productList = async ({ io, userData }) => {
  try {
    let successmessage = await Product.find({ userid: userData.userid });
    if (finddata.length === 0) {
      return successmessage(NOT_FOUND);
    } else {
      return successmessage(successmessage);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

const ProductAdd = async ({ io, userData }) => {
  try {
    let { name, price, status, mesur } = userData;
    try {
      let responce = await Product.create({
        name,
        price,
        status,
        mesur,
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
    let Find_Product = await Product.findById(id);

    if (Find_Product.length > 0) {
      try {
        let new_data = {};
        if (name) {
          new_data.name = name;
        }
        if (price) {
          new_data.price = price;
        }
        if (status) {
          new_data.status = status;
        }
        if (mesur) {
          new_data.mesur = mesur;
        }

        let responce = await Product.findByIdAndUpdate(
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
      let responce = await Product.findByIdAndDelete(id);
      return successmessage(DELETE_SUCCESS);
    } catch (error) {
      return errormessage(error);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

module.exports = { productList, ProductAdd, ProductUpdate, ProductRemove };

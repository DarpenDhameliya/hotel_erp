const successmessage = (result) => {
  return {
    status: "success",
    result,
  };
};

const errormessage = (error) => {
  return {
    status: "error",
    error,
  };
};
const successmessageValidate = (result, totalPages) => {
  return {
    status: "success",
    result,
    totalPages,
  };
};

module.exports = { successmessage, errormessage, successmessageValidate };

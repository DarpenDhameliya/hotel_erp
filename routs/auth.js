const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successmessage, errormessage } = require("../response/Response.js");
const {
  SERVER_ERROR,
  USER_NOT_EXIST,
  CREATE_SUCCESS,
  USER_EXIST,
} = require("../response/HttpError.js");
const Auth = require("../model/Auth.js");

// const signup = async ({ io, userData }) => {
//   console.log("++++++++++++++++++++++", io.id, userData);
// try {
//   if (userData.password) {
//     var salt = await bcrypt.genSalt(10);
//     var encyptpassword = await bcrypt.hash(userData.password, salt);

//     const data = {
//       password: userData.password,
//       userid: userData.userid,
//       type: userData.type,
//     };

//     const authToken = await jwt.sign(data, "sstpl123", {
//       expiresIn: "24h",
//     });

//    let respoce =  Auth
//       .create({
//         userid: userData.userid,
//         password: encyptpassword,
//         name: userData.name,
//         type: userData.type,
//         status: userData.status,
//         signintoken: authToken,
//       })
//       .then((resu) => {
//         // console.log(resu , io.id)
//         // io.to(io.id).emit(
//         //   "signup_success_response",
//         //   successmessage("User Create Successfully")
//         //   );
//           return successmessage("User Create Successfully")
//         // return res.status(200).send(successmessage("User Create Successfully"));
//       })
//       .catch((error) => {
//         console.log('=======',error)
//         if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
//           // Handle duplicate key error (name already exists)
//           console.log('===================error')
//           io.to(io.id).emit("signup_duplicateerr_response", errormessage("User with the same name already exists"));
//         }
//         if (error.name === "ValidationError") {
//           var fieldErrors = {};
//           Object.keys(error.errors).forEach((key) => {
//             console.log(error.errors.message);
//             fieldErrors = error.errors[key].message;
//           });
//           io.to(io.id).emit(
//             "signup_emptyerr_response",
//             errormessage(fieldErrors)
//           );
//           // return res.status(400).json(errormessage(fieldErrors));
//         }
//       });
//       console.log( await respoce)
//   }
// } catch (error) {
//   console.log('catch error =======',error)
// }
// };

const signup = async ({ io, userData }) => {
  try {
    let finddata = await Auth.find({ userid: userData.userid });
    if (finddata.length === 0) {
      if (userData.password) {
        var salt = await bcrypt.genSalt(10);
        var encyptpassword = await bcrypt.hash(userData.password, salt);

        try {
          var responce = await Auth.create({
            userid: userData.userid,
            password: encyptpassword,
            name: userData.name,
            type: userData.type,
            status: userData.status,
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
        return await responce;
      }
    } else {
      return errormessage(USER_EXIST);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};

const login = async ({ io, userData }) => {
  try {
    let finddata = await Auth.find({ userid: userData.userid });
    if (finddata.length > 0) {
      if (userData.password && userData.userid) {
        const passwordCompare = await bcrypt.compare(
          userData.password,
          finddata[0].password
        );
        if (passwordCompare === true) {
          try {
            var data = {
              userid: userData.userid,
              type: finddata[0].type,
            };
            const authToken = await jwt.sign(data, "sstpl123");
            await Auth.updateOne(
              { _id: finddata[0]._id },
              {
                $set: { token: authToken },
              }
            );
            return successmessage({ authToken, type: finddata[0].type, name: finddata[0].name });
          } catch (error) {
            return errormessage(error);
          }
        } else {
          return errormessage("Password Missmatch");
        }
      } else {
        return errormessage("Field Required");
      }
    } else {
      return errormessage(USER_NOT_EXIST);
    }
  } catch (error) {
    return errormessage(SERVER_ERROR);
  }
};


// router.post("/signup", async (req, res) => {
//   const { password, userid, status, type, name } = req.body;

//   try {
//     if (password) {
//       var salt = await bcrypt.genSalt(10);
//       var encyptpassword = await bcrypt.hash(password, salt);

//       const data = {
//         password: password,
//         userid: userid,
//         type: type,
//       };

//       const authToken = await jwt.sign(data, "sstpl123", {
//         expiresIn: "24h",
//       });
//       user
//         .create({
//           userid,
//           password: encyptpassword,
//           name,
//           type,
//           status,
//           signintoken: authToken,
//         })
//         .then((resu) => {
//           return res
//             .status(200)
//             .send(successmessage("User Create Successfully"));
//         })
//         .catch((error) => {
//           if (error.name === "ValidationError") {
//             var fieldErrors = {};
//             Object.keys(error.errors).forEach((key) => {
//               console.log(error.errors.message);
//               fieldErrors = error.errors[key].message;
//             });
//             return res.status(400).json(errormessage(fieldErrors));
//           }
//         });
//     }
//   } catch (error) {
//     res.status(500).json(errormessage(SERVER_ERROR));
//   }
// });

// router.post("/login", async (req, res) => {
//   const { userid, password } = req.body;

//   let finduser = await user.findOne({ userid });
//   let error = [];
//   if (!finduser && userid) {
//     if (!finduser && userid) {
//       error.push(USER_NOT_EXIST);
//     }
//     return res.status(402).send(errormessage(error));
//   } else {
//     var JWT_SECRET = process.env.JWT_SECRET;

//     try {
//       const passwordCompare = await bcrypt.compare(password, finduser.password);
//       if (passwordCompare === true) {
//         const data = {
//           password: finduser.password,
//           name: finduser.userid,
//         };

//         const authToken = await jwt.sign(data, "sstpl123", {
//           expiresIn: "24h",
//         });
//         await user.updateOne(
//           { _id: finduser._id },
//           {
//             $set: { token: authToken },
//           }
//         );
//         return res.status(200).send(successmessage(authToken));
//       } else {
//         return res.status(402).send(errormessage(PASSWORD_MISMATCH));
//       }
//     } catch (error) {
//       return res.status(500).send(errormessage(error));
//     }
//   }
// });

module.exports = { signup, login };

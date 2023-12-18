var jwt = require("jsonwebtoken");
const JWT_SECRET = "sstpl123";
const { errormessage, successmessage } = require("../response/Response");
const user = require("../model/Auth");
const { DELETE_SUCCESS, SERVER_ERROR } = require("../response/HttpError");

const Authenticate = async (token, next) => {
    if (!token) {
        return errormessage("Please Add token ");
    } else {
        try {
            var match_user = jwt.verify(token, JWT_SECRET);
            console.log(match_user,);
            user.find({ userid: match_user.userid }).then((result) => {
                if (token == result[0].token) {
                    let userData = {
                        id: match_user.userid,
                        type: match_user.type
                    }
                    console.log(userData)
                    // return userData;
                    next(userData);
                } else {
                    console.lgo('error')
                    errormessage("another device login");
                }
            });
        } catch (error) {
            console.log(error)
            errormessage("Token Mismatch");
        }
    }
};

const RemoveToken_logout = async (token, next) => {

    try {
        try {
            var match_user = jwt.verify(token, JWT_SECRET);

        } catch (error) {
            next(errormessage("Token Expired"))
        }
        let update = {
            $unset: { token: 1 }
        };
        
        if(match_user !== ''){
            let filter = { userid: match_user.userid };
            user.find({ userid: match_user.userid }).then((result) => {
                if (result[0].token) {
                    user.updateOne(filter, update)
                        .then(result => {
                            next(successmessage(DELETE_SUCCESS));
                        })
                        .catch(error => {
                            next(errormessage(error))
                        });
                } else {
                    next(errormessage("Already Logout"));
                }
            })
        }
    } catch (error) {
        return errormessage(SERVER_ERROR);
    }

};
module.exports = { Authenticate, RemoveToken_logout };

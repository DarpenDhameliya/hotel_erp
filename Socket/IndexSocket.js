const Authenticate = require("../middleware/Authenticate");
const { DELETE_SUCCESS } = require("../response/HttpError");
const { successmessage, errormessage } = require("../response/Response");
const { signup, login } = require("../routs/auth");
const { productList, ProductAdd, ProductUpdate, ProductRemove } = require("../routs/product");

let RoomId;
const Roomsocket = (socket) => {
  console.log("==============", socket.id);

  // user Create
  socket.on("new_user_create", async (userData) => {
    let data = await signup({ io: socket, userData });
    socket.emit("signup_responce", data);
  });

  //user login
  socket.on("user_login", async (userData) => {
    let data = await login({ io: socket, userData });
    socket.emit("login_responce", data);
  });

  socket.on("user_logout", async (userToken) => {
    if (!userToken) {
      socket.emit("logout_responce", errormessage('Token Required'));
    } else {
      Authenticate.RemoveToken_logout(userToken, async (userData) => {
        socket.emit("logout_responce", userData);
      });
    }
  });

  // admin product list
  socket.on("admin_product_list", async (userData) => {
    let data = await productList({ io: socket, userData });
    socket.emit("admin_product_list_responce", data);
  });

  // admin product add
  socket.on("admin_product_add", async (userData) => {
    let data = await ProductAdd({ io: socket, userData });
    socket.emit("admin_product_add_responce", data);
  });

  //admin product edit
  socket.on("admin_product_edit", async (userData) => {
    let data = await ProductUpdate({ io: socket, userData });
    socket.emit("admin_product_edit_responce", data);
  });

  //admin product delete
  socket.on("admin_product_delete", async (userData) => {
    let data = await ProductRemove({ io: socket, userData });
    socket.emit("admin_product_delete_responce", data);
  });
};

module.exports = Roomsocket;

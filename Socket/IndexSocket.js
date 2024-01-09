const Authenticate = require("../middleware/Authenticate");
const { successmessage, errormessage } = require("../response/Response");
const { signup, login } = require("../routs/auth");
const { OrderList_kitchen } = require("../routs/kitchen");
const { OrderAdd, OrderList, OrderRenewAdd, OrderUpdate, OrderRemove } = require("../routs/order");
const { PaymentList, PaymentAdd, PaymentEditList, PaymentUpdate, PaymentRemove, PaymentDetailList, PaymentReport, PaymentReport_fieldwise } = require("../routs/payment");
const { productList, ProductAdd, ProductUpdate, ProductRemove, productEditList } = require("../routs/product");
const { orderServed } = require("../routs/service");

var userSockets = [];

const Roomsocket = (socket) => {
  console.log("==============", socket.id);
  userSockets.push({ socketId: socket.id })
  // user Create
  socket.on("new_user_create", async (userData) => {
    let data = await signup({ io: socket, userData });
    socket.emit("signup_responce", data);
  });

  //user login
  socket.on("user_login", async (userData) => {
    console.log(userSockets)
    let data = await login({ io: socket, userData });
    socket.emit("login_responce", data);
  });

  //user logout
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
  socket.on("admin_product_list", async (userToken) => {
    const index = userSockets.findIndex(user => user.socketId === userToken.id);
    if (index !== -1) {
      userSockets[index].type = userToken.name;
    }
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await productList({ io: socket, userData });
      socket.emit("admin_product_list_responce", data);
    })
  });

  // admin product add
  socket.on("admin_product_add", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await ProductAdd({ io: socket, userToken, userData });
      socket.emit("admin_product_add_responce", data);
    })
  });

  //admin product edit list
  socket.on("admin_product_edit_detail", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await productEditList({ io: socket, userData, updtid: userToken.id });
      socket.emit("admin_product_edit_detail_responce", data);
    })
  });

  //admin product edit
  socket.on("admin_product_edit", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await ProductUpdate({ io: socket, userData, userToken });
      socket.emit("admin_product_edit_responce", data);
    })
  });

  //admin product delete
  socket.on("admin_product_delete", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await ProductRemove({ io: socket, userData, userToken });
      socket.emit("admin_product_delete_responce", data);
    })
  });

  // admin payment list for order view
  socket.on("admin_payment_list", async (userToken) => {
    const index = userSockets.findIndex(user => user.socketId === userToken.id);
    if (index !== -1) {
      userSockets[index].type = userToken.name;
    }
    console.log(userSockets)
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentList({ io: socket, userData });
      socket.emit("admin_payment_list_responce", data);
    })
  });

  // admin payment list for report defalut todays
  socket.on("admin_payment_report_default", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentReport({ io: socket, userData });
      socket.emit("admin_payment_report_responce_default", data);
    })
  });

  // admin payment list for report filtervise
  socket.on("admin_payment_report_fieldwise", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentReport_fieldwise({ io: socket, userData, userToken });
      socket.emit("admin_payment_report_responce_fieldwise", data);
    })
  });

  // admin show order details payment id wise
  socket.on("admin_payment_viewspecific_list", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentDetailList({ io: socket, userData, data: userToken.data, userSockets });
      socket.emit("admin_payment_viewspecific_list_responce", data);
    })
  });

  // admin payment add
  socket.on("admin_payment_add", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentAdd({ io: socket, userToken, userData });
      socket.emit("admin_payment_add_responce", data);
    })
  });

  //admin payment edit list
  socket.on("admin_payment_edit_detail", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentEditList({ io: socket, userData, updtid: userToken.id });
      socket.emit("admin_payment_edit_detail_responce", data);
    })
  });

  //admin payment edit
  socket.on("admin_payment_edit", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentUpdate({ io: socket, userData, userToken });
      socket.emit("admin_payment_edit_responce", data);
    })
  });

  //admin payment delete
  socket.on("admin_payment_delete", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await PaymentRemove({ io: socket, userData, userToken });
      socket.emit("admin_payment_delete_responce", data);
    })
  });

  // // admin Order list
  // socket.on("admin_order_list", async (userToken) => {
  //   Authenticate.Authenticate(userToken.token, async (userData) => {
  //     let data = await OrderList({ io: socket, userData });
  //     socket.emit("admin_order_list_responce", data);
  //   })
  // });

  // admin Order add
  socket.on("admin_order_add", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await OrderAdd({ io: socket, data: userToken.orderList, userData });
      let finddata_kitchen = userSockets.filter((user) => user.type === 'kitchen')
      finddata_kitchen.forEach((kitchenSocket) => {
        socket.to(kitchenSocket.socketId).emit("kitchen_order_list_query");
      });
      let finddata_service = userSockets.filter((user) => user.type === 'service')
      finddata_service.forEach((kitchenSocket) => {
        socket.to(kitchenSocket.socketId).emit("service_order_list_query");
      })
      socket.emit("admin_order_add_responce", data);
    })
  });

  // admin renew order
  socket.on("admin_order_renew_add", async (userToken) => {
    const index = userSockets.findIndex(user => user.socketId === userToken.id);
    if (index !== -1) {
      userSockets[index].type = userToken.name;
    }

    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await OrderRenewAdd({ io: socket, data: userToken.newOrder, id: userToken.selectedOdrId, userSockets });
      let finddata = userSockets.filter((user) => user.type === 'kitchen')
      finddata.forEach((kitchenSocket) => {
        socket.to(kitchenSocket.socketId).emit("kitchen_order_list_query", { payload: 'id' });
      });
      socket.emit("admin_order_renew_add_responce", data);
    })
  });

  //admin Order edit
  socket.on("admin_order_edit", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await OrderUpdate({ io: socket, data: userToken.selectedOrderId, id: userToken.selectedOdrId });

      let finddata = userSockets.filter((user) => user.type === 'kitchen')
      finddata.forEach((kitchenSocket) => {
        socket.to(kitchenSocket.socketId).emit("kitchen_order_list_query");
      });
      socket.emit("admin_order_edit_responce", data);
    })
  });

  //admin Order delete
  socket.on("admin_order_delete", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await OrderRemove({ io: socket, data: userToken.data });
      let finddata = userSockets.filter((user) => user.type === 'kitchen')
      finddata.forEach((kitchenSocket) => {
        socket.to(kitchenSocket.socketId).emit("kitchen_order_list_query");
      });
      socket.emit("admin_order_delete_responce", data);
    })
  });

  // kitchen order list handle in admin
  socket.on("kitchen_order_list_direct_admin", async (payload) => {
    console.log('call', payload)
    let data = await OrderList_kitchen();
    // console.log('=-=-==-=', data)
    socket.emit("kitchen_order_list_responce", data);
  });


  // kitchen order receive list using referesh
  socket.on("kitchen_order_list", async (userToken) => {
    // console.log(userToken)
    if (userToken.id) {
      const index = userSockets.findIndex(user => user.socketId === userToken.id);
      if (index !== -1) {
        userSockets[index].type = userToken.name;
      }
    }
    console.log(userSockets)
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await OrderList_kitchen({ io: socket, data: userToken });
      socket.emit("kitchen_order_list_responce", data);
    })
  });

  // service side serve item
  socket.on("served_item", async (userToken) => {
    Authenticate.Authenticate(userToken.token, async (userData) => {
      let data = await orderServed({ io: socket, data: userToken.data });
      let finddata = userSockets.filter((user) => user.type === 'kitchen')
      finddata.forEach((kitchenSocket) => {
        socket.to(kitchenSocket.socketId).emit("kitchen_order_list_query");
      });
      if (userToken.admin) {
        let finddata_service = userSockets.filter((user) => user.type === 'service')
        finddata_service.forEach((kitchenSocket) => {
          socket.to(kitchenSocket.socketId).emit("service_order_list_updtfrom_adminside", data);
        })
      } else {
        console.log('not')
      }
      socket.emit("served_item_list_responce", data);
    })
  });


  socket.on("disconnect", () => {
    const disconnectedUserIndex = userSockets.findIndex(
      (user) => user.socketId === socket.id
    );

    if (disconnectedUserIndex !== -1) {
      const disconnectedUser = userSockets[disconnectedUserIndex];
      userSockets.splice(disconnectedUserIndex, 1);
    }
  })
};

module.exports = Roomsocket;

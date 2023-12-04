let myObject = {};
let userlist = [];
let activeuser = [];

const Roomsocket = (socket) => {
  userlist.push(socket.id);
  let activeUserNumber = userlist.length + Object.keys(myObject).length * 2;
  console.log(userlist)
  // socket.to(userlist).emit("activeuser_count", activeUserNumber);
  // socket.to(socket.id).emit("activeuser_count", activeUserNumber);

  // disconnect at referesh time or close teb time
  socket.on("disconnect", () => {
    activeuser = userlist.filter((item) => item !== socket.id);
    userlist = activeuser;
    activeUserNumber = userlist.length + Object.keys(myObject).length * 2;
    socket.to(userlist).emit("activeuser_count", activeUserNumber);
    for (const chatId in myObject) {
      if (myObject.hasOwnProperty(chatId)) {
        if (myObject[chatId][0] === socket.id) {
          socket.to(myObject[chatId][1]).emit("userchat_close");
          userlist.push(myObject[chatId][1]);
          delete myObject[chatId];
        } else if (myObject[chatId][1] === socket.id) {
          socket.to(myObject[chatId][0]).emit("userchat_close");
          userlist.push(myObject[chatId][0]);
          delete myObject[chatId];
        }
      }
    }
  });

  // dissconnect from client
  socket.on("disconnect_from_front", (idfromfront) => {
    activeuser = userlist.filter((item) => item !== idfromfront);
    userlist = activeuser;

    for (const chatId in myObject) {
      if (myObject.hasOwnProperty(chatId)) {
        if (myObject[chatId][0] === idfromfront) {
          userlist.push(myObject[chatId][1]);
          userlist.push(myObject[chatId][0]);

          socket.to(myObject[chatId][1]).emit("userchat_close");
          socket.emit("userchat_close");
          if (myObject.hasOwnProperty(chatId)) {
            delete myObject[chatId];
          }
        } else if (myObject[chatId][1] === idfromfront) {
          userlist.push(myObject[chatId][0]);
          userlist.push(myObject[chatId][1]);

          socket.to(myObject[chatId][0]).emit("userchat_close");
          socket.emit("userchat_close");
          if (myObject.hasOwnProperty(chatId)) {
            delete myObject[chatId];
          }
        }
      }
    }
    activeUserNumber = userlist.length + Object.keys(myObject).length * 2;
    socket.to(userlist).emit("activeuser_count", activeUserNumber);
  });

  // request for client join
  socket.on("requestChat", (id) => {
    console.log("get id", id);
    if (userlist.length <= 1) {
      // user list less then 1 then enter the if condition
      socket.emit("no_user_active");
      activeuser = userlist.filter((item) => item !== id);
    } else {
      if (userlist.length === 2) {
        // user list have only 2 user then enter the if condition
        const randomId = userlist.filter((item) => item !== id); // get rendom id in randomId
        // send requested user id to connected user
        socket.to(randomId[0]).emit("userjoin_with_singleperson", id);

        // send connected user id to request sender
        socket.emit("userjoin_with_singleperson_personalId", randomId[0]);
        let createDynemicChat = false;
        for (const chatId in myObject) {
          // if chat is multiple like(chat_1 , chat_2 ...) then enter the if condirion
          if (chatId === "chat_1") {
            createDynemicChat = true;
            const largestNumber = Math.max(
              ...Object.keys(myObject).map(
                (chatId) => parseInt(chatId.split("_")[1], 10) || 0
              )
            );
            let incrementNumber = largestNumber + 1;
            let chatnumber = `chat_${incrementNumber}`;
            myObject[chatnumber] = [id, randomId[0]];

            const newArray = userlist.filter((item) => {
              item !== id && item !== randomId[0];
            });

            userlist = newArray;
          }
        }
        if (createDynemicChat !== true) {
          // if no user join the chat then enter this condition
          myObject["chat_1"] = [id, randomId[0]];
          const newArray = userlist.filter((item) => {
            item !== id && item !== randomId[0];
          });
          userlist = newArray;
        }
      } else {
        // user list have more then 2 user then enter this condition
        let elseid = userlist.filter((item) => item !== id);
        if (Object.keys(myObject).length === 0) {
          const randomId = userlist[Math.floor(Math.random() * elseid.length)];
          myObject["chat_1"] = [id, randomId];
          socket.to(randomId).emit("userjoin_with_singleperson", id);
          socket.emit("userjoin_with_singleperson_personal", randomId);
          const elid = userlist.filter(
            (item) => item !== id && item !== randomId
          );
          userlist = elid;
        } else {
          const randomId = userlist[Math.floor(Math.random() * elseid.length)];
          const largestNumber = Math.max(
            ...Object.keys(myObject).map(
              (chatId) => parseInt(chatId.split("_")[1], 10) || 0
            )
          );
          let incrementNumber = largestNumber + 1;
          let chatnumber = `chat_${incrementNumber}`;
          myObject[chatnumber] = [id, randomId];
          socket.to(randomId).emit("userjoin_with_singleperson", id);
          socket.emit("userjoin_with_singleperson_personal", randomId);
          const elid = userlist.filter(
            (item) => item !== id && item !== randomId
          );
          userlist = elid;
        }
      }
      socket.emit("chatAccepted");
    }
  });

  // communication between both client
  socket.on("chat message", (msg) => {
    const id = msg.receiverid;
    let array = {
      message: msg.message,
      receiverid: id,
    };
    socket.to(id).emit("send message", array);
  });

  socket.on("roomuser-type", (id) => {
    socket.to(id).emit("roomuser_type_resend");
  });
};

module.exports = Roomsocket;

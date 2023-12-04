const router = require("express").Router();
// router.use("/authers", require("./SendMail"));
// router.use("/return", require("./ReturnOdr"));
// router.use("/purchase", require("./Purchase"));
router.use("/auth", require("./auth"));


module.exports = router;
const express = require("express");
const {get_one_user,
      user_register,
      user_login} = require("../controller/userController")

const router = express.Router();

router
      .route("/:id")
            .get(get_one_user)
router
      .route("/register")
            .post(user_register)
router
      .route("/login")
            .post(user_login)

module.exports = router;

const express = require("express");
const {
            edit_a_post,
            delete_a_post,
            create_a_post     } = require("../controller/postController");

const router = express.Router();

//Middleware


//Private Routes 
router
      .route("/create")
            .post(create_a_post)

router
      .route("/:id")
            .patch(edit_a_post)

            .delete(delete_a_post)

module.exports = router;

const express = require("express");
const {
            get_a_post,
            get_all_posts,
            edit_a_post,
            delete_a_post,
            create_a_post     } = require("../controller/postController");

const router = express.Router();

//Middleware


//Private Routes 
router.
      route("/:id")

            .post(create_a_post)

            .patch(edit_a_post)

            .delete(delete_a_post)

module.exports = router;

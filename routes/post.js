const express = require("express");
const {
            get_a_post,
            get_all_posts,
            edit_a_post,
            delete_a_post,
            create_a_post     } = require("../controller/postController");

const router = express.Router();

router.
      route("/").
            get(get_all_posts);
router.
      route("/:id")
            .get(get_a_post)



module.exports = router;

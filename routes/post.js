const express = require("express");
const {
            get_a_post,
            get_all_posts
                             } = require("../controller/postController");

const router = express.Router();

router.
      route("/").
            get(get_all_posts);
router.
      route("/:id")
            .get(get_a_post)



module.exports = router;

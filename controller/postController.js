

const get_a_post = async (req, res) => {
      const  {id} = req.params;
      res.status(200).json({
            message: `post by ${id}`,
      });
}

const get_all_posts = async (req, res) => {
      res.status(200).json({
            message: "all posts",
      });
}

const edit_a_post  = async (req, res) => {
      res.status(200).json({
            message: "all posts",
      });
}

const delete_a_post = async (req, res) => {
      res.status(200).json({
            message: "all posts",
      });
}

const create_a_post = async (req, res) => {
      res.status(200).json({
            message: "all posts",
      });
}
module.exports = {
      get_a_post,
      get_all_posts,
      edit_a_post,
      delete_a_post,
      create_a_post
}


const get_one_user = async (req, res) => {
      const  {id} = req.params;
      res.status(200).json({
            message: `post by ${id}`,
      });
}

// const get_all_users = async (req, res) => {
//       res.status(200).json({
//             message: "all posts",
//       });
// }



const user_register = async (req, res) => {
      res.status(200).json({
            message: "all posts",
      });
}

const user_login = async (req, res) => {
      res.status(200).json({
            message: "all posts",
      });
}
module.exports = {
      get_one_user,
      user_register,
      user_login
}
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const curPage = req.query.page || 1;
        const perPage = 5;
        const users = await User.find()
          .populate("myEvents")
          .populate("myComments")
          .skip((curPage - 1) * perPage)
          .limit(perPage);

        const totalUsers = await User.find().countDocuments();

        res.status(200).json({
          success: true,
          users: users,
          nbUsers: totalUsers,
          curPage: curPage,
          maxPage: Math.ceil(totalUsers / perPage),
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};

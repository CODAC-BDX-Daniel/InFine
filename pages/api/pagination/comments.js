import dbConnect from "../../../utils/dbConnect";
import Comment from "../../../models/Comment";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const curPage = req.query.page || 1;
        const perPage = 5;
        const comments = await Comment.find()
          .populate("user")
          .populate("event")
          .skip((curPage - 1) * perPage)
          .limit(perPage);

        const totalComments = await Comment.find().countDocuments();

        res.status(200).json({
          success: true,
          comments: comments,
          nbComments: totalComments,
          curPage: curPage,
          maxPage: Math.ceil(totalComments / perPage),
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};

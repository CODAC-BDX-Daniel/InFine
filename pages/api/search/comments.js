import dbConnect from "../../../utils/dbConnect";
import Comment from "../../../models/Comment";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const query = req.body.query
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        const tableau = [];
        const comments = await Comment.find()
          .populate("user")
          .populate("event");
        comments.forEach((element) => {
          const name = element.user.username
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          if (name.includes(query)) {
            tableau.push(element);
          }
        });
        res.status(200).json({ success: true, data: tableau });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};

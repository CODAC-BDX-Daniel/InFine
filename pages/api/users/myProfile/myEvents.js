import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case "GET":
            try {
                const token = req.headers.authorization.split(" ")[1];
                const connecte = jwt.decode(token, process.env.JWT_SECRET);

                const user = await User.findById(connecte.id).populate("myEvents");

                res.status(200).json({success: true, data: user.myEvents});
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;

        default:
            res.status(400).json({success: false, error: error.message});
            break;
    }
};

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
                const user = await User.findById(connecte.id)
                    .populate("myEvents")
                    .populate("myComments");

                res.status(200).json({success: true, data: user});
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;
        case "PUT":
            try {
                const body = req.body;
                const token = req.headers.authorization.split(" ")[1];
                const connecte = jwt.decode(token, process.env.JWT_SECRET);
                const user = await User.findByIdAndUpdate(connecte.id, body, {
                    new: true,
                    runValidators: true,
                });
                if (!user) {
                    return res.status(400).json({success: false, error: error.message});
                } else if (connecte.role !== "admin" || connecte.id !== user.id) {
                    res.status(403).json({success: false, message: "Vous ne pouvez pas modifier ce profil"})
                }

                res.status(200).json({success: true, data: user});
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;

        default:
            res.status(400).json({success: false, error: error.message});
            break;
    }
};

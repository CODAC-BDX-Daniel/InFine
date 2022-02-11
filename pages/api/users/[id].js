import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import Comment from "../../../models/Comment";
import Event from "../../../models/Event";
import Booking from "../../../models/Booking";
import jwt from "jsonwebtoken";


dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {
        query: {id},
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id)
                    .populate("myEvents")
                    .populate("myComments");

                if (!user) {
                    return res.status(400).json({success: false, error: error.message});
                }


                res.status(200).json({success: true, data: user});
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;
        case "PUT":
            try {

                const chaine = req.body.headers.authorization;
                const token = chaine.split(" ")[1];
                const connecte = jwt.decode(token, process.env.JWT_SECRET);
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!user) {
                    return res.status(400).json({success: false, error: error.message});
                } else if (connecte.role !== "admin" ) {
                    res.status(403).json({success: false, message: "vous ne pouvez pas modifier un profil"})
                }
                res.status(200).json({success: true, data: user});
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;
        case "DELETE":
            try {
                const chaine = req.headers.authorization;
                const token = chaine.split(" ")[1];
                const connecte = jwt.decode(token, process.env.JWT_SECRET);
                const deletedUser = await User.findByIdAndDelete(id);
                await Event.updateMany({$pullAll: {users: [{_id: id}],},});
                await Booking.deleteMany({user: {_id: id}});
                await Comment.deleteMany({user: {_id: id}});
                if (!deletedUser) {
                    return res.status(400).json({success: false, error: error.message});
                } else if (connecte.role !== "admin") {
                    res.status(403).json({success: false, message: "Vous ne pouvez pas supprimer de profil"})
                }
                res.status(200).json({success: true});
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;
        default:
            res.status(400).json({success: false, error: error.message});
            break;
    }

};

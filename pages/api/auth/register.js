import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";
import middleware from "../../../middleware/middleware";
import nextConnect from "next-connect";

let cloudinary = require("../../../cloudinary");
const fs = require("fs");

const handler = nextConnect();

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
handler.use(middleware);
const uploader = async (path) => await cloudinary.uploads(path, "Images");
handler.post(async (req, res) => {
  try {
    let { username, email, password, password_confirmation, address } =
      req.body;
    const image = req.files;
    if (!username || typeof username !== "string") {
      return res.status(400).json({
        success: false,
        error: "Le pseudo doit contenir seulement des lettres ou des chiffres",
      });
    } else if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "Merci d'insérer un email valide" });
    } else if (!address || typeof address !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "Merci d'insérer une adresse valide" });
    } else if (!password || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        error:
          "Le mot de passe doit contenir seulement des lettres et/ou des chiffres",
      });
    } else if (password.length < 5) {
      return res.status(400).json({
        success: false,
        error: "Le mot de passe doit contenir au moins 6 caractères ",
      });
    } else if (password !== password_confirmation) {
      return res
        .status(400)
        .json({ success: false, error: "le mot de passe ne correspond pas" });
    } else if (!image.imageAvatar) {
      return res
        .status(400)
        .json({ success: false, error: "Merci de fournir un Avatar" });
    } else {
      password = await bcryptjs.hash(password, 10);
      const user1 = await User.find({ email: email });
      const user2 = await User.find({ username: username });

      let imageAvatar = null;
      const { filepath } = image.imageAvatar;
      const newPath = await uploader(filepath);
      imageAvatar = newPath.url;
      fs.unlinkSync(filepath);

      const parsedAddress = JSON.parse(req.body.address);

      const inscrit = {
        imageAvatar: imageAvatar,
        username: username,
        email: email,
        password: password,
        address: {
          label: parsedAddress.label,
          name: parsedAddress.name,
          postcode: parsedAddress.postcode,
          city: parsedAddress.city,
          long: parsedAddress.long,
          lat: parsedAddress.lat,
        },
      };

      const user = await User.create(inscrit);
      return res.status(201).json({ success: true, data: "user" });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: 401, data: "Profil déjà existant" });
    }
    return res.status(400).json({ success: "false1", error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

import jwt from "jsonwebtoken";
export default function role(token) {
  const connecte = jwt.decode(token.access_token, process.env.JWT_SECRET);

  return connecte.role;
}

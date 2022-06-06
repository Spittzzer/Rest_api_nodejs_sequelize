import jwt from "jsonwebtoken";
import privateKey from "./privateKey.js";

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = "authorization header is missing";
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = `unauthorized access: ${error.message}`;
      return res.status(401).json({ message, data: error });
    }

    const userId = decodedToken.userId;
    if (req.body.userId !== userId) {
      const message = `invalid token userId: ${userId}`;
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};

export default auth;

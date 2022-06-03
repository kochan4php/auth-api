import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ message: "Token tidak valid!" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Token Expired, silahkan login lagi" });

      const email = decode.email;
      console.log(email);
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;

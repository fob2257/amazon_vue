const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearer = "Bearer ";
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  const isBearer = token?.startsWith(bearer);

  if (!token || !isBearer) {
    return res
      .status(400)
      .json({ success: false, message: "Bearer token is required" });
  }

  token = token.slice(bearer.length, token.length);

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decoded) => {
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    req.decoded = decoded;

    next();
  });
};

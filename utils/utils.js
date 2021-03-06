const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    },
    process.env.JWT_SECRET || "SECRETITIS",
    { expiresIn: "30d" }
  );
};

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || "SECRETITIS", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

exports.getMonthCustom = (date) => {
  if (!date) return undefined;

  let myDate = new Date(date.split("").slice(0, 10).join(""));
  let day = (myDate.getMonth() + 1).toString();
  let year = myDate.getFullYear().toString();
  let dY = year + day;
  return parseInt(dY);
};

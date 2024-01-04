const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  let { token } = req.cookies;
  if (!token) {
    return res.redirect("/user/login");
  }
  
  let data = jwt.verify(token, "token");
  if (data.role == "admin") {
    req.user=data
    return next();
  } else {
    return res.send("not authorized");
  }
};

module.exports =isAdmin
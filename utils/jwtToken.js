const jwtPackage = require("jsonwebtoken");

const jwt = jwtPackage;

// acccess token
exports.jwtToken = async function (Userid) {
  console.log(Userid);
  return jwt.sign({ id: Userid }, process.env.ACCESS_TOKEN, {
    expiresIn: "1m",
  });
};

// refreshtoken
exports.refreshToken = async function (Userid) {
  return jwt.sign({ id: Userid }, process.env.SECERET_TOKEN, {
    expiresIn: "30d",
  });
};
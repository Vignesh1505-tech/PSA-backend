const { encrypt, decrypt } = require("./crypto.js");
const jwtPackage = require("jsonwebtoken")
const pool = require("../config/db.js")
const functions = require("./jwtToken.js")


const jwt = jwtPackage;

exports.refreshController = async (req, res) => {
  try {
    const { userid, refreshToken } = req.body;
    console.log("refresh_from_app",refreshToken,userid)

    const userExist = await pool.query(`SELECT * FROM tbl_user WHERE userid = $1`,[userid])
    if (!userExist) return res.status(400).json({ message: "user not exist" });
    const decryptToken = decrypt(refreshToken);
    
    const decoded = jwt.verify(decryptToken, process.env.SECERET_TOKEN)
    console.log("decoded",decoded.id)

    const user = await pool.query(`SELECT * FROM tbl_user WHERE userid = $1`,[decoded.id])

    if (user.rows[0].userid == userid) {
      const token = await functions.jwtToken(user.rows[0].userid);
      const refresh = await functions.refreshToken(user.rows[0].userid);
      const encryptedToken = encrypt(refresh);

      return res.status(200).json({
        message: "successfull",
        token,
        encryptedToken,
      });
    } else {
      return res.status(500).json({
        message: "Refresh Token is not valid",
      });
    }
  } catch (error) {
    console.log(error.message);
    console.log("Unable to create a register");
  }
};

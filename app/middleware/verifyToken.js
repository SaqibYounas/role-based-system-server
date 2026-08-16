const jwt = require("jsonwebtoken");
const STATUS_CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.AUTH.TOKEN_MISSING,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).populate("roleHistory");
    if (!user) {
      res.clearCookie("token");
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.AUTH.TOKEN_INVALID,
      });
    }

    const tokenRoleCount = decoded.roleHistoryCount || 0;
    const currentRoleCount = user.roleHistory.length;
    if (currentRoleCount > tokenRoleCount) {
      res.clearCookie("token");
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: "Your role has changed.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    res.clearCookie("token");
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.AUTH.TOKEN_INVALID,
    });
  }
};

module.exports = verifyToken;

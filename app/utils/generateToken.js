const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    console.log(user.role.name)
    return jwt.sign(
        {
            userId: user._id,
            role: user.role.name,
            permissions: user.role.permissions,
            roleHistoryCount: user.roleHistory.length,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );
};

module.exports = generateToken;

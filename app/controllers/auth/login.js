const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const generateToken = require("../../utils/generateToken");

const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate({
            path: "role",
        });

        if (!user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.AUTH.INVALID_EMAIL,
            });
        }

        if (!user.role) {
            return res.status(STATUS_CODES.FORBIDDEN).json({
                success: false,
                message: MESSAGES.ROLE.UNASSIGNED_ROLE,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.AUTH.INVALID_PASSWORD,
            });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.AUTH.LOGIN_SUCCESS,
            user: {
                id: user._id,
                name: user.name,
                role: user.role.name,
                permissions: user.role.permissions,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.AUTH.SERVER_ERROR,
        });
    }
};

module.exports = login;

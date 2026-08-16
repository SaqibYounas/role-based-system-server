const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const Role = require("../../models/roles");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.AUTH.USER_ALREADY_EXISTS,
            });
        }

        const employeeRole = await Role.findOne({ name: "Employee" });
        if (!employeeRole) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: MESSAGES.ROLE.EMPLOYEE_NOT_FOUND,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: employeeRole._id,
        });

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.AUTH.SIGNUP_SUCCESS,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.AUTH.SERVER_ERROR,
        });
    }
};

module.exports = signup;

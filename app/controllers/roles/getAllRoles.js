const Role = require("../../models/roles");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({
            name: { $nin: ["Admin"] },
        }).select("name");

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ROLE.FETCH_SUCCESS,
            roles,
        });
    } catch (err) {
        console.error("Get All Roles Error:", err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.ROLE.FETCH_FAILED,
        });
    }
};

module.exports = getAllRoles;

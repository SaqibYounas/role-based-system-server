const Permission = require("../../models/permission");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find()
            .select("_id name description")

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PERMISSION.FETCH_SUCCESS,
            permissions,
        });
    } catch (error) {
        console.error("Get Permissions Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.PERMISSION.FETCH_FAILED,
        });
    }
};

module.exports = getAllPermissions;

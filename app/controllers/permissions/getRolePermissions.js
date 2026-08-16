const Role = require("../../models/roles");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const getRolePermissions = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findById(id);
        if (!role) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.ROLE.NOT_FOUND,
            });
        }

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ROLE.PERMISSIONS_FETCH_SUCCESS,
            role: {
                id: role._id,
                name: role.name,
                permissions: role.permissions,
            },
        });
    } catch (error) {
        console.error("Get Role Permissions Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.ROLE.SERVER_ERROR,
        });
    }
};

module.exports = getRolePermissions;

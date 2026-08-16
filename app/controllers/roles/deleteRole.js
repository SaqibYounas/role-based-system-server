const Role = require("../../models/roles");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findById(id);
        if (!role) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.ROLE.NOT_FOUND,
            });
        }

        if (role.name === "Admin" || role.name === "Super Admin") {
            return res.status(STATUS_CODES.FORBIDDEN).json({
                success: false,
                message: MESSAGES.ROLE.DELETE_FORBIDDEN,
            });
        }

        await Role.findByIdAndDelete(id);

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ROLE.DELETE_SUCCESS,
        });
    } catch (error) {
        console.error("Delete Role Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.COMMON.SERVER_ERROR,
        });
    }
};

module.exports = deleteRole;

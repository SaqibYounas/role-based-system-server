const Role = require("../../models/roles");
const Permission = require("../../models/permission");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        if (!name || !Array.isArray(permissions) || permissions.length === 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.ROLE.REQUIRED_FIELDS,
            });
        }

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(STATUS_CODES.CONFLICT).json({
                success: false,
                message: MESSAGES.ROLE.ALREADY_EXISTS,
            });
        }

        const permissionDocs = await Permission.find({ name: { $in: permissions } });

        if (permissionDocs.length === 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.ROLE.INVALID_PERMISSIONS,
            });
        }

        const role = await Role.create({
            name,
            permissions: permissionDocs.map((p) => ({ name: p.name })),
        });

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.ROLE.CREATED_SUCCESS,
            role,
        });
    } catch (error) {
        console.error("Create Role Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.ROLE.CREATE_FAILED,
        });
    }
};

module.exports = createRole;

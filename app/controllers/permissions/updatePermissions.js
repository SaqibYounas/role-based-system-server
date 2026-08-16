const Role = require("../../models/roles");
const Permission = require("../../models/permission");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    if (!id) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ROLE.NOT_FOUND,
      });
    }

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

    role.name = name;
    role.permissions = [];

    const allPermissions = await Permission.find({ name: { $in: permissions } });
    const permissionObjects = allPermissions.map((p) => ({
      _id: p._id,
      name: p.name
    }));

    role.permissions = permissionObjects;

    await role.save();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Role updated successfully",
      role,
    });
  } catch (error) {
    console.error("Update Role Error:", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.ROLE.SERVER_ERROR,
    });
  }
};

module.exports = updateRole;

const User = require("../../models/user");
const Role = require("../../models/roles");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const updateUserRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    const userId = req.params.id;

    if (!userId || !roleId) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.USER.ID_OR_ROLE_REQUIRED,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
      });
    }

    const newRole = await Role.findById(roleId);
    if (!newRole) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.ROLE.NOT_FOUND,
      });
    }

    user.roleHistory.push({
      previousRole: user.roleName,
      changedByName: req.user?.role,
      changedAt: new Date(),
    });

    user.role = newRole._id;
    user.roleName = newRole.name;

    await user.save();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.USER.ROLE_UPDATED_SUCCESS,
    });
  } catch (error) {
    console.error("Update Role Error:", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.SERVER_ERROR,
    });
  }
};

module.exports = updateUserRole;

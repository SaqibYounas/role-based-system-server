const User = require("../../models/user");

const getMyPermissions = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate({
            path: "role",
            select: "permissions name",
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            role: user.role.name,
            permissions: user.role.permissions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = getMyPermissions;

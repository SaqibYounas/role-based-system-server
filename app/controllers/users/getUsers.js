const User = require("../../models/user");
const STATUS_CODES = require("../../constants/statusCodes");
const MESSAGES = require("../../constants/messages");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({
            isActive: true,
            "_id": { $ne: req.user.userId },
        })
            .select("name email isActive role")
            .populate({
                path: "role",
                select: "name",
            });


        const formattedUsers = users.map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            role: user.role?.name || null,
        }));

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.USER.FETCH_SUCCESS,
            totalUsers: formattedUsers.length,
            users: formattedUsers,
        });

    } catch (error) {
        console.error("Get All Users Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.USER.SERVER_ERROR,
        });
    }
};

module.exports = getAllUsers;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },

        roleName: {
            type: String,
            default: "Employee",
        },

        roleHistory: [
            {
                previousRole: {
                    type: String,
                },

                changedByName: {
                    type: String,
                },

                changedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema,"users");

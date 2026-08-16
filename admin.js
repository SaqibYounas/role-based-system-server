const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./app/models/user");  // correct path
const Role = require("./app/models/roles");  // must import Role model

const MONGO_URI = "mongodb://127.0.0.1:27017/Roles"; // tumhara DB

async function resetAdminPassword(email, newPassword) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email }).populate("role"); // populate Role

    if (!user) {
      console.log("User not found");
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log("Admin password reset successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error resetting password:", error);
    mongoose.connection.close();
  }
}

// ---------------------------
// CHANGE THESE VALUES
const adminEmail = "muhammadsaqibyounas11@gmail.com";
const newAdminPassword = "saqib";

resetAdminPassword(adminEmail, newAdminPassword);

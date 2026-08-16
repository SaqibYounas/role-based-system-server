const express = require("express");
const router = express.Router();
const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const verifyToken = require("../middleware/verifyToken");

const getSpecificRoles = require("../controllers/roles/getSpecificRole");
const getAllUsers = require("../controllers/users/getUsers");
const updateUserRole = require("../controllers/roles/updateRole");
const createUserRole = require("../controllers/roles/createRole");
const getAllPermissions = require("../controllers/permissions/getAllPermissions");
const getRolePermissions = require("../controllers/permissions/getRolePermissions");
const deleteRole = require("../controllers/roles/deleteRole");
const updatePermissions = require("../controllers/permissions/updatePermissions");
const getMyPermissions = require("../controllers/permissions/getMyPermissions");
const getAllRoles = require("../controllers/roles/getAllRoles");

router.get("/roles", verifyToken, getSpecificRoles);
router.get("/roles/all", verifyToken, getAllRoles);
router.get("/roles/:id", verifyToken, getRolePermissions);
router.post("/role/create", verifyToken, createUserRole);
router.put("/roles/:id/permissions", verifyToken, updatePermissions);
router.delete("/roles/:id", verifyToken, deleteRole);

router.get("/users", verifyToken, getAllUsers);
router.put("/users/:id/role", verifyToken, updateUserRole);
router.put("/users/:id/permission", verifyToken, updatePermissions);

router.get("/permissions", verifyToken, getAllPermissions);
router.get("/me/permissions", verifyToken, getMyPermissions);

router.post("/login", login);
router.post("/register", signup);

router.get("/verify", verifyToken, (req, res) => {
    res.json({
        valid: true,
        role: req.user.role,
        permissions: req.user.permissions,
    });
});

module.exports = router;

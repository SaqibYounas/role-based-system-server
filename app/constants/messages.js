const MESSAGES = {
    ROLE: {
        REQUIRED_FIELDS: "Role name and permissions are required",
        ALREADY_EXISTS: "Role already exists",
        INVALID_PERMISSIONS: "Invalid permissions selected",
        CREATED_SUCCESS: "Role created successfully",
        CREATE_FAILED: "Failed to create role",
        FETCH_SUCCESS: "Roles fetched successfully",
        FETCH_FAILED: "Server error while fetching roles",
        NOT_FOUND: "Role not found",
        PERMISSIONS_FETCH_SUCCESS: "Role permissions fetched successfully",
        SERVER_ERROR: "Server error",
        EMPLOYEE_NOT_FOUND: "Employee role not found",
        NOT_FOUND: "Role not found",
        DELETE_SUCCESS: "Role deleted successfully",
        DELETE_FORBIDDEN: "This role cannot be deleted",
        SERVER_ERROR: "Server error",
        UNASSIGNED_ROLE: "You are not assigned a current role"
    },
    USER: {
        FETCH_SUCCESS: "Users fetched successfully",
        SERVER_ERROR: "Server error",
        ID_OR_ROLE_REQUIRED: "User ID or Role ID required",
        NOT_FOUND: "User not found",
        ROLE_UPDATED_SUCCESS: "Role updated successfully",
    },
    AUTH: {
        INVALID_EMAIL: "Invalid email",
        INVALID_PASSWORD: "Invalid password",
        LOGIN_SUCCESS: "Login successful",
        SERVER_ERROR: "Server error",
        USER_ALREADY_EXISTS: "User already exists with this email",
        SIGNUP_SUCCESS: "Signup successful",
        SERVER_ERROR: "Server error",
        TOKEN_MISSING: "No token, access denied",
        TOKEN_INVALID: "Invalid or expired token",
    },
    PERMISSION: {
        FETCH_SUCCESS: "Permissions fetched successfully",
        FETCH_FAILED: "Server error while fetching permissions",
    },
    COMMON: {
        SERVER_ERROR: "Server error",
    },
};

module.exports = MESSAGES;

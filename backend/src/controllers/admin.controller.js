import {User} from "../models/user.models.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const updateRole = asyncHandler(async(req,res) => {
    // Get the user id of the user to whom we need to update the role
    // Also get what role should we assign to the user
    // Validate if the userId and role are provided
    // Add an additional check if the user that is changing the role is admin (We will take care of this in frontend as well)
    // Also check if the userI and user both points to an admin
    // Update the role of the user
    // Send the response

    const {userId, newRole} = req.body;

    if (!(userId && newRole)) {
        throw new ApiError(400, "User ID and role are required");
    }

    if(req?.user?.role !== "admin") {
        throw new ApiError(403, "Only admin can update role");
    }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
        throw new ApiError(404, "User not found");
    }

    if (newRole === "admin" && userToUpdate.role === "admin") {
        throw new ApiError(400, "User is already an admin");
    }

    userToUpdate.role = newRole;
    await userToUpdate.save();

    return res.status(200)
        .json(new ApiResponse(
        200,
        `User role updated to ${newRole}`,
    ));
});

const getAllUsers = asyncHandler(async(req,res) => {
    // Get all users
    // Send the response

    const users = await User.find().select("-password -refreshToken");
    
    return res.status(200)
        .json(new ApiResponse(
        200,
        'Users fetched successfully',
        users
    ));
});

export {
    updateRole,
    getAllUsers
}
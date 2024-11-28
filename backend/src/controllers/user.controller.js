import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (user) => {
    // const user = await User.findById(id);
    if (!user) throw new ApiError(404, "User not found during token generation");
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {accessToken, refreshToken}
}

const registerUser = asyncHandler(async(req,res) => {
    // Get the data from the frontend
    // Validate the data
    // Check if user already exists
    // Store the database in the database
    // remove password and refresh token from response
    // Send the response

    const {name, username, email, password, userPicPath} = req.body;

    if([name, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters");
    }

    const isExistingUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(isExistingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        name,
        username,
        email,
        password,
        userPicPath
    });

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);    

    const options = {
        http: true,
        secure: true,
        sameSite: "Strict",
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async(req,res) => {
    // Get the details from the front-end
    // Validate the data
    // Check if user exists in the database. If not, throw an error
    // Check if password is correct. If not, throw an error
    // Remove password and refresh token from response
    // Send the response

    const {email, username, password} = req.body;

    if(!(email || username)) {
        throw new ApiError(400, "Email or Username is required");
    }

    if(!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    });

    if(!user) {
        throw new ApiError(404, "User not found");
    }    

    const isValidPassword = await user.isPasswordCorrect(password);    

    if(!isValidPassword) {
        throw new ApiError(401, "Invalid password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);    

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
    const options = {
        http: true,
        secure: true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        "User logged in succesfully",
        {
            user: loggedInUser,
            accessToken,
            refreshToken
        },
    ))
});

const logoutUser = asyncHandler(async(req,res) => {
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1, // this removes the field from document.
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,"User logged out",{}))
});

export {
    registerUser,
    loginUser,
    logoutUser,
}
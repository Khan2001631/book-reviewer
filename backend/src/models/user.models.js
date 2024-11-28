import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    userPicPath: {
        type: String,
        default: "/default/user.png"
    },
    role: {
        type: String,
        enum: ["member", "admin", "moderator"],
        default: "member",
    },
    refreshToken: {
        type: String
    },
    userId: {
        type: Number,
        unique: true,
        min: 1,
        max: 9999
    }
}, {timestamps: true});

// Pre-save hook to handle password hashing and userId generation before saving the user document
userSchema.pre("save", async function (next) {
    try {
        // Only hash the password if it has been modified
        if (this.isModified("password")) {
            // Hash the password with bcrypt
            this.password = await bcrypt.hash(this.password, 10);
        }

        // Generate a unique `userId` if it does not exist
        if (!this.userId) {
            const lastUser = await User.findOne().sort({ userId: -1 }).exec();
            const lastUserId = lastUser?.userId || 0;

            // Ensure `userId` is incremented and wraps around at 10000
            this.userId = (lastUserId + 1) % 10000; 
        }

        // Proceed with saving the document
        next();
    } catch (err) {
        // Handle errors and pass them to the next middleware
        next(err);
    }
});

// Instance method to check if the password is correct (used during login)
userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        // Compare provided password with hashed password in the DB
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error('Error comparing password');
    }
};

// Instance method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
    try {
        // Generate a JWT token for the user with an expiration time
        return jwt.sign(
            { _id: this._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
    } catch (err) {
        throw new Error('Error generating access token');
    }
};

// Instance method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
    try {
        // Generate a JWT refresh token for the user with an expiration time
        return jwt.sign(
            { _id: this._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
    } catch (err) {
        throw new Error('Error generating refresh token');
    }
};

export const User = mongoose.model('User', userSchema)

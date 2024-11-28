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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    // Hash the password if modified
    this.password = await bcrypt.hash(this.password, 10);
    
    // Generate a 4-digit `userId` if it does not exist
    if (!this.userId) {
        // Find the maximum existing `userId`
        const lastUser = await User.findOne().sort({ userId: -1 }).exec();
        const lastUserId = lastUser?.userId || 0;

        // Assign the next userId (increment by 1)
        this.userId = (lastUserId + 1) % 10000; // Ensure it wraps around at 10000
    }

    next();
});


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
    {
        _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
    {
        _id: this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model('User', userSchema)

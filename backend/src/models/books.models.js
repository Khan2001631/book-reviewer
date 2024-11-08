import mongoose, {Schema} from "mongoose";
import { v4 as uuidv4 } from "uuid"; // UUID package for generating unique IDs


const bookSchema = new Schema({
    bookId: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4 
    },
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    reviews: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
    }],
    language: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
},{timestamps: true});

// Method to increase upvotes
bookSchema.methods.upvote = function() {
    this.upvotes += 1;
    return this.save(); // Save the updated document
};

// Method to decrease upvotes
bookSchema.methods.downvote = function() {
    this.downvotes += 1;
    return this.save(); // Save the updated document
};

// Method to reset upvotes
bookSchema.methods.resetUpvotes = function() {
    this.upvotes = 0;
    return this.save();
};

// Method to reset downvotes
bookSchema.methods.resetDownvotes = function() {
    this.downvotes = 0;
    return this.save();
};

export const Book = mongoose.model("Book", bookSchema);
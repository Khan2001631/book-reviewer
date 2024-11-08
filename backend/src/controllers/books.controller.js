import { asyncHandler } from "../utils/asyncHandler.js";
import {Book} from '../models/books.models.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const displayBooks = asyncHandler (async (req, res) => {
    // Get the bookId from the frontend
    // Get all the books from the database
    // Send the response
    const {bookId} = req.body;    

    if(bookId === undefined) {
        throw new ApiError(400, "BookId is required");
    }

    if(bookId === 0) {
        const displayAllBooks = await Book.find();     

        return res.status(200)
        .json(new ApiResponse(
            200,
            "Books fetched successfully",
            displayAllBooks
        ));
    }

    const displaySelectedBook = await Book.findOne({
        bookId: bookId
    });

    return res.status(200)
    .json(new ApiResponse(
        200,
        "Book fetched successfully",
        displaySelectedBook
    ));
});

const addBooks = asyncHandler (async (req, res) => {
    // Get the data from the frontend
    // Validate the data
    // Validate if the title already exists in the database
    // Create a new book
    // Send the response    

    const {title, author, synopsis, imageUrl, genre, ratings, language} = req.body;

    if([title, author, synopsis, imageUrl, genre, ratings, language].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }    

    const isExistingBook = await Book.findOne({
        title
    })

    if(isExistingBook) {
        throw new ApiError(409, "Book already exists");
    }    
    const newBook = await Book.create({
        title,
        author,
        synopsis,
        imageUrl,
        genre,
        ratings,
        language,
        owner: req.user._id
    });    

    return res.status(201)
    .json(new ApiResponse(
        201,
        "Book created successfully",
        newBook
    ))
});

const editBooks = asyncHandler (async (req, res) => {
    // Get the data from the frontend
    // Validate the data
    // Update the book
    // Send the response

    const {title, author, description, imageUrl, genre, ratings, language} = req.body;

    if([title, author, description, imageUrl, genre, ratings, language].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const isExistingBook = await Book.findOne({
        title
    });

    if(!isExistingBook) {
        throw new ApiError(404, "Book not found");
    }

    const updatedBook = await Book.findOneAndUpdate(
        {title},
        {
            title,
            author,
            description,
            imageUrl,
            genre,
            ratings,
            language
        },
        {
            new: true
        }
    );

    return res.status(200)
    .json(new ApiResponse(
        200,
        "Book updated successfully",
        updatedBook
    ))
});

const deleteBook = asyncHandler (async (req, res) => {
    // Get the data from the frontend
    // Validate the data
    // Delete the book
    // Send the response

    const {bookId} = req.body;

    if(!bookId) {
        throw new ApiError(400, "Title is required");
    }

    const isExistingBook = await Book.findOne({
        bookId
    });

    if(!isExistingBook) {
        throw new ApiError(404, "Book not found");
    }

    const deletedBook = await Book.findOneAndDelete({
        bookId
    });

    return res.status(200)
    .json(new ApiResponse(
        200,
        "Book deleted successfully",
        deletedBook
    ))
});

const updateBookReview = asyncHandler(async (req, res) => {
    const { bookId, userReview, rating, upvote, downvote } = req.body;

    if (!userReview || !bookId) {
        throw new ApiError(400, "Review and bookId are required");
    }

    const isExistingBook = await Book.findOne({ bookId });
    if (!isExistingBook) {
        throw new ApiError(404, "Book not found");
    }

    // Prepare update operations
    const updateOperations = {
        $push: {
            reviews: {
                userId: req.user._id,
                text: userReview,
                rating
            }
        }
    };

    // Increment upvotes or downvotes if specified
    if (upvote) {
        updateOperations.$inc = { ...updateOperations.$inc, upvotes: 1 };
    }
    if (downvote) {
        updateOperations.$inc = { ...updateOperations.$inc, downvotes: 1 };
    }

    // Perform the update
    const updatedBook = await Book.findOneAndUpdate(
        { bookId },
        updateOperations,
        { new: true }  // Return the updated document
    );

    return res.status(200).json(new ApiResponse(
        200,
        "Book review updated successfully",
        updatedBook
    ));
});


export {
    displayBooks,
    addBooks,
    editBooks,
    deleteBook,
    updateBookReview
}
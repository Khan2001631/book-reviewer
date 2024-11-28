import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaStar } from "react-icons/fa";

interface ISelectedBookProps {
    bookReviews: any;
}

const SelectedBook: React.FC<ISelectedBookProps> = ({ bookReviews }) => {
    const [upvotes, setUpvotes] = useState<number>(bookReviews.upvotes || 0);
    const [downvotes, setDownvotes] = useState<number>(bookReviews.downvotes || 0);
    const [rating, setRating] = useState<number>(bookReviews.ratings);
    const [reviews, setReviews] = useState<string[]>([]);
    const [newReview, setNewReview] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        if(bookReviews) {
            setReviews(bookReviews.reviews?.map((review: any) => review.text));
            setUpvotes(bookReviews.upvotes || 0);
            setDownvotes(bookReviews.downvotes || 0);
        }
    },[bookReviews]);

    const handleUpvote = () => {
        if (liked) {
            setUpvotes(upvotes - 1);
            setLiked(false);
        } else {
            setUpvotes(upvotes + 1);
            if (disliked) {
                setDownvotes(downvotes - 1);
                setDisliked(false);
            }
            setLiked(true);
        }
    };

    const handleDownvote = () => {
        if (disliked) {
            setDownvotes(downvotes - 1);
            setDisliked(false);
        } else {
            setDownvotes(downvotes + 1);
            if (liked) {
                setUpvotes(upvotes - 1);
                setLiked(false);
            }
            setDisliked(true);
        }
    };

    const handleRating = (newRating: number) => setRating(newRating);
    
    const handleSubmit = async () => {
        if(newReview.length === 0) {
            return;
        }   
        const payload = {
            bookId: bookReviews.bookId,
            userReview: newReview,
            rating,
            upvotes,
            downvotes
        };
        await axios.post("/api/v1/books/updateBookReview",payload);        
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-transparent text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Book Image */}
                <div className="w-full md:w-1/3 overflow-hidden rounded-lg shadow-lg">
                    <img 
                        src={bookReviews.imageUrl} 
                        alt={bookReviews.title} 
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-300 ease-in-out" 
                    />
                </div>
                
                {/* Book Details */}
                <div className="flex-1 space-y-3">
                    <h2 className="text-3xl font-semibold">{bookReviews.title}</h2>
                    <p className="text-lg font-medium text-gray-300">by {bookReviews.author}</p>
                    <p className="text-gray-400">{bookReviews.description}</p>
                    
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-700 rounded-full text-sm font-medium">{bookReviews.genre}</span>
                        <span className="px-3 py-1 bg-green-700 rounded-full text-sm font-medium">{bookReviews.language}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <FaStar
                                key={i}
                                onClick={() => handleRating(i)}
                                className={`cursor-pointer ${i <= rating ? "text-yellow-400" : "text-gray-600"} transition duration-200`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <button
                            onClick={handleUpvote}
                            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
                                liked ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            <FaThumbsUp /> <span>{upvotes}</span>
                        </button>
                        <button
                            onClick={handleDownvote}
                            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
                                disliked ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            <FaThumbsDown /> <span>{downvotes}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold">User Reviews</h3>
                
                {/* Review Input */}
                <div className="mt-4">
                    <textarea
                        className="w-full p-3 rounded-lg bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Write your review here..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-150"
                    >
                        Submit
                    </button>
                </div>

                {/* Display Reviews */}
                <div className="mt-6 space-y-4">
                    {reviews?.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md text-gray-300">
                                {review}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectedBook;

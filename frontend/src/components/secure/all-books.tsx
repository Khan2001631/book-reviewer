import React from "react"
import { Link, useNavigate } from "react-router-dom";
import NoBooks from '../../assets/images/no-book.png'

interface AllBooksProps {
    bookReviews: any[]
}


const AllBooks: React.FC<AllBooksProps> = ({bookReviews}) => {    
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800">
            {bookReviews.length > 0 ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
                        {bookReviews.map((book) => (
                            <div
                                key={book.bookId}
                                className="group w-[200px] flex-shrink-0 rounded-lg bg-gray-800 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700 cursor-pointer"
                                onClick={() =>
                                    navigate('/app/reviewBooks', {
                                        state: { passedBookId: book.bookId },
                                    })
                                }
                            >
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="h-48 w-full object-cover rounded-t-lg group-hover:brightness-90"
                                />
                                <div className="p-4 space-y-1">
                                    <h3 className="font-semibold text-lg text-white truncate">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 truncate">
                                        {book.author}
                                    </p>
                                    <p className="text-xs text-blue-400 mt-2 font-medium uppercase">
                                        {book.genre}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link
                            to="/app/addBook"
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
                        >
                            Add Book
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <img
                        src={NoBooks}
                        alt="No Books Illustration"
                        className="w-40 h-40 opacity-80 drop-shadow-md"
                    />
                    <p className="mt-4 text-2xl font-bold text-gray-300">
                        No Books to Review
                    </p>
                    <p className="text-gray-400 mt-2 max-w-md">
                        You don’t have any books to review right now. Start by adding a book to your collection and review them here!
                    </p>
                    <Link
                        to="/app/addBook"
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
                    >
                        Add Your First Book
                    </Link>
                </div>
            )}
        </div>
    );    
}

export default AllBooks;
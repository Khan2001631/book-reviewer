import React from "react"
import { Link, useNavigate } from "react-router-dom";
import NoBooks from '../../assets/images/no-book.png'

interface AllBooksProps {
    bookReviews: any[]
}


const AllBooks: React.FC<AllBooksProps> = ({bookReviews}) => {    
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen p-6">
            {bookReviews.length > 0 ? (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {bookReviews.map((book) => (
                            <div
                                key={book.bookId}
                                className="w-[200px] flex-shrink-0 rounded-lg bg-gray-800 text-white p-4 cursor-pointer hover:bg-gray-700"
                                onClick={() => navigate('/app/reviewBooks', {state: {passedBookId: book.bookId}})}
                            >
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="h-48 w-full object-cover rounded-t-lg"
                                />
                                <div className="p-2">
                                    <h3 className="font-semibold text-lg">{book.title}</h3>
                                    <p className="text-sm text-gray-400">{book.author}</p>
                                    <p className="text-xs mt-2">{book.genre}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/app/addBook" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Book</Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <img
                        src={NoBooks}
                        alt="No Books Illustration"
                        className="w-40 h-40 opacity-50"
                    />
                    <p className="mt-4 text-xl font-semibold text-gray-500">
                        No Books to Review
                    </p>
                    <p className="text-gray-400 mt-2">
                        Check back later or add some books to get started!
                    </p>
                </div>
            )}
        </div>
    )
}

export default AllBooks;
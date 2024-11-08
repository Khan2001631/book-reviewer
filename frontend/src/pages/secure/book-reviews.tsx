import axios from "axios";
import { useEffect, useState } from "react";
import { BookReviewsInterface } from "../../interfaces/secure/books.interface";
import {  useLocation } from "react-router-dom";
import AllBooks from "../../components/secure/all-books";
import SelectedBook from "../../components/secure/selected-book";

const BookReviews = () => {
    const location = useLocation();
    const {passedBookId} = location.state || {};
    const [bookReviews, setBookReviews] = useState<BookReviewsInterface[]>([]);
    
    useEffect(() => {
        fetchBookReviews();
    },[passedBookId]);    

    const fetchBookReviews = async () => {
        try {
            const payload = {
                bookId: passedBookId || 0
            }
            const bookReviews = await axios.post('/api/v1/books/',payload);
            if(bookReviews?.data?.success === true) {
                setBookReviews(bookReviews?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {!passedBookId ? (
                <AllBooks bookReviews={bookReviews} />
            ) : (
                <SelectedBook bookReviews={bookReviews}/>
            )
            }
        </div>
    );
    
    
};

export default BookReviews;

import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BookReviews from "./book-reviews";
import AddBook from "./add-book";

const Secure = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/reviewBooks' element={<BookReviews />} />
                <Route path="/addBook" element={<AddBook />} />
                <Route path="*" element={<Navigate to="/home" replace />} ></Route>
            </Routes>
        </Suspense>

    )
}

export default Secure;
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BookReviews from "./book-reviews";
import AddBook from "./add-book";
import AdminGuard from "../../guards/admin-guard";
import AdminPage from "./admin/admin";

const Secure = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/reviewBooks' element={<BookReviews />} />
                <Route path="/addBook" element={<AddBook />} />
                <Route path="/admin" element={<AdminGuard><AdminPage /></AdminGuard>} />
                <Route path="*" element={<Navigate to="/home" replace />} ></Route>
            </Routes>
        </Suspense>

    )
}

export default Secure;
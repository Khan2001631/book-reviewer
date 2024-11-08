import { Router } from "express";
import { displayBooks, addBooks, deleteBook, editBooks, updateBookReview } from "../controllers/books.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/').post(displayBooks);

router.route('/addBook').post(verifyJwt,addBooks);

router.route('/deleteBook').post(verifyJwt, deleteBook);

router.route('/editBooks').post(editBooks);

router.route('/updateBookReview').post(verifyJwt, updateBookReview);



export default router;
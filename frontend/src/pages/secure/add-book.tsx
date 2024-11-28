import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface BookFormInputs {
    title: string;
    synopsis: string;
    author: string;
    genre: string;
    imageUrl: string;
    ratings: number;
    language: string;
}

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<BookFormInputs>();

    const onSubmit: SubmitHandler<BookFormInputs> = async(data) => {
        try {
            await axios.post("/api/v1/books/addBook", data);
            resetValues();
            
        } catch (error) {
            console.log(error);
            
        }
    };

    const resetValues = () => {
        reset();
        clearErrors();
    }

    return (
        <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center">
            <h2 className="text-4xl font-extrabold text-gray-100 mb-12">Add a New Book</h2>
            <div className="w-full max-w-2xl bg-gray-900 shadow-2xl rounded-lg p-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 font-semibold mb-1">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1">Author</label>
                        <input
                            type="text"
                            {...register("author", { required: "Author is required" })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1">Genre</label>
                        <input
                            type="text"
                            {...register("genre", { required: "Genre is required" })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1">Image URL</label>
                        <input
                            type="text"
                            {...register("imageUrl", { required: "Image URL is required" })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.imageUrl && <p className="text-red-400 text-sm mt-1">{errors.imageUrl.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1">Ratings</label>
                        <input
                            type="number"
                            {...register("ratings", {
                                required: "Ratings are required",
                                min: { value: 0, message: "Ratings must be at least 0" },
                                max: { value: 5, message: "Ratings cannot exceed 5" }
                            })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.ratings && <p className="text-red-400 text-sm mt-1">{errors.ratings.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1">Language</label>
                        <input
                            type="text"
                            {...register("language", { required: "Language is required" })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">Synopsis</label>
                        <textarea
                            {...register("synopsis", { required: "Synopsis is required" })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            rows={4}
                        ></textarea>
                        {errors.synopsis && <p className="text-red-400 text-sm mt-1">{errors.synopsis.message}</p>}
                    </div>

                    <button
                        onClick={handleSubmit(onSubmit)}
                        className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>

    );
};

export default AddBook;

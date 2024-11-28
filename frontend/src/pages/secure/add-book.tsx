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
        <div className="p-8 space-y-6 bg-black min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-8">Add a New Book</h2>
            <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold text-white">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold text-white">Author</label>
                    <input
                        type="text"
                        {...register("author", { required: "Author is required" })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold text-white">Genre</label>
                    <input
                        type="text"
                        {...register("genre", { required: "Genre is required" })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold text-white">Image URL</label>
                    <input
                        type="text"
                        {...register("imageUrl", { required: "Image URL is required" })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.imageUrl && <p className="text-red-400 text-sm mt-1">{errors.imageUrl.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold text-white">Ratings</label>
                    <input
                        type="number"
                        {...register("ratings", {
                            required: "Ratings are required",
                            min: { value: 0, message: "Ratings must be at least 0" },
                            max: { value: 5, message: "Ratings cannot exceed 5" }
                        })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.ratings && <p className="text-red-400 text-sm mt-1">{errors.ratings.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold text-white">Language</label>
                    <input
                        type="text"
                        {...register("language", { required: "Language is required" })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block font-semibold text-white">Synopsis</label>
                    <textarea
                        {...register("synopsis", { required: "Description is required" })}
                        className="w-full px-4 py-2 border border-blue-300 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        rows={3}
                    ></textarea>
                    {errors.synopsis && <p className="text-red-400 text-sm mt-1">{errors.synopsis.message}</p>}
                </div>

                <button
                    onClick={handleSubmit(onSubmit)}
                    className="md:col-span-2 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBook;

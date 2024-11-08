import CoverImage from '../../assets/images/book-background.webp';

const Home = () => {
    return (
        <div
            className="relative h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${CoverImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Welcome to Book Reviews</h1>
                <p className="text-white text-lg md:text-2xl italic font-light">
                    "A room without books is like a body without a soul." – Marcus Tullius Cicero
                </p>
            </div>
        </div>
    );
};

export default Home;

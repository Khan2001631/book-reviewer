import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateLogout, updateUser } from "../../api-integeration/commonSlice";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    const [isLogin, setIsLogin] = useState<boolean>(isLoggedIn);
    const [userPic, setUserPic] = useState<string>('');
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsLogin(isLoggedIn);
        // Retrieve the user object from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // If user is logged in, set the userPicPath
        if (user) {
            if(user.userPicPath) {
                setUserPic(user.userPicPath);
            }
            if(user.role === "admin") {
                setIsAdmin(true);
            }
        } else {
            setUserPic('');
            setIsAdmin(false);
        }
    }, [isLoggedIn]);

    const handleLogout = async () => {
        try {
            await axios.post('/api/v1/users/logout', {});
            setIsLogin(false);
            localStorage.clear();
            dispatch(updateLogout());
            dispatch(updateUser(null));
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleAuthButtonClick = () => {
        if (isLogin) {
            handleLogout();
        } else {
            navigate('/auth');
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link to="/">MyLogo</Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className={`hover:underline ${location.pathname === '/' ? 'font-bold underline' : ''}`}
                    >
                        Home
                    </Link>
                    {isLoggedIn && (
                        <Link 
                            to='/app/reviewBooks'
                            className={`hover:underline ${location.pathname === '/app/reviewBooks' ? 'font-bold underline' : ''}`}
                        >
                            Review Books
                        </Link>
                    )}
                     {isLoggedIn && isAdmin && (
                        <Link 
                            to='/app/admin'
                            className={`hover:underline ${location.pathname === '/app/admin' ? 'font-bold underline' : ''}`}
                        >
                            Admin
                        </Link>
                    )}

                    {/* Conditional rendering for Login button or Profile */}
                    {isLogin ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 rounded-full focus:outline-none"
                            >
                                <img
                                    src={userPic || '/default-profile-pic.png'}  // fallback image if userPic is not available
                                    alt="User Profile"
                                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                                />
                            </button>
                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                                    <ul className="py-2">
                                        {/* <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-200"
                                            >
                                                Profile
                                            </Link>
                                        </li> */}
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleAuthButtonClick}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;

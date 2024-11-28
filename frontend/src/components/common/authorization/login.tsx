import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}


const Login: React.FC<LoginProps>= ({setIsLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async(e: any) => {
        e.preventDefault();

        // Perform login validation
        if(!email || !password) {
            setError("All fields are required to fill!");
            return;
        }
        const payload = {
            email,
            password,
        };
        try {
            const userResponse = await axios.post('/api/v1/users/login', payload);
            // Process the successful response
            const userData = userResponse?.data?.data;
            if(userResponse?.data?.success === true) {
                const user = {
                    username: userData?.user.username,
                    email: userData?.user.email,
                    userPicPath: userData?.user.userPicPath,
                    name: userData?.user.name,
                    role: userData?.user.role,
                    // isAdmin: userData.data?.user.isAdmin
                }
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('isLoggedIn','true');
                navigate('/');
            }
            else if(userResponse?.data?.success === false) {
                setError(userResponse?.data?.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "An error occurred.";
                setError(errorMessage); // Assume setLoginError is a state update function for the UI
            } else {
                // Handle other unexpected errors if needed
                console.error("An unexpected error occurred:", error); // Optional
            }
        }
        
    }


    return (
        <div>
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
            <div>
                <label className="block text-gray-700 font-medium">Email Address</label>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="text-right">
                <a href="#" className="text-blue-500 hover:underline text-sm">Forgot password?</a>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
                Login
            </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
            Not a member?{' '}
            <span onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline cursor-pointer">
                Signup now
            </span>
        </p>
    </div>
    )
}

export default Login;
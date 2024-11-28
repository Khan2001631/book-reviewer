import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISignUpInterface {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    userPicPath: string;
}

const validationRules = {
    name: { required: "Name is required" },
    username: { required: "Username is required" },
    email: { required: "Email is required" },
    password: { required: "Password is required" },
    confirmPassword: { required: "Please confirm your password" },
};

const SignUp: React.FC<SignUpProps> = ({ setIsLogin }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISignUpInterface>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const signUp = async(data: ISignUpInterface) => {
        try {
            const apiData = {
                ...data,
                role: data.email === process.env.REACT_APP_ADMIN_EMAIL ? "admin" : "member",
            }
            const userResponse = await axios.post('/api/v1/users/register',apiData);
            const userData = userResponse?.data?.data;
            console.log(userResponse?.data?.success);
            console.log(userData);
            
            if(userResponse?.data?.success === true) {
                const user = {
                    username: userData?.username,
                    email: userData?.email,
                    userPicPath: userData?.userPicPath,
                    name: userData?.name,
                    userId: userData?.userId
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
        
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Signup</h2>
            <form className="space-y-1" onSubmit={handleSubmit(signUp)}>
                <div className="flex space-x-4">
                    <div className="flex flex-col mb-4 w-full">
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                            {...register("name", validationRules.name)}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                            {...register("username", validationRules.username)}
                        />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>
                </div>
                
                {/* Repeat this pattern for other input fields */}
                <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                        {...register("email", validationRules.email)}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                <div className="flex space-x-4">
                    <div className="flex flex-col mb-4 w-full">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                            {...register("password", validationRules.password)}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                            {...register("confirmPassword", validationRules.confirmPassword)}
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 font-medium">Avatar Image</label>
                    <input
                        type="text"
                        placeholder="Enter Image URL"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
                        {...register("userPicPath", {
                            required: "Image URL is required",
                        })}
                    />
                    {errors.userPicPath && <span className="text-red-500 text-sm">{errors.userPicPath.message}</span>}
                </div>
                
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                    Signup
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <p className="text-center text-gray-500 mt-6">
                Already have an account?{' '}
                <span onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline cursor-pointer">
                    Login
                </span>
            </p>
        </div>
    );
};

export default SignUp;

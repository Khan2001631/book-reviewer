import  { useState } from 'react';
import Login from '../../components/common/authorization/login';
import SignUp from '../../components/common/authorization/signup';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md border border-gray-200">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 py-2 rounded-t-lg font-semibold transition-all duration-300 ${
                            isLogin ? 'bg-blue-700 text-white shadow-md' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 py-2 rounded-t-lg font-semibold transition-all duration-300 ${
                            !isLogin ? 'bg-blue-700 text-white shadow-md' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        Signup
                    </button>
                </div>
                {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin = {setIsLogin}/>}
            </div>
        </div>
    );
};

export default AuthPage;

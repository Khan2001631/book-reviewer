// import React from 'react'
import './App.css'
import {  Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/header';
import Footer from './components/common/footer';
import { Suspense, useEffect } from 'react';
import Home from './pages/public/home';
import AuthPage from './pages/public/auth';
import NonAuthGuard from './guards/non-auth-guard';
import { useDispatch } from 'react-redux';
import { updateLogin, updateLogout } from './api-integeration/commonSlice';
import AuthGuard from './guards/auth-guard';
import React from 'react';

const Secure = React.lazy(() => import('./pages/secure/secure'));

function App() {
  const dispatch = useDispatch();
  // const {} = useSelector((state: any) => state.commonSlice);
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') as string || 'false');

  useEffect(() => {
    isLoggedIn ? dispatch(updateLogin()) : dispatch(updateLogout());
  },[dispatch, isLoggedIn]);

  return (
      <div className="min-h-screen bg-gray-900 text-white"> {/* Apply background color here */}
        <Header />
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<NonAuthGuard><AuthPage /></NonAuthGuard>} />
            <Route path="/app/*" element={<AuthGuard><Secure /></AuthGuard>} ></Route>
            <Route path="*" element={<Navigate to="/" replace />} ></Route>
          </Routes>
        </Suspense>
        <Footer />
      </div>
  );
}

export default App;

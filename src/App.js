import React from 'react';
import { AuthProvider } from './store/AuthContext';
import Header from './partials/header';
import Footer from './partials/footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ScrollToTop from './pages/routes/scrollTop';
import Main from "./pages/main";
import MyPageMain from "./pages/myPage/myPageMain";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop />
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/signup" element={<SignUp />} />
                        <Route path="/mypage" element={<MyPageMain />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

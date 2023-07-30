import React from 'react';
import {AuthProvider} from './store/AuthContext';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './pages/util/scrollTop';
import Routing from "./routes/Routing";
import Header from "./components/Layout/header";
import Footer from "./components/Layout/footer";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop/>
                <Header />
                <Routing/>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

import React from 'react';
import {AuthProvider} from './store/AuthContext';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './pages/util/scrollTop';
import Routing from "./routes/Routing";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import './css/App.css'

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop/>
                <div className='App'>
                <Header/>
                <Routing/>
                <Footer/>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

import React from 'react';
import ScrollToTop from './pages/util/scrollTop';
import Routing from './routes/Routing';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Fragment } from 'react';
import './css/App.css';

const App = () => {
  return (
    <Fragment>
      <ScrollToTop />
      <div className='App'>
        <Header />
        <Routing />
        <Footer />
      </div>
    </Fragment>
  );
};

export default App;

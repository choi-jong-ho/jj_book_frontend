// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import React from 'react';
import Main from "./pages/main";
import Header from "./partials/header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {
  // const [hello, setHello] = useState('')
  //
  // useEffect(() => {
  //   axios.get('/api/hello')
  //       .then(response => setHello(response.data))
  //       .catch(error => console.log(error))
  // }, []);

  return (
      // <div>
      //   백엔드에서 가져온 데이터입니다 : {hello}
      // </div>
      <BrowserRouter>
          <div className='App'>
              <Header />
              <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/Login' element={<Login />} />
                  <Route path='/SignUp' element={<SignUp />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
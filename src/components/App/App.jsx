import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import s from '../App/App.module.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className={s.App}>
      <Searchbar />
      <ToastContainer />
    </div>
  );
};

export default App;

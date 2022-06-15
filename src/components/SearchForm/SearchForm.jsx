import React from 'react';
import { useState } from 'react';
import s from '../SearchForm/SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const [image, setImage] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    onSubmit(image);
    setImage('');
  };

  const fromCahnge = e => {
    const nameValue = e.currentTarget.value.toLowerCase().trim();
    setImage(nameValue);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={formSubmit}>
        <button type="submit" className={s.SearchFormbutton}>
          <span className={s.SearchFormbuttonlabel}>Search</span>
        </button>

        <input
          onChange={fromCahnge}
          className={s.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchForm;

import s from './Searchbar.module.css';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState('');
  const handleWordChange = event => {
    setSearchWord(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (searchWord.trim() === '') {
      alert('Wrong word');
      return;
    }

    onSubmit(searchWord);
    setSearchWord('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.formButton}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          name="searchWord"
          value={searchWord}
          onChange={handleWordChange}
        />
      </form>
    </header>
  );
}

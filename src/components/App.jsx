import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { picturesApi } from '../services/picturesApi';
import Error from './Error/Error';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import s from './App.module.css';

export default function App() {
  const [searchWord, setSearchWord] = useState('');
  const [picFetch, setPicFetch] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchWord) {
      return;
    }
    fetchPic();
  }, [searchWord, page]);

  const fetchPic = () => {
    setIsLoading(true);
    picturesApi(searchWord, page)
      .then(pictures => setPicFetch([...picFetch, ...pictures]))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };
  const handleOnSubmmit = searchWord => {
    setSearchWord(searchWord);
    setPage(1);
    setPicFetch([]);
  };
  const handlerLoadMore = () => {
    setPage(page + 1);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const modalOpen = url => {
    setLargeImageURL(url);
    toggleModal();
  };

  return (
    <>
      <Searchbar onSubmit={handleOnSubmmit} />
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <ImageGallery picFetch={picFetch} modalOpen={modalOpen} />
          {showModal && (
            <Modal onClose={toggleModal}>
              <img
                src={largeImageURL}
                className={s.modalImg}
                onClick={toggleModal}
                alt=""
              />
            </Modal>
          )}
          {isLoading ? (
            <Loader />
          ) : (
            picFetch.length > 0 &&
            searchWord &&
            picFetch.length % 12 === 0 && (
              <Button handleLoadMore={handlerLoadMore} />
            )
          )}
        </>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import fetchDataImage from 'servises/fetchRequaest';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [errorMesege, setErrorMesege] = useState(false);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchImages = () => {
    setLoader(true);

    fetchDataImage(query, page)
      .then(images => {
        if (images.totalHits === 0) {
          setLoader(false);
          setPage(1);
          return toast('Немає такого зображення');
        }
        setImages(state => [...state, ...images.hits]);
        setPage(state => state + 1);
        setLoader(false);
        setTotal(images.total);
        setErrorMesege(false);
      })
      .catch(() => {
        setErrorMesege(true);
        setLoader(false);
      });
  };

  const fromData = data => {
    if (data.length === 0) {
      toast('Введіть назву картинки');
      return;
    }
    setImages([]);
    setQuery(data);
    setLoader(true);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <>
      <SearchForm onSubmit={fromData} />

      <ImageGallery images={images} modalOpen={openModal} />
      {loader && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt="" />
        </Modal>
      )}
      {images.length > 0 && images.length < total && !errorMesege && (
        <Button onClick={fetchImages} text="Load more" />
      )}
    </>
  );
};

export default Searchbar;

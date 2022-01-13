import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import { Switch } from '@material-ui/core';
import Photos from './Pages/Photos';
import Photo from './Pages/Photo';

const PAGE_SIZE = 9;
const QUERY_DEBOUNCE_DELAY_MS = 100;

const App = () => {
  const [selectedPhoto, setSelectedPhoto] = useState();

  const handleSelectedPhoto = (photo: any) => {
    setSelectedPhoto(photo);
  };
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Photo details={selectedPhoto} />} />
          <Route path="/" element={<Photos onPhotoSelected={handleSelectedPhoto} />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;

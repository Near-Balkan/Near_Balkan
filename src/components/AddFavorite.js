import { useContext, useEffect, useState } from 'react';

import { database } from '../firebase/config';
import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import UserContext from '../App';

import { TbHeartPlus, TbHeartMinus } from 'react-icons/tb';
import { useFetchData } from '../hooks/useFetchData';
import { useTranslation } from 'react-i18next';

const AddFavorite = ({ movie,  user}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const userObject = useContext(UserContext);

  const addFavorite = async () => {
    try {
      userObject.favorites.push(movie.id)
      await setDoc(
        doc(database, 'users', user.uid),
        userObject,
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFavorite = async () => {
    try {
      userObject.favorites.pop(movie.id)
      await setDoc(
        doc(database, 'users', user.uid),
        userObject,
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    console.log(userObject);
    if (userObject) {
      if (userObject?.favourites.includes(movie.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [movie, userObject]);

  return (
    <>
      {isFavorite ? (
        <TbHeartMinus
          size={30}
          className='text-nbgreylight'
          onClick={removeFavorite}
        />
      ) : (
        <TbHeartPlus
          size={30}
          className='text-nbgreylight'
          onClick={addFavorite}
        />
      )}
    </>
  );
};

export default AddFavorite;

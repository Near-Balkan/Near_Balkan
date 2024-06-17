import React, { useEffect, useState, useMemo, useContext } from 'react';

import {UserContext} from '../App';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc, getDoc,
  where,
  documentId,
  updateDoc
} from 'firebase/firestore'
import { database } from '../firebase/config';

// Components
import { useTranslation } from 'react-i18next';
import { Card, CardComplex } from '../components/Card';
import { SectionTitle } from '../components/SectionTitle';
import { useFetchData } from '../hooks/useFetchData';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useFilterMovies } from '../hooks/useFilterMovies';
import { AdBloc } from '../components/AdBloc';
// import SearchBar, { search, searchBar, moviesFilter, setMoviesFilter } from '../components/SearchBar';

const fetchUsersForFilms = async (films) => {
  const filmsWithUser = await Promise.all(
    films.map(async (film) => {
      const userRef = doc(database, 'users', film.user); // Reference to the user document
      const userDoc = await getDoc(userRef); // Fetch the user document

      if (userDoc.exists()) {
        return { ...film, user: { id: userDoc.id, ...userDoc.data() } };
      } else {
        console.log(`User with ID ${film.user} does not exist.`);
        return film;
      }
    })
  );

  return filmsWithUser;
};



const Home = ({ search }) => {
  const { documents: competitions } = useFetchData('competitions'); //documents nelkul is szar

  const { t, i18n } = useTranslation();
  const [adUrl, setAdUrl] = useState('')
  const {user} = useContext(UserContext)

  const [randomMovie, setRandomMovie] = useState(0);

  const currentDate = useMemo(() => new Date(), []);
  const formattedDate = currentDate.toLocaleDateString();
  const [currentCompetition, setCurrentCompetition] = useState(null); // Use null instead of 0 for a more meaningful initial state
  const [currentCompetitionFilms, setCurrentCompetitionFilms] = useState(null);
  const { filteredMovies: moviesFilter } = useFilterMovies(currentCompetitionFilms, search)

  useEffect(() => {
    if (competitions && competitions.length > 0) {
      const findCurrentCompetition = () => {
        const currentCompetition = competitions.find(competition => {
          const startDate = competition.startDate.toDate();
          const endDate = competition.endDate.toDate();
          return startDate <= currentDate && endDate >= currentDate;
        }
        );
        setCurrentCompetition(currentCompetition);
      };
      findCurrentCompetition();
    }
  }, [competitions, currentDate]);

  useEffect(() => {
    if (currentCompetition) {
      const q = query(
        collection(database, 'films'),
        where(documentId(), 'in', currentCompetition.films)
      );
      //filmek adatainak lekerese
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const films = [];
        querySnapshot.forEach((doc) => {
          films.push({ id: doc.id, ...doc.data() });
        });

        //összeegyűlt pénz
        /*
        const collected=0;
        films.forEach((film) => {
          collected += film.collected;
        });
        currentCompetition.collected=collected;      
        const docRef = doc(database, "competitions", currentCompetition.id);
        updateDoc(docRef, currentCompetition);
        */
       
        //filmek feltöltőinek adatainak lekerese
        const filmsWithUser = await fetchUsersForFilms(films);
        // Update state with the fetched films and user data
        setCurrentCompetitionFilms(filmsWithUser);
      });

      return () => unsubscribe();
    }
  }, [currentCompetition]);



  useEffect(() => {
    if (currentCompetitionFilms && currentCompetitionFilms.length > 0) {
      const generateRandomMovie = () => {
        const randomMovie = currentCompetitionFilms[Math.floor(Math.random() * currentCompetitionFilms.length)];
        setRandomMovie(randomMovie);
      };

      const adUrls = [
        'https://www.youtube.com/embed/bWfI239Qf68?si=1i8C14OaddOsgcBq&amp;controls=0',
        'https://www.youtube.com/embed/bSwYTU1f-oI?si=ulg8OWQ1G3e7XMWE&amp;controls=0'
      ];
      const url = adUrls[Math.floor(Math.random() * adUrls.length)];
      setAdUrl(url);

      generateRandomMovie();
    }
  }, [currentCompetitionFilms]);

  return (
    <div className="min-h-fit">
      <div className="section max-w-screen-lg mx-auto flex flex-col gap-4">
        <div>
          {/*parasztos nmegoldás*/}
          {currentCompetition && !search && (
            <SectionTitle
              title={t("home.fresh")}
            />
          )}
        </div>
        {randomMovie && !search &&
          <div className="pb-8">
            <CardComplex
              movie={randomMovie}
              targetDate={currentCompetition.endDate.toDate()}
              currentCompetition={currentCompetition}
            />
          </div>}
      </div>
      {!user && (
        <AdBloc adUrl={adUrl} />
      )}
      <div className="section flex flex-col items-center gap-4">
        {currentCompetition && (
          <div className="flex justify-start w-full max-w-screen-lg">
            <SectionTitle
              title={i18n.language === 'hu' ? currentCompetition.title : currentCompetition.engTitle}
            />
          </div>
        )}
        {!search &&
          currentCompetitionFilms?.map((movie) => (
            <Card
              movie={movie} targetDate={currentCompetition.endDate.toDate()} haveWon={false} currentCompetition={currentCompetition}
            />
          ))}
      </div>
      {search &&
          moviesFilter.length > 0 &&
          moviesFilter?.map((movie) => (
            <Card
              movie={movie} targetDate={currentCompetition.endDate.toDate()} haveWon={true} currentCompetition={currentCompetition}
            />
          ))}
        {search && moviesFilter.length === 0 && (
          <div className='flex justify-center items-center gap-8 py-8 w-full max-w-screen-lg'>
            <p>{t("home.no_results")}</p>
          </div>
        )}
    </div>
  );
};

export default Home;
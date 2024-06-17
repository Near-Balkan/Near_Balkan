// Routes
import { Routes, Route, Navigate } from 'react-router-dom';

// Hooks
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';

// Components
import Header from './components/Header';
import Layout from './components/Layout';
import WhiteLayout from './components/WhiteLayout';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/Details';
import Events from './pages/Events';
import Profile from './pages/Profile';
import NewReview from './pages/NewReview';
import Loading from './components/Loading';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import About from './pages/About';
import NewEvent from './pages/newEvent'
import PastCompetitions from './pages/PastCompetitions';
import NotFound from './pages/NotFound';

// A usert mostantól ezen a contexten kersztül bármelyik komponensből el lehet érni nincs szükség folyamatosan továbbpasszolgatni
export const UserContext = createContext(null)

function App() {
  //auth object of user

  const [search, setSearch] = useState('')

  const { user, dbUser:userObject } = useAuth();

  // target date
  const RELATIVE_TIME_FROM_NOW = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const EXACT_DATE_IN_FUTURE = new Date("June 30, 2024 23:59:59").getTime();
  const targetDate = EXACT_DATE_IN_FUTURE;

  



  if (user === undefined) {
    return (
      <div className='flex items-center justify-center sectionHeight'>
        <Loading size={'60px'} />
      </div>
    );
  }
  return (
    <div className='App'>
      
      <UserContext.Provider value={{userObject, user}}>
      <Header search={search} setSearch={setSearch} betaVersion={`beta v0.01`} />
      <Routes>
        <Route path="/" element={<WhiteLayout />}>
          <Route
            path='/profile'
            element={!user ? <Navigate to='/login' /> : <Profile />}
          />
          <Route
            path='/upload-demo'
            element={user && userObject && userObject.userType === 'creator' ? (<NewReview />) : (<Navigate to='/login' />)}
          />
          <Route
            path='/upload-event'
            element={user && userObject && userObject.userType === 'creator' ? (<NewEvent/>) : (<Navigate to='/login' />)}
          />
          <Route
            path='/register/*'
            element={
              user && userObject ? <Navigate to='/' /> : <Register />
            }
          />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/*' element={<NotFound />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/search" element={!user ? <Navigate to='/login' /> : <Search targetDate={targetDate} />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home search={search} targetDate={targetDate} />} />
          <Route path="/past-competitions" element={<PastCompetitions search={search} targetDate={targetDate}/>} />
          <Route
            path='/favourites'
            element={!user ? <Navigate to='/login' /> : <Favorites targetDate={targetDate} />}
          />
          <Route path='/details/:id' element={<Details targetDate={targetDate}/>} />
          <Route
            path='/events'
            element={<Events/>}
          />
          <Route
            path='/past-events'
            element={!user ? <Navigate to='/login' /> : <Events />}
          />
        </Route>
      </Routes>
      <Footer betaVersion={`beta v1.0.1`} />         
      </UserContext.Provider>
    </div >
  );
}

export default App;

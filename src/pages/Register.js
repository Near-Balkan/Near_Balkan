
// Router
import { Link } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
//Componenets
import { RegistrationAuth } from '../components/RegistrationAuth';
import { RegistrationInfo } from '../components/RegistrationInfo';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { UserContext } from '../App'



const Register = () => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<RegistrationAuth></RegistrationAuth>} />
      <Route path='/info' element={!user ? <Navigate to="/login"></Navigate> : <RegistrationInfo ></RegistrationInfo>} />
    </Routes>


  );
};

export default Register;

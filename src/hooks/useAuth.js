// Firebase Config
import { app, database } from '../firebase/config';
import { setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react'

// Firebase functions
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

// React Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadImage } from './useUploadImage';

export const useAuth = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();


  // Get auth from firebase
  const auth = getAuth(app);
  const { uploadImage } = useUploadImage(auth.currentUser)
  auth.languageCode = 'eng';

  // Set redirect URL to localhost  //whats this bullshit?
  const actionCodeSettings = {
    url: 'https://moviereviews-yago.vercel.app/',
  };

  const googleSignIn = async () => {
    await signInWithPopup(getAuth(), provider);
    await checkFirstSignIn();
  }

  const registerUser = async (user) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );
      await checkFirstSignIn();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

  }

  const checkFirstSignIn = async () => {
    if (!dbUser) {
      navigate("/register/info");
    } else console.log(doc);
    console.log(doc);
  }

  // Function to register and login new users
  const registerUserInfo = async (userInfo) => {
    setLoading(true);

    try {
      const userId = auth.currentUser.uid;
      let imageurl = ''
      console.log(userInfo);
      if (userInfo.profilePicture) {
        console.log(userInfo.profilePicture);
        imageurl = await uploadImage('profilepictures', userInfo.profilePicture, Date.now(), auth.currentUser.email);
        delete userInfo.profilePicture;
      } else if (auth.currentUser.photoURL) {
        imageurl = auth.currentUser.photoURL;
      }

      //create doc in our database with the same id as the auth object
      await setDoc(doc(database, 'users', userId), { ...userInfo, email: auth.currentUser?.email, profilePicture: imageurl ?? "" })

      setLoading(false);
      navigate("/")
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setLoading(false);
    }
  };

  // Function to login users
  const signInUser = async (email, password) => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      //checkFirstSignIn();
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  // Function to logout users
  const signOutUser = () => {
    signOut(auth);
  };

  // Function to send reset password email for users
  const resetPassword = async (email) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage(
        'E-mail de recuperação enviado com sucesso, por favor verifique sua caixa de entrada ou spam.',
      );
      setLoading(false);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setLoading(false);
    }
  };
  //function the retrieve the current users data from our database based on the auth object
  //can be used later when we want to display things based on the users type


  useEffect(() => {
    const getUser = async () => {
      const uid = auth?.currentUser?.uid;
      if (!uid) return false;
      const docRef = doc(database, "users", uid);
      onSnapshot(docRef, snapshot=> {
        setDbUser(snapshot.data())
      })
    }

    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      await getUser();
    });
  }, [auth]);

  return {
    auth,
    registerUser,
    registerUserInfo,
    googleSignIn,
    signInUser,
    signOutUser,
    resetPassword,
    message,
    error,
    loading,
    onAuthStateChanged,
    user,
    dbUser,
  };
};

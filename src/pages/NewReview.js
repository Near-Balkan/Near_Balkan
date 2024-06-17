import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Loading';
import { useAddReview } from '../hooks/useAddReview';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { CustomSelect } from '../components/CustomSelect';
import {UserContext} from '../App';

const genreOptions = [
  { label: 'Action', value: 'action' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Animation', value: 'animation' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Documentary', value: 'documentary' },
  { label: 'Drama', value: 'drama' },
  { label: 'Family-friendly', value: 'family-friendly' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Historical', value: 'historical' },
  { label: 'Horror', value: 'horror' },
  { label: 'Musical', value: 'musical' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'Romance', value: 'romance' },
  { label: 'Science fiction', value: 'science fiction' },
  { label: 'Sports', value: 'sports' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'Western', value: 'western' }
];

const genreOptionsHU = [
  { label: 'Akció', value: 'action' },
  { label: 'Kaland', value: 'adventure' },
  { label: 'Animáció', value: 'animation' },
  { label: 'Vígjáték', value: 'comedy' },
  { label: 'Dokumentumfilm', value: 'documentary' },
  { label: 'Dráma', value: 'drama' },
  { label: 'Családbarát', value: 'family-friendly' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Történelmi', value: 'historical' },
  { label: 'Horror', value: 'horror' },
  { label: 'Musical', value: 'musical' },
  { label: 'Misztikus', value: 'mystery' },
  { label: 'Románc', value: 'romance' },
  { label: 'Tudományos-fantasztikus', value: 'science fiction' },
  { label: 'Sport', value: 'sports' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'Western', value: 'western' }
];

const NewReview = () => {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState('');             //kep
  const [title, setTitle] = useState('');             //cim
  const [rating, setRating] = useState('');           //ertekeles - felesleges valszeg - helyette a szavazasokat kellene hasznalni(?)
  const [genre, setGenre] = useState('');             //mufaj
  const [description, setDescription] = useState(''); //leiras
  const [video, setVideo] = useState('');             //video link
  /*2024.04.12*/
  const [views, setViews] = useState(0);              //megtekintesek szama
  const [moneygoal, setMoneygoal] = useState(0);      //ez nem biztos hogy igy kell matyival egyeztetni
  const [collected, setCollected] = useState(0);      // Az eddig gyujtott penz
  /*2024.04.19*/
  const [script, setScript] = useState('');           //script

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const {user} = useContext(UserContext);


  const schema = yup.object().shape({
    title: yup.string().required("Please provide the title"),
    englishTitle: yup.string(),
    moneygoal: yup.number().min(1, "Number is too small").max(1000000, "Number is too high").required("Please fill this field").typeError("Please provide a number"),
    description: yup.string().min(20, "Description too short").max(1500, "Description too long").required("Please provide a description"),
    englishDescription: yup.string(),
    image: yup.mixed().required("please provide a poster for your film"),
    video: yup.mixed().required("Please provide a demo for your film"),
    script: yup.mixed().required("Please provide a script for your film")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const {
    addReview,
    error: firebaseError,
    success: firebaseSuccess,
    setError: firebaseSetError,
    setSuccess: firebaseSetSuccess,
    loading,
  } = useAddReview(user);

  const handleUpload = (formData) => {
    //e.preventDefault();
    firebaseSetError(null);
    firebaseSetSuccess(null);

    console.log('Calling addReview function');
    const data = {
      user: user.uid,
      ...formData,
      genre,
      views, //Ennek itt mi a szerepe
      collected, // meg ennek?
    };

    addReview(data);
  };

  useEffect(() => {
    if (firebaseError) {
      setError(firebaseError);
    }
    if (firebaseSuccess) {
      setSuccess(firebaseSuccess);
      setImage(null);
      setVideo(null);
      setScript(null);
      setTitle('');
      setRating(0);
      setGenre('');
      setDescription('');

      setMoneygoal(0);
      setCollected(0);
      setViews(0);
    }
  }, [firebaseError, firebaseSuccess]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), 3000);
    }

    if (success) {
      setTimeout(() => setSuccess(''), 3000);
    }
  }, [error, success, loading]);

  return (
    <section className='flex flex-col items-center justify-center sectionHeight md:w-[50%] w-full'>
      <h1 className='my-8 sm:text-xl md:text-2xl font-bold text-zinc-800 w-[90%] text-center '>
        {t("new_reviews.upload_films")}
      </h1>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt='preview'
          className='max-w-[600px] w-[90%] object-cover mb-8 shadow-md rounded-md'
        />
      )}

      <form
        onSubmit={handleSubmit(handleUpload)}
        className='flex flex-col max-w-[600px] w-[90%] mx-auto gap-3 mb-16'
      >     
        <label htmlFor='poster'>{t("new_reviews.poster")}</label>

        <div className="mt-2 flex justify-center mx-4 rounded-lg border border-dashed border-nbgreenmain px-6 py-10">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-nbgreenmain" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
              <label htmlFor="poster" className="relative cursor-pointer p-2 rounded-md bg-nbgreenlight font-semibold text-nbgreydark focus-within:outline-none focus-within:ring-2 focus-within:ring-nbgreydark focus-within:ring-offset-2 hover:text-white">
                <span>Upload a file</span>
                <input
                  type='file'
                  name='poster'
                  id='poster'
                  accept='image/*'
                  className='sr-only'
                  {...register("image")}
                  onChange={(e) => setImage(e.target.files[0])}
                  disabled={loading}
                />
                {errors?.image && (<p className="text-xs font-h3-subtitle text-nbredmain pt-2">{errors.image?.message}</p>)}
              </label>
            </div>
            <p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{image?.name}</p>
          </div>
        </div>
        {/* <input
          type='file'
          name='poster'
          id='poster'
          accept='image/*'
          className='sr-only'
          {...register("image")}
          onChange={(e) => setImage(e.target.files[0])}
          disabled={loading}
        /> */}

        
        <label htmlFor='film'>{t("new_reviews.film")}</label>
        <div className="mt-2 flex justify-center mx-4 rounded-lg border border-dashed border-nbgreenmain px-6 py-10">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-nbgreenmain" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
              <label htmlFor="video" className="relative cursor-pointer p-2 rounded-md bg-nbgreenlight font-semibold text-nbgreydark focus-within:outline-none focus-within:ring-2 focus-within:ring-nbgreydark focus-within:ring-offset-2 hover:text-white">
                <span>Upload a file</span>
                <input
                  type='file'
                  name='video'
                  id='video'
                  accept='video/mp4'
                  className='sr-only'
                  {...register("video")}
                  onChange={(e) => setVideo(e.target.files[0])}
                  disabled={loading}
                />
                {errors?.video && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.video?.message}</p>)}
              </label>
            </div>
            <p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{video?.name}</p>
          </div>
        </div>
        {/* <input
          type='file'
          name='film'
          accept='video/mp4'
          className='block w-full p-3 m-0 text-base font-normal text-gray-700 transition ease-in-out border-none rounded shadow-md bg-slate-50 form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          {...register("video")}
          disabled={loading}
        /> */}

        
        <label htmlFor='film'>{t("new_reviews.script")}</label>
        <div className="mt-2 flex justify-center mx-4 rounded-lg border border-dashed border-nbgreenmain px-6 py-10">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-nbgreenmain" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
              <label htmlFor="script" className="relative cursor-pointer p-2 rounded-md bg-nbgreenlight font-semibold text-nbgreydark focus-within:outline-none focus-within:ring-2 focus-within:ring-nbgreydark focus-within:ring-offset-2 hover:text-white">
                <span>Upload a file</span>
                <input
                  type='file'
                  name='script'
                  id='script'
                  accept='.pdf'
                  className='sr-only'
                  {...register("script")}
                  onChange={(e) => setScript(e.target.files[0])}
                  disabled={loading}
                />
                {errors?.script && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.script?.message}</p>)}
              </label>
            </div>
            <p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{script?.name}</p>
          </div>
        </div>
        {/* <input
          type='file'
          name='script'
          accept='.pdf'
          className='block w-full p-3 m-0 text-base font-normal text-gray-700 transition ease-in-out border-none rounded shadow-md bg-slate-50 form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          {...register("script")}
          disabled={loading}
        /> */}

        
        {/* <input
          type='text'
          placeholder={t("new_reviews.original_title")}
          className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
          {...register('title')}
        /> */}
        <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">{t("new_reviews.original_title")}</p>
        <div className="mt-2 space-y-6">

          <div className="flex justify-start mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
              <input
                type='text'
                placeholder={t("new_reviews.original_title")}
                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                {...register('title')}
              />
              {errors?.title && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.title?.message}</p>)}
            </div>
          </div>

        </div>

        
        <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">{t("new_reviews.title")}</p>
        <div className="mt-2 space-y-6">

          <div className="flex justify-start mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
              <input
                type='text'
                placeholder={t("new_reviews.title")}
                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                {...register('englishTitle')}
              />
              {errors?.englishTitle && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.englishTitle?.message}</p>)}
            </div>
          </div>

        </div>
        {/*  <input
          type='text'
          placeholder={t("new_reviews.title")}
          className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
          {...register('englishTitle')}
        /> */}

       
        <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">{t("new_reviews.needed_money")}</p>
        <div className="mt-2 space-y-6">
          <div className="flex justify-start mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
              <input
                type='number'
                placeholder={t("new_reviews.needed_money")}
                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                {...register('moneygoal')}
              />
               {errors?.moneygoal && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.moneygoal?.message}</p>)}
            </div>
          </div>
        </div>
        {/* <input
          type='number'
          placeholder={t("new_reviews.needed_money")}
          className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
          {...register('moneygoal')}
        /> */}

        
        {/* <select
          className={`p-4  rounded-md shadow-md outline-none bg-slate-50 ${genre === '' && 'text-gray-400'
            }`}
          {...register('genre')}
        >
          <option value='' className='disabled:text-gray-500' disabled>
            {t("new_reviews.genre")}
          </option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select> */}
        <CustomSelect isMulti={false} options={i18n.language=='hu' ? genreOptionsHU: genreOptions} onSelect={setGenre}></CustomSelect>
        {errors?.genre && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.genre?.message}</p>)}

        {errors?.description && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.description?.message}</p>)}
        <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">{t("new_reviews.original_desc")}</p>
        <div className="mt-2 space-y-6">
          <div className="flex justify-start mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
              <textarea
                type='text'
                placeholder={t("new_reviews.original_desc")}
                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 resize-y'
                {...register('description')}
              />
              {errors?.englishDescription && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.englishDescription?.message}</p>)}
            </div>
          </div>
        </div>
        {/* <textarea
          type='text'
          placeholder={t("new_reviews.original_desc")}
          className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
          {...register('description')}
        /> */}
        
        <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">{t("new_reviews.desc")}</p>
        <div className="mt-2 space-y-6">
          <div className="flex justify-start mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
              <textarea
                type='text'
                placeholder={t("new_reviews.desc")}
                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 resize-y'
                {...register('englishDescription')}
              />
              {errors?.englishDescription && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.englishDescription?.message}</p>)}
            </div>
          </div>
        </div>
        {/* <textarea
          type='text'
          placeholder={t("new_reviews.desc")}
          className='p-4 rounded-md shadow-md outline-none resize-none bg-slate-50 h-[200px]'
          {...register('englishDescription')}
        /> */}

        {loading ? (
          <div className='flex items-center justify-center w-full'>
            <Loading size={'30px'} />
          </div>
        ) : (
          <input
            type='submit'
            value={t("new_reviews.upload_films")}
            className='w-full p-4 font-bold text-white transition-all duration-300 rounded-md shadow-sm cursor-pointer bg-zinc-800 hover:bg-zinc-700 hover:tracking-wider'
          />
        )}
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
      </form>
    </section>
  );
};

export default NewReview;

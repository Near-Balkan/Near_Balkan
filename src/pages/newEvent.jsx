import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Loading';
import { useAddEvent } from '../hooks/useAddEvent';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { CustomSelect } from '../components/CustomSelect';
import {UserContext} from '../App';

const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' }
];



const NewEvent = () => {
    const { t, i18n } = useTranslation();
    const [images, setImages] = useState([]);             //kep
    const [month, setMonth] = useState('');             //cim
    const [video, setVideo] = useState('');
    const [newWorkShop, setNewWorkShop] = useState('');
    const [workShops, setWorkShops] = useState([]);
    /*2024.04.12*/

    const {user} = useContext(UserContext);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const schema = yup.object().shape({
        title: yup.string().required("Please provide the title"),
        subtitle: yup.string().required("Please provide the subtitle of the event"),
        year: yup.number("please provide a number").required("Please provide a year"),
        description: yup.string().min(20, "Description too short").max(1500, "Description too long").required("Please provide a description"),
        images: yup.mixed().required("please provide images")
        //video: yup.mixed().required("please provide a video"),
    });

    /* const schema = yup.object().shape({
        title: yup.string(),
        subtitle: yup.string(),
        year: yup.number("please provide a number"),
        description: yup.string().min(20, "Description too short").max(1500, "Description too long"),
        images: yup.mixed(),
        video: yup.mixed(),
    }); */

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { uploadEvent } = useAddEvent(user);

    const handleUpload = async (formData) => {
        try {
            const event = {
                ...formData,
                month,
                workshops: workShops
            }
            console.log(event.images);
            await uploadEvent(event);
            //navigate("/events");
        } catch (e) {
            setError("Valami hiba történt")
            console.log(e.message);
        }

    };

    return (
        <section className='flex flex-col items-center justify-center sectionHeight md:w-[50%] w-full'>
            <h1 className='my-8 sm:text-xl md:text-2xl font-bold text-zinc-800 w-[90%] text-center '>
                Upload New Event
            </h1>

            <form
                onSubmit={handleSubmit(handleUpload)}
                className='flex flex-col max-w-[600px] w-[90%] mx-auto gap-3 mb-16'
            >
                <label className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left" htmlFor='poster'>Images</label>

                <div className="mt-2 flex justify-center mx-4 rounded-lg border border-dashed border-nbgreenmain px-6 py-10">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-nbgreenmain" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                        </svg>
                        <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
                            <label htmlFor="poster" className="relative cursor-pointer p-2 rounded-md bg-nbgreenlight font-semibold text-nbgreydark focus-within:outline-none focus-within:ring-2 focus-within:ring-nbgreydark focus-within:ring-offset-2 hover:text-white">
                                <span>Upload a file</span>
                                <input
                                    multiple
                                    type='file'
                                    name='poster'
                                    id='poster'
                                    accept='image/*'
                                    className='sr-only'
                                    {...register("images")}
                                //onChange={(e) => setImages(e.target.files)}

                                />
                                {errors?.images && (<p className="text-xs font-h3-subtitle text-nbredmain pt-2">{errors.images?.message}</p>)}
                            </label>
                        </div>
                        {/* {images && images.map((image)=> (
                            <p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{image.name}</p>
                        ))} */}
                    </div>
                </div>


                {/*                 <label className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left" htmlFor='film'>Video</label>
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
                                />
                                {errors?.video && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.video?.message}</p>)}
                            </label>
                        </div>
                        <p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{video?.name}</p>
                    </div>
                </div>
 */}
                <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Event title</p>
                <div className="mt-2 space-y-6">

                    <div className="flex justify-start mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
                            <input
                                type='text'
                                placeholder="Event title"
                                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                {...register('title')}
                            />
                            {errors?.title && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.title?.message}</p>)}
                        </div>
                    </div>

                </div>


                <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Event Subtitle</p>
                <div className="mt-2 space-y-6">

                    <div className="flex justify-start mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
                            <input
                                type='text'
                                placeholder="Event subtitle"
                                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                {...register('subtitle')}
                            />
                            {errors?.subtitle && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.subtitle?.message}</p>)}
                        </div>
                    </div>

                </div>


                <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Year</p>
                <div className="mt-2 space-y-6">
                    <div className="flex justify-start mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
                            <input
                                type='number'
                                placeholder="Year"
                                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                {...register('year')}
                            />
                            {errors?.year && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.year?.message}</p>)}
                        </div>
                    </div>
                </div>

                <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Month</p>
                <CustomSelect isMulti={false} onSelect={setMonth} options={months}></CustomSelect>

                <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Description</p>
                <div className="mt-2 space-y-6">
                    <div className="flex justify-start mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
                            <textarea
                                type='text'
                                placeholder="Event description"
                                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 resize-y'
                                {...register('description')}
                            />
                            {errors?.description && (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{errors.description?.message}</p>)}
                        </div>
                    </div>
                </div>

                <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Workshop</p>
                <div className="mt-2 space-y-6">

                    <div className="flex justify-start mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-nbgreenmain w-full">
                            <input
                                type='text'
                                placeholder="Workshop"
                                className='block flex-1 border-0 font-a-anchor font-medium bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                onChange={(e) => setNewWorkShop(e.target.value)}
                            />
                        </div>
                        <button
                            class="flex w-20 justify-center rounded-full bg-nbblack px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-nbbluedark focus:ring-1 focus:ring-nbbluedark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => {
                                e.preventDefault();
                                setWorkShops([...workShops, newWorkShop])
                            }}>Save</button>
                    </div>
                    {workShops && workShops.length > 0 && (
                        <div>
                            <p className="mt-1 text-sm leading-6 text-nbgreymiddark font-a-anchor font-semibold text-base text-left">Workshops:</p>
                            {workShops?.map((workshop) => {
                                return (<p className="text-sm leading-5 mt-2 font-a-anchor font-medium text-nbgreymiddark">{workshop}</p>)
                            })}
                        </div>)}
                </div>

                <input
                    type='submit'
                    value='Upload event'
                    className='w-full p-4 font-bold text-white transition-all duration-300 rounded-md shadow-sm cursor-pointer bg-zinc-800 hover:bg-zinc-700 hover:tracking-wider'
                />

                <p>{error}</p>
            </form>
        </section>
    );
};

export default NewEvent;

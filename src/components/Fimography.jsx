import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { useContext, useRef, useState } from 'react'
import { useUploadImage } from '../hooks/useUploadImage'
import { CustomSelect } from './CustomSelect'
import { UserContext } from '../App'


export function Filmography({ sendData }) {

    const { uploadImage } = useUploadImage()
    const {user} = useContext(UserContext);
    
    const titleOptions = [
        { value: 'screenwriter', label: 'Screenwriter' },
        { value: 'director', label: 'Director' },
        { value: 'assistant director', label: 'Assistant director' },
        { value: 'camera assistant', label: 'Camera assistant' },
        { value: 'cameraman', label: 'Cameraman' },
        { value: 'music composer', label: 'Music composer' },
        { value: 'gaffer', label: 'Gaffer' },
        { value: 'production assistant', label: 'Production assistant' },
        { value: 'sound mixer', label: 'Sound mixer' },
        { value: 'boom operator', label: 'Boom operator' },
        { value: 'editor', label: 'Editor' },
        { value: 'director of photography', label: 'Director of photography' },
        { value: 'actor', label: 'Actor' },
        { value: 'set designer', label: 'Set designer' },]

    async function sendFilmData() {
        if (validateData()) {
            const url = await uploadImage('filmography', image, title, user.user.email);
            const data = {
                title: title,
                date: date,
                image: url,
                role: role
            }
            console.log(data);
            sendData(data);
        }
    }
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(0);
    const [image, setImage] = useState();
    const [role, setRole] = useState("")
    const [errorMesage, setErrorMessage] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();

    const hiddenInput = useRef(null)

    function attachImage() {
        hiddenInput?.current?.click()
    }

    function validateData() {
        if (!image || !title || !date || !role) {
            setErrorMessage("please fill out all fields to add to your filmography")
            return false
        }
        setErrorMessage('');
        return true
    }



    return (
        <section>
            {/* <p>Please add your filmography</p>
            <div>
                {errorMesage && <p>{errorMesage}</p>}
                <Select options={titleOptions} placeholder='your role int the movie' onChange={(choice) => setRole(choice.value)}></Select>
                <button onClick={() => { attachImage() }} type="button">attach image</button>
                <input type="file" onChange={e => setImage(e.target.files[0])} ref={hiddenInput} className='hidden' />
                <input type='button' onClick={() => sendFilmData()} value="Add"></input>
            </div> */}
            <div
                className="col-span-full flex flex-col justify-center boreder border-dashed rounded-lg border-2 border-nborangemain mb-4 text-center p-10">
                
                <label for="photo" className=" h2-title block text-sm font-medium leading-6 text-gray-900">Add your
                    filmography</label>
                <div className="relative max-w-sm left-1/2 -translate-x-1/2 p-5">
                    <label for="photo" className="block text-sm font-medium leading-6 text-gray-900">Date of relese</label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">

                        </svg>
                    </div>
                    
                    <input type="date"
                        className="peer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-nbgreenlight hover:border-2 focus:ring-nbgreenmain focus:border-nbgreenmain block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date" onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label
                        className="block text-sm text-left font-medium leading-6 text-gray-900">Title</label>
                    <div className="mt-2">
                        <input id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:ring-2 hover:ring-nbgreenlight focus:ring-2 focus:ring-inset focus:ring-nbgreendark sm:text-sm sm:leading-6"
                            placeholder="Title" />
                    </div>
                </div>

                <label>Your role in the movie</label>
                <CustomSelect isMulti={false} options={titleOptions} onSelect={setRole}></CustomSelect>

                <div className="mt-4 p-4 border-2 border-dashed border-nbblack rounded-lg">
                    <div className="mt-2 flex justify-center">
                        <div className="inline-flex items-center gap-x-3">
                            <svg className="w-8 h-8 mb-4 text-nbgreenmain dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <button
                                type="button"
                                onClick={() => attachImage()}
                                className="rounded-md bg-nbgreenmain px-2.5 py-1.5 text-sm font-semibold text-nbgreylight shadow-sm hover:bg-nbgreendark focus:bg-nbgreendark focus:ring-1 focus:ring-nbgreenmain ring-offset">Upload
                                file</button>
                            <input type="file" onChange={e => setImage(e.target.files[0])} ref={hiddenInput} className='hidden' />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{image?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    
                </div>
                
                <div className='p-2'>
                    <input type='button' onClick={() => sendFilmData()} value="Add Filmography" className='rounded-md bg-nbgreenmain px-2.5 py-1.5 text-sm font-semibold text-nbgreylight shadow-sm hover:bg-nbgreendark focus:bg-nbgreendark focus:ring-1 focus:ring-nbgreenmain ring-offset'></input>
                </div>
                {errorMesage && <p className="text-xs font-h3-subtitle text-nbredmain pt-2">{errorMesage}</p>}

            </div>
        </section>
    )
}
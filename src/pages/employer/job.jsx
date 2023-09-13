import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from 'react-query';
import Swal from 'sweetalert2';
import {LocationPickerMap, SkillPicker}  from "../../components/";
import {create} from '../../databank';

import ReactQuill from 'react-quill';

const Job = () => {
    const navigate = useNavigate();

    const [submit, setSubmit] = useState({
        isLoading: false,
        isError: false,
    });

    const [location , setLocation] = useState({
        lat: '',
        lng: '',
        address: '',
    });

    const queryClient = useQueryClient();
    queryClient.invalidateQueries('jobs');

    const {isLoading, isError} = submit;

    const handleCreateJob = (submit_event) => {
        submit_event.preventDefault();

        setSubmit(
            {
                isLoading: true,
                isError: true,
            }
        );
        let editor = quillRef.current.getEditor();
        let content = editor.getContents();

        let formData = new FormData(submit_event.target);
        formData.append('content', JSON.stringify(content));
        formData.append('lat', location?.lat);
        formData.append('lng', location?.lng);
        formData.append('address', location?.address);

        // console.log("data post", formData);

        create.createJob(formData).then((response) => {
            // console.log(response);
            setSubmit(
                {
                    isLoading: false,
                    isError: false,
                }
            );

            if(response?.data?.status !== 'notSubmited') {
                Swal.fire({
                    icon:  response.data?.status,
                    title: response.data?.title,
                    text:  response.data?.message
                }).then(() => {
                    if(response?.data?.status == 'success') navigate('/employer/jobs');
                });
            }

            
            
        }).catch((error) => {
            console.log(error);
        });
        
        // console.log(submit_event);
    }

    const quillRef = useRef();



    return (
        <>

            {(isLoading || isError) && 
                <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <span className="loading loading-bars loading-lg text-white"></span>
                </div>
            }

            <form onSubmit={handleCreateJob}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-2xl">New Job</h2>
                    <button type="submit" className="btn h-[40px] text-white bg-green-400 hover:bg-green-500">Done</button>
                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Title</label>
                    <input required name="title" className={`py-2 rounded border-gray-300 shadow w-full outline-none text-xl ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400`} type="text" placeholder='Type the Job Title Here'/>
                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-2 font-bold">Short Description</label>
                    <textarea required name="description" className="textarea textarea-bordered py-2 rounded border-gray-300 shadow w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400" placeholder="Bio"></textarea>
                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Minimum Pay</label>
                    <div className="flex">
                        <select name="currency" className="rounded-md mr-2 border-gray-300 shadow outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400">
                            <option value="usd">usd($)</option>
                        </select>
                        <input required name="minimum_pay" className={`py-2 rounded border-gray-300 shadow w-full outline-none text-xl ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400`} type="number" placeholder='e.g 300'/>
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Full Information</label>
                    <ReactQuill ref={quillRef} className="rounded-md h-[300px] border overflow-hidden shadow-none"/>
                </div>

                <div className="form-control w-full mb-5">
                    <label className="label">
                        <span className="label-text font-bold">click browse below to upload a document for this job</span>
                    </label>
                    <input name="document" type="file" className="file-input file-input-bordered w-full " />
                </div>

                <SkillPicker />

                <div className="map mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Location </label>
                    <p className="text-xs font-bold max-w-[500px] mb-2">{"Provide the job's location and ensure that the pointer is pointing to the location, make use of the map or the location input bellow to select your desired location"}</p>
                    <LocationPickerMap onSelectLocation={setLocation} />
                </div>
            </form>
        </>
    )
}

export default Job
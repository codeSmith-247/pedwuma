import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from 'react-query';
import Swal from 'sweetalert2';
import {LocationPickerMap, SkillPicker, Loading}  from "../../components/";
import {read, update, deletes} from '../../databank';

import ReactQuill from 'react-quill';



const EditJob = () => {
    const navigate = useNavigate();

    const [submit, setSubmit] = useState({
        isLoading: false,
        isError: false,
    });

    const queryClient = useQueryClient();
    

    const id = read.getItem('job_id');

    const {data, isLoading, isError} = read.useEmployerJob(id);

    const [prevData, setPrevData] = useState({...data});

    const [location , setLocation] = useState({
        lat: prevData?.lat,
        lng: prevData?.lng,
        address: prevData?.location,
    });

    const handleDeleteJob = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deletes.deleteJob(id).then(() => {
                queryClient.invalidateQueries('*');
              });
            }
          })
    }

    const handleEditJob = (submit_event) => {
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
        formData.append('id', prevData?.id);

        // console.log("data post", prevData);

        update.updateJob(formData).then((response) => {
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
                    // if(response?.data?.status == 'success') navigate('/employer/jobs');
                });
            }

            queryClient.resetQueries();
            
        }).catch((error) => {
            (error);
        });
        
        // (submit_event);
    }

    if(data && data?.status === 'error') Swal.fire({
        icon: data?.status,
        title: data?.title,
        text: data?.text
    }).then(() => navigate('/employer/jobs'));

    if(data && typeof(data.content) !== 'undefined' && typeof(prevData.content) == 'undefined') {
        setPrevData({...data});
        setLocation({
            lat: data?.lat,
            lng: data?.lng,
            address: data?.location,
        })
        
    }

    const skills = prevData?.skills?.map(skill => skill.skill);

    const quillRef = useRef();

    if(quillRef.current && typeof(prevData.content) !== 'undefined') {
        let editor = quillRef.current.getEditor();
        if(prevData?.content?.includes("{"))
        editor.setContents(JSON.parse(prevData?.content));
    }

    return (
        <>
            <Loading load={(submit.isLoading || submit.isError || isLoading || isError || typeof(prevData.title) == 'undefined')}/>
            

            {
            data && 
            <form onSubmit={handleEditJob}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-2xl">Edit Job</h2>
                    <div>
                        <button onClick={handleDeleteJob} type="button" className="h-[40px] text-red-600 underline px-3">DELETE</button>
                        <button type="submit" className="btn h-[40px] text-white bg-green-400 hover:bg-green-500">Update</button>
                    </div>

                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Title</label>
                    <input value={prevData?.title} onChange={(change_event) => setPrevData({...prevData, title: change_event.target.value})} required name="title" className={`py-2 rounded border-gray-300 shadow w-full outline-none text-xl ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400`} type="text" placeholder='Type the Job Title Here'/>
                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-2 font-bold">Short Description</label>
                    <textarea value={prevData?.description} onChange={(change_event) => setPrevData({...prevData, description: change_event.target.value})} required name="description" className="textarea textarea-bordered py-2 rounded border-gray-300 shadow w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400" placeholder="Bio">{prevData?.description}</textarea>
                </div>

                <div className="mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Minimum Pay</label>
                    <div className="flex">
                        <select name="currency" className="rounded-md mr-2 border-gray-300 shadow outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400">
                            <option value="usd">usd($)</option>
                        </select>
                        <input value={prevData?.minimum_pay} onChange={(change_event) => setPrevData({...prevData, minimum_pay: change_event.target.value})} required name="minimum_pay" className={`py-2 rounded border-gray-300 shadow w-full outline-none text-xl ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400`} type="number" placeholder='e.g 300'/>
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
                    <a className='underline text-green-400 text-sm pops px-3 py-1 mt-2 w-max rounded-md' href={`${prevData?.docs_endpoint}/${prevData?.media}`}>Job Document</a>
                </div>

                <SkillPicker oldskills={skills} />

                <div className="map mb-5">
                    <label htmlFor="title" className="mb-1 font-bold">Location </label>
                    <p className="text-xs font-bold max-w-[500px] mb-2">{"Provide the job's location and ensure that the pointer is pointing to the location, make use of the map or the location input bellow to select your desired location"}</p>
                    <LocationPickerMap lat={prevData?.lat} lng={prevData?.lng} onSelectLocation={setLocation} />
                </div>
            </form>
            }
        </>
    )
}

export default EditJob;
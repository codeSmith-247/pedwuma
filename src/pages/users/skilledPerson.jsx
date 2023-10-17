import { useRef, useState } from 'react';
import { Outlet, Link, useParams, useNavigate } from 'react-router-dom';
import  { ImageBG, Loading, LocationInput }  from "../../components/";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { decrypt, read, timeAgo, create } from '../../databank';
import Swal from 'sweetalert2';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios';


const libraries = ['places'];


const SkilledPerson = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    const { data, isLoading, isError } = read.useSkilledPerson(decrypt(id));

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw', // Replace with your actual API key
        libraries,
    });

    const quillRef = useRef();

    if(data?.status === 'error')
        Swal.fire({
            icon: data?.status,
            title: data?.title,
            text: data?.message,
        }).then(() => navigate(-1));

    const newJob = (e) => {
        e.preventDefault();
        setLoading(true);
        if (isLoaded) {
            read.ipInfo().then( response => {

                const { lng, lat } = response;
        
                console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw`, response);
        
                axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw`
                ).then(response => {
                if (response.data.results && response.data.results.length > 0) {
                    const addressData = response.data.results[0];

                    let editor = quillRef.current.getEditor();
                    let content = editor.getContents();
            
                    let formData = new FormData(e.target);
                    formData.append('content', JSON.stringify(content));
                    formData.append('lat', lat);
                    formData.append('lng', lng);
                    formData.append('address', addressData.formatted_address);
                    formData.append('currency', "Ghc");
                    formData.append('description', "This job has been was proposed to you from your page on pedwuma.");
                    formData.append('skills', data?.skills?.map(skill => skill.skill_id));
                    formData.append('skilled_id', decrypt(id));

            
                    create.createSkilledJob(formData).then(response => {
                        console.log(response);

                        Swal.fire({
                            icon: response?.data?.status,
                            title: response?.data?.title,
                            text: response?.data?.message,
                        });

                        if(response?.data?.status == 'success') {
                            e.target.reset();
                        }
                        window.my_modal_2.close();

                        setLoading(false);
                    })
                }
                })
        
            });
        }
    }

    console.log(data?.skills);

    return (
        <>
            <Loading load={isLoading || isError} />
            <div className="card grid max-[760px]:block grid-cols-10 gap-3 min-h-[200px] p-5 border-b ">
                <ImageBG image={`${data?.image_endpoint}/${data?.media}`} classname="max-[760px]:mb-3 left col-span-2 overflow-hidden rounded-md " min={false}>
                    <div className="backdrop-blur-2xl h-full w-full flex items-center justify-center p-6 ">
                        <div className="image h-full w-full rounded-md overflow-hidden">
                            <img className="h-full w-full object-cover" src={`${data?.image_endpoint}/${data?.media}`} alt="avatar" />
                        </div>
                    </div>
                </ImageBG>
                <div className="middle col-span-6">
                    <div className="top">
                        <div className="location text-neutral-500">
                            <i className="bi bi-geo-alt"></i>
                            <span className="pops text-extrabold text-sm">{data?.location}</span>
                        </div>

                        <h3 className="font-bold text-3xl text-neutral-800">{data?.fullname}</h3>

                        <div className="duration-type pops text-extrabold text-neutral-600 text-sm">
                        <i className="bi bi-stopwatch"></i>  {'Joined ' + timeAgo(data?.created_at)}
                        </div>
                    </div>

                    <p className="my-5 pops text-neutral-800 text-sm">{data?.description}</p>

                    <div className="skills flex items-center flex-wrap gap-2">
                        {data?.skills?.map(skill => 
                            <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill?.skill}>
                                {skill?.skill}
                            </div>
                        )}
                    </div>

                    <div className="p-3">
                        <b>Rank</b>
                        <div className="rank text-yellow-400 flex gap-2 items-center py-1">
                            {Array.from({length: data?.rank}, (item, index) => 
                                <i className="bi bi-star-fill" key={index}></i>
                            )}
                        </div>
                    </div>

                </div>
                <div className="right grid grid-rows-6 max-[760px]:block max-[760px]:mt-5 col-span-2 rounded-md bg-green-100 bg-opacity-40 overflow-hidden">
                    <div className="row-span-5 flex flex-col items-center justify-center p-5 text-center">
                        <div className="price">
                            <span className="orb">Ghc</span>
                            <span className="text-3xl font-bold orb">{data?.minimum_pay}</span>
                        </div>

                        <div className="proposals">
                            <span className="orb px-1">minimum pay</span>
                        </div>
                    </div>

                    <button onClick={()=>window.my_modal_2.showModal()} className=" btn flex items-center justify-center hover:bg-green-500 p-2 text-center px-3 w-full bg-green-400 text-white underline font-bold self-end">
                        Hire Me
                    </button>

                </div>
            </div>

            <dialog id="my_modal_2" className="modal">
                <Loading load={loading} />
                <form method="dialog" onSubmit={newJob} className="modal-box relative" encType='multipart/form-data'>
                    <button className="text-black absolute btn btn-sm btn-circle btn-ghost  right-2 top-2" onClick={()=>window.my_modal_2.close()}>✕</button>
                    <h3 className="font-bold text-lg">Short Information</h3>
                    <p className="py-4">Please provide the following details to send your "request for proposal"</p>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Short project title</span>
                        </label>
                        <input type="text" name='title' placeholder="Type here" className="input input-bordered w-full " />
                    </div>


                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Short Description</span>
                        </label>
                        <ReactQuill ref={quillRef} className="rounded-md border overflow-hidden"/>
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Minimum Pay (Ghc)</span>
                        </label>
                        <input type="number" name="minimum_pay" placeholder="e.g 3000" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Proposal File (not compulsary)</span>
                        </label>
                        <input type="file" name="document" className="file-input file-input-bordered w-full" />
                    </div>
                    
                    <div className="form-control w-full mt-5 ">
                        <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">Send Request For Proposal</button>
                    </div>
                </form>
            </dialog>

            <section className="p-10">
                <div className="flex border-2 border-neutral-800 rounded-md overflow-hidden">
                    <Link to="portfolio" className="nav-item border-r-2 border-neutral-800 p-3 bg-green-400 text-white">My Portfolio</Link>
                    <Link to="reviews"   className="nav-item p-3 border-r-2 border-neutral-800">My Reviews</Link>
                </div>
                
            </section>

            <Outlet />
        </>
    )
}

export default SkilledPerson
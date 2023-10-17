import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { create, decrypt, read } from '../../databank';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { ipInfo } from '../../databank/read';
import Skeleton from 'react-loading-skeleton';

const Job = () => {
    const { id } = useParams();

    const [latlng, setLatlng] = useState({
        lat: 0,
        lng: 0,
    });

    const [loading, setLoading] = useState(false);

    if(latlng.lat == 0 && latlng.lng == 0)
    ipInfo().then((result) =>{ 
        setLatlng({lat: result.lat, lng: result.lng});
    }).catch(() => setLatlng({lat: 0, lng: 0}));

    // console.log('latlng', latlng );

    const { data, isLoading, isError } = read.useJob(decrypt(`${id}`), latlng.lat, latlng.lng);

    const navigate = useNavigate();

    if(data && data == []){
        Swal.fire({
            icon: 'error',
            title: 'Job Unavailble',
            text: 'This job is currently unavailable or has been deleted, please visit the "jobs" page to find other jobs'
        }).then(() => navigate(-1));
    }

    if(data && data?.status == 'error') {
        Swal.fire({
            icon: data?.status,
            title: data?.title,
            text: data?.message
        }).then(() => navigate(-1));
    } 

    const quillRef = useRef();

    if(quillRef.current && typeof(data?.content) !== 'undefined') {
        let editor = quillRef.current.getEditor();
        if(data?.content?.includes("{"))
        editor.setContents(JSON.parse(data?.content));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let editor = proposalRef.current.getEditor();
        let content = editor.getContents();

        let data = new FormData(e.target);
        data.append('description', JSON.stringify(content));

        // console.log('content',content);

        create.createProposal(data).then((response) => {
            setLoading(false);
            window.my_modal_2.close()
            // console.log(response);
            response = response?.data;

            if(response?.title == 'Session Expired') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Service Providers Only',
                    text: 'You need to be log in as a Service Provider to send a proposal'
                });
            }
            else {

                Swal.fire({
                    icon: response?.status,
                    title: response?.title,
                    text: response?.message
                });
            }

        }).catch(() => {
            setLoading(false);
            window.my_modal_2.close()
            Swal.fire({
                icon: 'warning',
                title: 'Service Providers Only',
                text: 'You need to be log in as a Service Provider to send a proposal'
            });
        });
    }

    const proposalRef = useRef();

  return (
    <>
        <Loading load={(isLoading || isError )} />
         <div className="card grid max-[760px]:block grid-cols-8 gap-3 min-h-[200px] p-5 border-b ">
            <div className="left col-span-6">
                <div className="top">
                    <div className="location text-neutral-500">
                        <i className="bi bi-geo-alt"></i>
                        <span className="pops text-extrabold text-sm">{data?.location}</span>
                    </div>

                    <h3 className="font-bold text-3xl text-neutral-800">{data?.title}</h3>

                    <div className="duration-type pops text-extrabold text-neutral-600 text-sm flex gap-1 flex-wrap">
                    <i className="bi bi-car-front"></i> 
                     {(latlng.lat == 0 && latlng.lng == 0) && <Skeleton height={10} width={60} /> }
                    {!(latlng.lat == 0 && latlng.lng == 0) && <span className='pops'> {parseInt(data?.distance)} km from your current location</span> } | <i className="bi bi-stopwatch"></i> Posted 3 hours ago
                    </div>
                </div>

                <p className="my-5 pops text-neutral-800"> {data?.description}</p>

                <div className="skills flex items-center flex-wrap gap-2">
                    {data?.skills?.map(skill => 
                        <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill.skill}>
                            {skill.skill}
                        </div>
                    )}
                    {
                        (data?.skills == []) && 
                        <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" >
                            No Skill Required
                        </div>
                    }
                </div>
            </div>
            <div className="right grid grid-rows-6 max-[760px]:block max-[760px]:mt-5 col-span-2 rounded-md bg-green-100 bg-opacity-40 overflow-hidden">
                <div className="row-span-5 flex flex-col gap-2 items-center justify-center p-5 text-center">
                    <div className="price">
                        <span className="orb">Ghc</span>
                        <span className="text-4xl font-bold orb">{data?.minimum_pay}</span>
                    </div>

                    <div className="proposals">
                        <span className="orb  font-medium">{data?.proposals ?? 13}</span>
                        <span className="orb px-1">Proposals</span>
                    </div>
                </div>

                <button onClick={()=>window.my_modal_2.showModal()} className="btn flex items-center justify-center hover:bg-green-500 p-2 px-3 w-full bg-green-400 text-white underline font-bold self-end">
                    Send Proposal
                </button>

            </div>

            <dialog id="my_modal_2" className="modal">
                <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                    <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.my_modal_2.close()}>✕</button>
                    <h3 className="font-bold text-lg">Short Information</h3>
                    <p className="py-4">{'Please provide the following details to send your "request for proposal"'}</p>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Short project title</span>
                        </label>
                        <input required name='title' type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Short Description</span>
                        </label>
                        <ReactQuill ref={proposalRef} className="rounded-md border overflow-hidden"/>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Proposal File (not compulsary)</span>
                        </label>
                        <input name="document" type="file" className="file-input file-input-bordered w-full" />
                        <input name="id" type="hidden" value={data?.id} />
                    </div>
                    <div className="form-control w-full mt-5 ">
                        <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">Send Proposal</button>
                    </div>
                </form>
                <Loading load={(loading )} />

            </dialog>

        </div>
        <h1 className={`underline font-black p-5 text-gray-300`}>Job Details</h1>
        <ReactQuill ref={quillRef} readOnly={true} theme='snow' modules={{ toolbar: []}} />

    </>
  )
}

export default Job
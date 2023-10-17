import { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { create, read } from '../../databank';
import { Loading } from '../../components';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import NewAppointment from "./newAppointment";

// eslint-disable-next-line react/prop-types
const ChatNav = ({authNavs=[], setMenu, menu, recipient = null}) => {

    const {data, isLoading, isError} = read.useInfo();
    const [jobs, setJobs] = useState([]);
    const [completableJobs, setCompletableJobs] = useState([]);
    const [jobsAwarded, setJobsAwarded] = useState([]);
    const [jobsCompleted, setJobsCompleted] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_role = parseInt(read.getItem('role'));

    const links = [
        {
            name: "Dashboard",
            icon: "grid",
            link: "/skilled"
        },
        {
            name: "My Jobs",
            icon: "wrench-adjustable-circle",
            link: "/skilled/jobs"
        },
        {
            name: "My Proposals",
            icon: "envelope",
            link: "/skilled/proposals"
        },
        {
            name: "My Portfolio",
            icon: "person-circle",
            link: "/skilled/portfolio"
        },
        {
            name: "Chats",
            icon: "chat",
            link: "/chats"
        },
        {
            name: "Settings",
            icon: "wrench",
            link: "/skilled/settings"
        },
    ];

    if(user_role.toString() == '2') authNavs = links;

    if(data?.status === 'error'){
        Swal.fire({
            icon: data?.status,
            title: data?.title,
            text: data?.message,
        }).then(() => location.href = '/login');
    }


    const handleAwardJob = () => {
        setLoading(true);
        read.getJobs(recipient).then((response) => {

            if(typeof(response?.data?.data) == "object" && response.data.data.length > 0 ) {
                setJobs(response.data.data)
                window.my_modal_3.showModal()
            }
            else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Jobs Available',
                    'text': 'No pending jobs found with this Service Provider. The Job has been awarded or there are no sent proposals.'
                })
            }

            setLoading(false);

        })
    }

    read.getCompletableJobs(recipient).then((response) => {

        if(typeof(response?.data?.data) == "object" && response.data.data.length > 0 ) {
            setCompletableJobs(response.data.data)
        }

        setLoading(false);
    })

    const displayCompletableJobs = () => {

        setLoading(true);
        read.getCompletableJobs(recipient).then((response) => {

            if(typeof(response?.data?.data) == "object" && response.data.data.length > 0 ) {
                setCompletableJobs(response.data.data)
                window.my_modal_4.showModal()
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'All Jobs Completed',
                    'text': 'All jobs with this Service Provider has been completed.'
                })
            }

            setLoading(false);

        })
        
    }

    const handleJobAwarded = (id) => {
        console.log(id);
        if(jobsAwarded.indexOf(id) <= -1) {
            setJobsAwarded([...jobsAwarded, id]);
        }
        else {
            let newarray = [...jobsAwarded];
            newarray.splice(jobsAwarded.indexOf(id), 1);
            setJobsAwarded([...newarray]);
        }
    }

    const handleJobCompleted = (id) => {
        console.log(id);
        if(jobsCompleted.indexOf(id) <= -1) {
            setJobsCompleted([...jobsCompleted, id]);
        }
        else {
            let newarray = [...jobsCompleted];
            newarray.splice(jobsCompleted.indexOf(id), 1);
            setJobsCompleted([...newarray]);
        }
    }

    const handleAward = () => {
        
        setLoading(true);

        if(jobsAwarded.length <= 0) {
            setLoading(false);
            Swal.fire({
                icon: 'warning',
                title: 'No Jobs Selected',
                text: 'Click on a job to award it to a Service Provider',
            }).then(() => window.my_modal_3.showModal);

            return false;
        }

        create.awardJobs(jobsAwarded, recipient).then((response) => {
            console.log(response);

            response = response.data;

            Swal.fire({
                icon: response.status,
                title: response.title,
                text: response.message,
            });

            setLoading(false);

            
        });
    }

    const handleComplete = () => {
        
        setLoading(true);

        if(jobsCompleted.length <= 0) {
            setLoading(false);
            Swal.fire({
                icon: 'warning',
                title: 'No Jobs Selected',
                text: 'Click on a job to award it to a Service Provider',
            }).then(() => window.my_modal_4.showModal());

            return false;
        }

        create.completeJobs(jobsCompleted, recipient).then((response) => {
            console.log(response);

            response = response.data;

            Swal.fire({
                icon: response.status,
                title: response.title,
                text: response.message,
            });

            setLoading(false);

            window.my_modal_10.showModal();
        });
    }

    const handleReview = (e) => {

        setLoading(true);

        let data = new FormData(e.target);

        data.append('job_ids', jobsCompleted);
        data.append('id',recipient);

        create.postReview(data).then((response) => {
            console.log(response);

            response = response.data;

            Swal.fire({
                icon: response.status,
                title: response.title,
                text: response.message,
            });

            setLoading(false);

            window.my_modal_10.showModal();
        });
    }


  return (
    <nav className="flex items-center justify-between p-2 shadow-md rounded-md">
        <Loading load={(isLoading || isError || loading)} />
        <div className="flex items-center">

            <div className="menu-btn flex items-center justify-center text-3xl" onClick={() => setMenu(!menu)}>
                <i className="bi bi-list"></i>
            </div>

            
            
        </div>

        <NewAppointment id={recipient}/>

        <div className="flex items-center gap-3">
            {
                (recipient !== null && user_role.toString() == '1') &&
                    <div className="flex items-center gap-3">
                        <button onClick={handleAwardJob} className="btn btn-sm bg-orange-400 hover:bg-green-400 text-white w-full">Award Job</button>
                    </div>
            }
            <Dropdown

                inline
                label={<Avatar className="img-cover" alt="User settings" img={`${data?.image_endpoint}/${data?.data?.media}`} rounded status="online"/>}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                    {data?.data?.fullname}
                    </span>
                    <span className="block truncate text-sm font-medium">
                    {data?.data?.email}
                    </span>
                </Dropdown.Header>
                {
                    (recipient !== null ) &&
                    <Dropdown.Item>
                        <div className="flex items-center gap-3 w-full">
                            <button onClick={()=>window.my_modal_3.showModal()} className="btn btn-sm border-2 border-green-400 hover:bg-green-400 text-green-500 hover:text-white w-full">Book Appointment</button>
                        </div>
                    </Dropdown.Item>
                }

                {
                    (recipient !== null && completableJobs.length > 0 && user_role.toString() == '1') &&
                    <Dropdown.Item>
                        <div className="flex items-center gap-3 w-full">
                            <button onClick={displayCompletableJobs} className="btn btn-sm border-2 border-green-400 hover:bg-green-400 text-green-500 hover:text-white w-full">Complete Job</button>
                        </div>
                    </Dropdown.Item>
                }
            </Dropdown>
        </div>

        <dialog id="my_modal_3" className="modal">

            <form  method="dialog" className="modal-box">
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>{window.my_modal_3.close(), setJobsAwarded([])}}>✕</button>
                <h3 className="font-bold text-sm">Select from proposed jobs by this Service Provider.</h3>

                {
                    jobs?.map((item, index) => 
                        <div onClick={() => handleJobAwarded(item.id)} key={index} className={`job flex items-center justify-between w-full mt-2 border-2  p-2 rounded-md ${jobsAwarded.indexOf(item.id) > -1 ? 'bg-orange-400 text-white border-orange-200' :  'border-green-200'} `}>
                            <div>
                                <div className={` text-xs font-bold ${jobsAwarded.indexOf(item.id) > -1 ? ' text-white' :  'text-gray-400'} `} >{item.location}</div>
                                <div className="font-bold text-xl leading-none">{item.title}</div>
                            </div>
                            <div className={`"orb font-bold text-lg flex items-center justify-center p-2 rounded-md mx-1 orb whitespace-nowrap ${jobsAwarded.indexOf(item.id) > -1 ? 'bg-orange-500 text-white' :  'bg-green-200'}`}> <span className="text-xs orb">Ghc </span> {item.minimum_pay}</div>
                        </div>
                    )
                }

                <button onClick={handleAward} className="btn  mt-2 bg-green-400 hover:bg-green-500 text-white w-full">Award</button>
            </form>
        </dialog>

        <dialog id="my_modal_4" className="modal">

            <form  method="dialog" className="modal-box">
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>{window.my_modal_4.close(), setJobsCompleted([])}}>✕</button>
                <h3 className="font-bold text-sm">Select the jobs you want to complete.</h3>

                {
                    completableJobs?.map((item, index) => 
                        <div onClick={() => handleJobCompleted(item.id)} key={index} className={`job flex items-center justify-between w-full mt-2 border-2  p-2 rounded-md ${jobsCompleted.indexOf(item.id) > -1 ? 'bg-orange-400 text-white border-orange-200' :  'border-green-200'} `}>
                            <div>
                                <div className={` text-xs font-bold ${jobsCompleted.indexOf(item.id) > -1 ? ' text-white' :  'text-gray-400'} `} >{item.location}</div>
                                <div className="font-bold text-xl leading-none">{item.title}</div>
                            </div>
                            <div className={`"orb font-bold text-lg flex items-center justify-center p-2 rounded-md mx-1 orb whitespace-nowrap ${jobsCompleted.indexOf(item.id) > -1 ? 'bg-orange-500 text-white' :  'bg-green-200'}`}> <span className="text-xs orb">Ghc </span> {item.minimum_pay}</div>
                        </div>
                    )
                }

                <button onClick={handleComplete} className="btn  mt-2 bg-green-400 hover:bg-green-500 text-white w-full">Complete</button>
            </form>
        </dialog>

        <dialog id="my_modal_10" className="modal">

            <form onSubmit={handleReview}  method="dialog" className="modal-box">
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>{window.my_modal_10.close(), setJobsCompleted([])}}>✕</button>
                <h3 className="font-bold text-sm">A Review For The Jobs Completed</h3>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Rating</span>
                    </label>
                    <select name="rating" className="select select-bordered w-full col-span-2 outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400" onChange={(change_event) => {setSearchType(change_event.target.value, handleSearch())}}>
                        {Array.from({length: 4}, (item, index) => 
                            <option value={index + 1} selected>
                                {index + 1}
                            </option>
                        )}
                    </select>
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Short Review</span>
                    </label>
                    <textarea className="p-2 textarea textarea-bordered" name="review" placeholder="Type your review here..."></textarea>
                </div>

                <button className="btn  mt-2 bg-green-400 hover:bg-green-500 text-white w-full">Post Review</button>
            </form>
        </dialog>
    </nav>
  )
}

export default ChatNav
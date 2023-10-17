import { useRef, useState } from 'react';
import {read, update, create, encrypt } from '../../databank';
import Skeleton from 'react-loading-skeleton';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AppointmentModal = ({id}) => {
    const proposalRef = useRef();
    const dialogRef = useRef();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const { data, isLoading, isError } = read.useAppointment(id);

    console.log(data);

    if(proposalRef.current && typeof(data?.description) !== 'undefined') {
        let editor = proposalRef.current.getEditor();
        if(data?.description[0] == "{")
            editor.setContents(JSON.parse(data?.description));
        else editor.setText(data?.description);
    }

    const handleProposal = (state) => {
        setLoading(true);
        update.setProposalStates(id, state).then( (response) => {
            console.log(response);
            response = response.data;
            setLoading(false);

            Swal.fire({
                icon: response?.status,
                title: response?.title,
                text: response?.message,
            }).then( () => {
                if(state === 'accepted') {
                    create.setItem('chat_recipient', `${data?.skilled_id}`);
                    handleContinueToChat(data?.skilled_id)
                }

                console.log('state', state);
            })
        });
    }


    const handleContinueToChat = (id) => {
        create.setItem('chat_person', encrypt(`${id}`));
        navigate('/chats');
    }

    // console.log('proposal_modal_data', data);

    return (
        <dialog ref={dialogRef} id="my_modal_2" className="modal">

            <form  method="dialog" className="modal-box">
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.my_modal_2.close()}>✕</button>

                {(isLoading || isError) && 
                    <>
                        <div className="form-control w-full ">
                            <Skeleton height={50} />
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <Skeleton height={150} />

                        </div>

                        <div className="form-control w-full mt-5 ">
                            <Skeleton height={50} />
                            <Skeleton height={50} />
                        </div>
                    </>
                }
                
                {
                    data && 
                    <>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold text-gray-400">Title</span>
                            </label>
                            <h1 className="font-bold text-xl">{data?.title}</h1>
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold text-gray-400">Description</span>
                            </label>
                            <p>{data?.desc}</p>
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold text-gray-400">Start Date</span>
                            </label>
                            <p>{formatDate(data?.start)}</p>
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold text-gray-400">End Date</span>
                            </label>
                            <p>{formatDate(data?.end)}</p>
                        </div>
                        
                        

                        {/* <div className="form-control w-full mt-5 ">
                            {
                                (typeof(data?.status) !== 'undefined' && data?.status == 'active' && data?.is_recipient === true) && 
                                <button onClick={() => handleContinueToChat(data?.skilled_id)} className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">CONTINUE TO CHAT</button>
                            }

                            {
                                (typeof(data?.status) !== 'undefined' && data?.status == 'pending' ) && 
                                <>
                                    <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white" onClick={() => handleProposal('accepted')}>Accept Proposal</button>
                                    <button className="btn flex items-center justify-center border-red-400 hover:bg-red-500 text-red-500 mt-2" onClick={() => handleProposal('rejected')}>Reject Proposal</button>
                                </>
                            }
                        </div> */}
                    </>
                }
            </form>
            <Loading load={(loading )} />

        </dialog>
    )
}

function formatDate(inputDateStr) {
    // Create a Date object from the input string
    const inputDate = new Date(inputDateStr);
  
    // Define arrays for month names and day names
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
  
    // Extract month, day, and time information
    const monthName = months[inputDate.getMonth()];
    const dayOfMonth = inputDate.getDate();
    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
  
    // Determine if it's AM or PM
    const amOrPm = hours < 12 ? "am" : "pm";
  
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;
  
    // Create the desired output string
    const outputStr = `${dayOfMonth}th ${monthName} ${dayOfWeek} ${formattedHours}:${minutes}${amOrPm}`;
  
    return outputStr;
}

export default AppointmentModal
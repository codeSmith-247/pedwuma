import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import {read, update, create } from '../../databank';
import Skeleton from 'react-loading-skeleton';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProposalModal = ({id}) => {
    const proposalRef = useRef();
    const dialogRef = useRef();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const { data, isLoading, isError } = read.useProposal(id);

    if(proposalRef.current && typeof(data?.description) !== 'undefined') {
        let editor = proposalRef.current.getEditor();
        editor.setContents(JSON.parse(data?.description));
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
                    navigate('/chats')
                }

                console.log('state', state);
            })
        });
    } 

    // console.log('proposal_modal_data', data);

    return (
        <dialog ref={dialogRef} id="my_modal_2" className="modal">

            <form  method="dialog" className="modal-box">
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.my_modal_2.close()}>✕</button>
                <h3 className="font-bold text-xs">Proposal Information</h3>

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

                        <div className="form-control w-full">
                            <a href="#">ProposalFile</a>
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
                            <h1 className="font-bold text-xl">{data?.title}</h1>
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <ReactQuill placeholder='loading...' modules={{ toolbar: []}} readOnly={true} ref={proposalRef} className="rounded-md border overflow-hidden min-height"/>
                        </div>
                        
                        {(typeof(data?.media) !== 'undefined' && data?.media !== 'default.pg') &&
                            <div className="form-control w-full mt-2">
                                <a rel='noreferrer' target='_blank' className="text-green-400 border-green-400 border p-1 px-3 rounded-md w-max " href={`${data?.docs_endpoint}/${data?.media}`}>Proposal File</a>
                            </div>
                        }

                        <div className="form-control w-full mt-5 ">
                            {
                                (typeof(data?.status) !== 'undefined' && data?.status == 'accepted') && 
                                <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">CONTINUE TO CHAT</button>
                            }

                            {
                                (typeof(data?.status) !== 'undefined' && data?.status == 'pending' ) && 
                                <>
                                    <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white" onClick={() => handleProposal('accepted')}>Accept Proposal</button>
                                    <button className="btn flex items-center justify-center border-red-400 hover:bg-red-500 text-red-500 mt-2" onClick={() => handleProposal('rejected')}>Reject Proposal</button>
                                </>
                            }
                        </div>
                    </>
                }
            </form>
            <Loading load={(loading )} />

        </dialog>
    )
}

export default ProposalModal
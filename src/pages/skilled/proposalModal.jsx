import { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import {read,  } from '../../databank';
import Skeleton from 'react-loading-skeleton';
// import { Loading } from '../../components';

// eslint-disable-next-line react/prop-types
const ProposalModal = ({id}) => {
    const proposalRef = useRef();
    const dialogRef = useRef();


    const { data, isLoading, isError } = read.useProposal(id);


    useEffect(() => {
        if(proposalRef.current) {
            let editor = proposalRef.current.getEditor();
            if(data?.description?.indexOf("}") >= 0)
            editor.setContents(JSON.parse(data?.description));
            console.log(id);
        }
    }, [data])


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
                    </>
                }
            </form>

        </dialog>
    )
}

export default ProposalModal
import { useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { read } from '../../databank';

const EditPortfolio = ({ id }) => {

    const modalRef = useRef();

    const { data, isLoading, isError } = read.usePortfolio(id);

    const [ editData, setEditData ] = useState({});
    const [ first, setFirst ] = useState(null);

    if(data && first !== data?.id) {

        let units = ['days', 'weeks', 'months', 'years'];
        let unit = '';
        let duration = '';

        units.forEach(item => {
            if(data?.duration?.indexOf(item) >= 0) {
                unit = item;

                duration = data?.duration?.replaceAll(item, "");
                console.log(duration);
            }
        })

        setEditData({...data, duration_unit: unit, duration: parseInt(duration)});
        setFirst(data?.id);
    }

    return (
        <>
        <dialog ref={modalRef} id="edit_portfolio" className="modal">
            {(isLoading || isError) &&

                <form className="modal-box">
                    <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>{modalRef.current.close();}}>✕</button>
                    <h3 className="font-bold text-xl mb-1">Portfolio Information</h3>

                    <div className="mb-3 flex items-end gap-3">
                        <Skeleton height={70} width={70} />

                        <Skeleton height={40} />
                    </div>

                    <div className="form-control my-3">
                        <Skeleton height={40} />
                    </div>

                    <div className="form-control my-3"> 
                        <Skeleton height={40} />
                    </div>

                    <div className="form-control my-3"> 
                        <Skeleton height={40} />
                    </div>

                    <div className="form-control my-3"> 
                        <Skeleton height={40} />
                    </div>

                    <div className="form-control my-3"> 
                        <Skeleton height={40} />
                    </div>

                </form>
            }
            {data && 
                <form method="dialog" className="modal-box">
                    <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>modalRef.current.close()}>✕</button>
                    <h3 className="font-bold text-xl mb-1">Portfolio Information</h3>

                    <div className="form-control my-3">
                        <label htmlFor="title" className="font-bold text-sm mb-1">Title</label>
                        <input disabled value={editData?.title} type="text" name="title" className="pops  rounded-md border border-neutral-300  capitalize" placeholder="A short title for the work you did" />
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="description" className="font-bold text-sm mb-1">Description</label>
                        <textarea disabled value={editData?.description} name="description" placeholder="A breif description about the work you did" className="pops  rounded-md border border-neutral-300 min-h-[90px]"></textarea>
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="duration" className="font-bold text-sm mb-1">Duration</label>
                        <div className="flex ">
                            <select disabled value={editData?.duration_unit} name="duration_unit" className="select rounded-tl-md rounded-bl-md rounded-none pops border-neutral-300 ">
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                            </select>
                            <input disabled value={editData?.duration} type="number" name="duration" className="pops flex-grow border-neutral-300 rounded-tr-md rounded-br-md " placeholder="1" />
                        </div>
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="budget" className="font-bold text-sm mb-1">Budget</label>
                        <div className="flex ">
                            <select value="ghc" className="select rounded-tl-md rounded-bl-md rounded-none pops border-neutral-300 ">
                                <option value="ghc" disabled>Ghc</option>
                            </select>
                            <input disabled value={editData?.budget} type="number" name="budget" className="pops flex-grow border-neutral-300 rounded-tr-md rounded-br-md " placeholder="1000" />
                        </div>
                    </div>

                </form>
            }
        </dialog>
        </>
    );
}

export default EditPortfolio;
import { useState, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { update, read, deletes } from '../../databank';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';

const EditPortfolio = ({ id }) => {

    const modalRef = useRef();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = read.usePortfolio(id);

    const [ loading, setLoading ] = useState(false);
    const [ editData, setEditData ] = useState({});
    const [ first, setFirst ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');

    const editPortfolio = (e) => {
        e.preventDefault();

        setLoading(true);

        let data = new FormData(e.target);

        data.append('id', id);


        update.updatePortfolio(data).then( response => {
            let data = response.data;

            console.log(data);

            modalRef.current.close()

            Swal.fire({
                icon: data?.status,
                title: data?.title,
                text: data?.message,
            });

            if(data?.status == 'success') {
                e.target.reset();
                queryClient.invalidateQueries(`portfolio_${id}`);
            }

            setLoading(false);
        })

    
    }

    const changeImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);

        setImageUrl(url);
    }

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
        setImageUrl(`${data?.image_endpoint}/${data?.media}`)


    }

    const deletePortfolio = () => {

            modalRef.current.close();

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
                    setLoading(true);
                    

                    deletes.deletePortfolio(editData.id).then(response => {
            
                        let data = response.data;

                        setLoading(false);
            
                        Swal.fire({
                            icon: data?.status,
                            title: data?.title,
                            text: data?.message
                        });

                        if(data?.status === 'success') queryClient.invalidateQueries();
                    })
                }
              })
    }

    return (
        <>

        <Loading load={loading} />
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
                <form onSubmit={editPortfolio}  method="dialog" className="modal-box">
                    <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>modalRef.current.close()}>✕</button>
                    <h3 className="font-bold text-xl mb-1">Portfolio Information</h3>

                    <div className="mb-3 flex items-end gap-3">
                        <div className="image border border-neutral-300 h-[70px] w-[70px] overflow-hidden bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-400">
                            {
                                (imageUrl == '') &&
                                <i className="bi bi-image text-xl"></i>
                            }
                            {
                                (imageUrl !== '') && 
                                <img src={imageUrl} className="w-full h-full object-cover" />
                            }
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="image" className="font-bold text-sm mb-1"> Image</label>
                            <input onChange={changeImage} name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full " />
                        </div>
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="title" className="font-bold text-sm mb-1">Title</label>
                        <input onChange={(e) => setEditData({...editData, title: e.target.value})} value={editData?.title} type="text" name="title" className="pops  rounded-md border border-neutral-300  capitalize" placeholder="A short title for the work you did" />
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="description" className="font-bold text-sm mb-1">Description</label>
                        <textarea onChange={(e) => setEditData({...editData, description: e.target.value})} value={editData?.description} name="description" placeholder="A breif description about the work you did" className="pops  rounded-md border border-neutral-300 min-h-[90px]"></textarea>
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="duration" className="font-bold text-sm mb-1">Duration</label>
                        <div className="flex ">
                            <select onChange={(e) => setEditData({...editData, duration_unit: e.target.value})} value={editData?.duration_unit} name="duration_unit" className="select rounded-tl-md rounded-bl-md rounded-none pops border-neutral-300 ">
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                            </select>
                            <input onChange={(e) => setEditData({...editData, duration: e.target.value})} value={editData?.duration} type="number" name="duration" className="pops flex-grow border-neutral-300 rounded-tr-md rounded-br-md " placeholder="1" />
                        </div>
                    </div>

                    <div className="form-control my-3">
                        <label htmlFor="budget" className="font-bold text-sm mb-1">Budget</label>
                        <div className="flex ">
                            <select value="ghc" className="select rounded-tl-md rounded-bl-md rounded-none pops border-neutral-300 ">
                                <option value="ghc" disabled>Ghc</option>
                            </select>
                            <input onChange={(e) => setEditData({...editData, budget: e.target.value})} value={editData?.budget} type="number" name="budget" className="pops flex-grow border-neutral-300 rounded-tr-md rounded-br-md " placeholder="1000" />
                        </div>
                    </div>

                    <button className="btn bg-green-400 hover:bg-green-500 text-white w-full">Edit Portfolio</button>
                    <button type='button' onClick={deletePortfolio} className="btn border-red-500 hover:bg-red-500 text-red-500 hover:text-white w-full mt-3">Delete Portfolio</button>

                </form>
            }
        </dialog>
        </>
    );
}

export default EditPortfolio;
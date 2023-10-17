import { useState } from 'react';
import { create } from '../../databank';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';

const AddPortfolio = () => {

    const [ loading, setLoading ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState('');

    const queryClient = useQueryClient();

    const createPortfolio = (e) => {
        e.preventDefault();

        setLoading(true);

        let data = new FormData(e.target);


        create.createPortfolio(data).then( response => {
            let data = response.data;

            window.my_modal_2.close();

            Swal.fire({
                icon: data?.status,
                title: data?.title,
                text: data?.message,
            });

            if(data?.status == 'success'){

                e.target.reset();

                queryClient.invalidateQueries();
            } 

            setLoading(false);
        })

    
    }

    const changeImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);

        setImageUrl(url);
    }

    return (
        <dialog id="my_modal_2" className="modal">
            <Loading load={loading} />
            <form onSubmit={createPortfolio}  method="dialog" className="modal-box">
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.my_modal_2.close()}>✕</button>
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
                    <input type="text" name="title" className="pops  rounded-md border border-neutral-300  capitalize" placeholder="A short title for the work you did" />
                </div>

                <div className="form-control my-3">
                    <label htmlFor="description" className="font-bold text-sm mb-1">Description</label>
                    <textarea name="description" placeholder="A breif description about the work you did" className="pops  rounded-md border border-neutral-300 min-h-[90px]"></textarea>
                </div>

                <div className="form-control my-3">
                    <label htmlFor="duration" className="font-bold text-sm mb-1">Duration</label>
                    <div className="flex ">
                        <select defaultValue="days" name="duration_unit" className="select rounded-tl-md rounded-bl-md rounded-none pops border-neutral-300 ">
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                        <input type="number" name="duration" className="pops flex-grow border-neutral-300 rounded-tr-md rounded-br-md " placeholder="1" />
                    </div>
                </div>

                <div className="form-control my-3">
                    <label htmlFor="budget" className="font-bold text-sm mb-1">Budget</label>
                    <div className="flex ">
                        <select defaultValue="ghc" className="select rounded-tl-md rounded-bl-md rounded-none pops border-neutral-300 ">
                            <option value="ghc" disabled>Ghc</option>
                        </select>
                        <input type="number" name="budget" className="pops flex-grow border-neutral-300 rounded-tr-md rounded-br-md " placeholder="1000" />
                    </div>
                </div>

                <button className="btn bg-green-400 hover:bg-green-500 text-white w-full">Add Portfolio</button>

            </form>

        </dialog>
    );
}

export default AddPortfolio;
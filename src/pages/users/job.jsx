
import ReactQuill from 'react-quill';

const Job = () => {
  return (
    <>
        <div className="card grid max-[760px]:block grid-cols-8 gap-3 min-h-[200px] p-5 border-b ">
            <div className="left col-span-6">
                <div className="top">
                    <div className="location text-neutral-500">
                        <i className="bi bi-geo-alt"></i>
                        <span className="pops text-extrabold text-sm">Accra, Spintex Ghana commercial bank</span>
                    </div>

                    <h3 className="font-bold text-3xl text-neutral-800">The titel for the job goes here</h3>

                    <div className="duration-type pops text-extrabold text-neutral-600 text-sm">
                    <i className="bi bi-coin"></i> Fixed Price | <i className="bi bi-stopwatch"></i> Posted 3 hours ago
                    </div>
                </div>

                <p className="my-5 pops text-neutral-800"> Thi is going to contain a breif description about the job nothing much nothing less you get it? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore eveniet fugit nemo dignissimos eaque pariatur voluptas ad commodi esse quisquam.</p>

                <div className="skills flex items-center flex-wrap gap-2">
                    {[0,0,0,0,0].map(skill => 
                        <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill}>
                            skill name here
                        </div>
                    )}
                </div>
            </div>
            <div className="right grid grid-rows-6 max-[760px]:block max-[760px]:mt-5 col-span-2 rounded-md bg-green-100 bg-opacity-40 overflow-hidden">
                <div className="row-span-5 flex flex-col items-center justify-center p-5 text-center">
                    <div className="price">
                        <span className="orb">Ghc</span>
                        <span className="text-4xl font-bold orb">123</span>
                    </div>

                    <div className="proposals">
                        <span className="orb  font-medium">13</span>
                        <span className="orb px-1">Proposals</span>
                    </div>
                </div>

                <button onClick={()=>window.my_modal_2.showModal()} className="p-2 px-3 w-full bg-green-400 text-white underline font-bold self-end">
                    Send Proposal
                </button>

            </div>





            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.my_modal_2.close()}>✕</button>
                    <h3 className="font-bold text-lg">Short Information</h3>
                    <p className="py-4">Please provide the following details to send your "request for proposal"</p>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Short project title</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Short Description</span>
                        </label>
                        <ReactQuill className="rounded-md border overflow-hidden"/>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Proposal File (not compulsary)</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full" />
                    </div>
                    <div className="form-control w-full mt-5 ">
                        <button className="btn bg-green-400 hover:bg-green-500 text-white">Send Proposal</button>
                    </div>
                </form>
            </dialog>

        </div>
    </>
  )
}

export default Job
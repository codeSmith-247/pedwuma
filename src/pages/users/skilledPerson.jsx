import { Outlet, Link } from 'react-router-dom';
import  { ImageBG }  from "../../components/";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const SkilledPerson = () => {

    return (
        <>
            <div className="card grid max-[760px]:block grid-cols-10 gap-3 min-h-[200px] p-5 border-b ">
                <ImageBG image="/images/nurse.avif" classname="max-[760px]:mb-3 left col-span-2 overflow-hidden rounded-md " min={false}>
                    <div className="backdrop-blur-2xl h-full w-full flex items-center justify-center py-3">
                        <div className="image h-[190px] w-[130px] rounded-md overflow-hidden">
                            <img className="h-full w-full object-cover" src="/images/nurse.avif" alt="avatar" />
                        </div>
                    </div>
                </ImageBG>
                <div className="middle col-span-6">
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

                    <p className="my-5 pops text-neutral-800 text-sm"> Thi is going to contain a breif description about the job nothing much nothing less you get it? Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                    <div className="skills flex items-center flex-wrap gap-2">
                        {[0,0,0,0,0].map(skill => 
                            <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill}>
                                skill name here
                            </div>
                        )}
                    </div>

                    <div className="p-3">
                        <b>Rank</b>
                        <div className="rank text-yellow-400 flex gap-2 items-center py-1">
                            {[0,0,0,0,0].map(item => 
                                <i className="bi bi-star-fill" key={item}></i>
                            )}
                        </div>
                    </div>

                </div>
                <div className="right grid grid-rows-6 max-[760px]:block max-[760px]:mt-5 col-span-2 rounded-md bg-green-100 bg-opacity-40 overflow-hidden">
                    <div className="row-span-5 flex flex-col items-center justify-center p-5 text-center">
                        <div className="price">
                            <span className="orb">Ghc</span>
                            <span className="text-3xl font-bold orb">123</span>
                        </div>

                        <div className="proposals">
                            <span className="orb px-1">minimum pay</span>
                        </div>
                    </div>

                    <button onClick={()=>window.my_modal_2.showModal()} className="p-2 px-3 w-full bg-green-400 text-white underline font-bold self-end">
                        Hire Me
                    </button>

                </div>
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
                        <button className="btn bg-green-400 hover:bg-green-500 text-white">Send Request For Proposal</button>
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
import { Link } from "react-router-dom"
import { ImageBG } from "../../components/"

const Signup = () => {
  return (
    <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
        
        <div className="backdrop-blur-3xl min-h-screen py-10 max-[560px]:p-0">

          <ImageBG image="images/left_image.png" classname="mx-auto max-w-[900px]  rounded-md overflow-hidden shadow-2xl scale-95 max-[560px]:scale-100 max-[560px]:rounded-none">
              <div className="form-container backdrop-blur-3x grid grid-cols-10 min-h-[550px] w-full p-1 gap-1">

                <div className="input-area bg-white p-10 flex flex-col justify-center col-span-5 max-[760px]:col-span-10 max-[560px]:p-5 rounded-md">
                    <h2 className="text-center font-black text-3xl">Sign Up</h2>

                    <div className="form-control w-full my-1">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Tel Number</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Repeat Password</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                </div>
                <div className="input-area bg-white p-10 pt-2 flex flex-col justify-center col-span-5 max-[760px]:col-span-10 max-[560px]:p-5 rounded-md">
                    <div className="form-control w-full my-1 mt-0">
                        <div className="border-2 border-neutral-800 rounded-full h-[150px] w-[150px] mx-auto">
                            <img src="/images/avatar.gif" alt="" className="object-cover h-full w-full scale-95 rounded-full" />
                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label my-1">
                            <span className="label-text mx-auto text-center font-bold">click browse below to upload a profile picture</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full " />
                    </div>

                    <div className="form-control w-full mt-2">

                        <select className="select select-bordered w-full ">
                            <option disabled selected>Role (Employer / Skilled Person)</option>
                            <option>Employer</option>
                            <option>Skilled Person</option>
                        </select>
                    </div>

                    <div className="form-control w-full mt-5">
                      <Link to="/plans" className="btn bg-green-400 hover:bg-green-500 text-white">Sign Up</Link>
                    </div>

                    <span className="text-center font-bold text-sm my-2">
                      Already have an account? <Link to="/login" className="text-green-500 underline">Click Me</Link> to log in!
                    </span>

                </div>
                
              </div>
          </ImageBG>

        </div>

    </ImageBG>
  )
}

export default Signup
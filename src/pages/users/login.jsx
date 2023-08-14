import { Link } from "react-router-dom"
import { ImageBG } from "../../components/"

const Login = () => {
  return (
    <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
        
        <div className="backdrop-blur-3xl min-h-screen py-10 max-[560px]:p-0">

          <ImageBG image="/images/login_bg1.jpg" classname="mx-auto max-w-[900px]  rounded-md overflow-hidden shadow-2xl scale-95 max-[560px]:scale-100 max-[560px]:rounded-none">
              <div className="form-container backdrop-blur-3xl grid grid-cols-10 min-h-[550px] w-full">

                <div className="input-area bg-white p-10 flex flex-col justify-center col-span-5 max-[760px]:col-span-7 max-[560px]:col-span-10 max-[560px]:p-5">
                    <h2 className="text-center font-black text-3xl">Welcome Back</h2>

                    <div className="form-control w-full my-1">
                        <label className="label">
                            <span className="label-text">Email / Username</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full mt-5">
                      <button className="btn bg-green-400 hover:bg-green-500 text-white">Log In</button>
                    </div>

                    <span className="text-center font-bold text-sm my-2">
                      Dont have an account? <Link to="/signup" className="text-green-500 underline">Sign Up</Link> to get one!
                    </span>

                    <div className="form-control w-full ">
                        <label className="label w-full">
                            <span className="label-text text-center mx-auto h-[30px] w-[30px] my-2 border flex justify-center items-center rounded-full">OR</span>
                        </label>
                    </div>

                    <div className="form-control w-full flex items-center justify-center">
                        <div className="border flex items-center p-1 rounded-full bg-neutral-800 text-white border-neutral-800 hover:border-green-600 hover:bg-green-500">
                          <div className="icon flex items-center justify-center h-[35px] w-[45px] border-2 rounded-full bg-red-500 border-green-300 text-white">
                              <i className="bi bi-google"></i>
                          </div>
                          <span className="px-2">Log in with Google</span>
                        </div>
                    </div>

                    

                </div>

                <ImageBG image="/images/left_image.png" classname="min-h-[550px] rounded-md col-span-5 max-[760px]:col-span-3 max-[560px]:min-h-[120px] max-[560px]:col-span-10">
                  
                </ImageBG>
              </div>
          </ImageBG>

        </div>

    </ImageBG>
  )
}

export default Login
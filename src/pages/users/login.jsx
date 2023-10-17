import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageBG, Loading, PasswordInput } from "../../components/";
import { read, create, urls } from "../../databank";
import Swal from 'sweetalert2';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (submit_event) => {
    setLoading(true);
    submit_event.preventDefault();
    let formData = new FormData(submit_event.target);
    read.login(formData).then((response) => {
      setLoading(false);
      // console.log(response);
      Swal.fire({
        icon: response?.data?.user_status !== 'unverified' ? response?.data?.status : 'warning',
        title: response?.data?.user_status !== 'unverified' ? response?.data?.title : 'Unverified Account',
        text: response?.data?.user_status !== 'unverified' ? response?.data?.message : 'Please verify your account to gain access.',
      })

      if(response?.data?.user_status !== 'unverified' && typeof(response?.data?.token) !== 'undefined')
      {
        create.setItem('token', response?.data?.token);

        create.setItem('status', response?.data?.user_status);
        create.setItem('role', `${response?.data?.role}`);

        if(response?.data?.role == 1) navigate(`${urls.url}/employer`);
        else if(response?.data?.role == 2) navigate(`${urls.url}/skilled`);
      }

      if(response?.data?.user_status === 'unverified') {
        create.setItem('token', response?.data?.token);
        navigate(`${urls.url}/verify`);
      }

    })
  } 
  return (
    <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
        <Loading load={loading} />
        <div className="backdrop-blur-3xl min-h-screen py-10 max-[560px]:p-0">

          <ImageBG image="/images/login_bg1.jpg" classname="mx-auto max-w-[900px]  rounded-md overflow-hidden shadow-2xl scale-95 max-[560px]:scale-100 max-[560px]:rounded-none">
              <form onSubmit={handleSubmit} className="form-container backdrop-blur-3xl grid grid-cols-10 min-h-[550px] w-full">

                <div className="input-area bg-white p-10 flex flex-col justify-center col-span-5 max-[760px]:col-span-7 max-[560px]:col-span-10 max-[560px]:p-5">
                    <h2 className="text-center font-black text-3xl">Welcome Back</h2>

                    <div className="form-control w-full my-1">
                        <label className="label">
                            <span className="label-text">Email / Username</span>
                        </label>
                        <input required name="email" type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <PasswordInput required name="password" placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full mt-5">
                      <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">Log In</button>
                    </div>

                    <span className="text-center font-bold text-sm my-2">
                      Dont have an account? <Link to="/signup" className="text-green-500 underline">Sign Up</Link> to get one!
                    </span>

                    {/* <div className="form-control w-full ">
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
                    </div> */}

                    

                </div>

                <ImageBG image="/images/left_image.png" classname="min-h-[550px] rounded-md col-span-5 max-[760px]:col-span-3 max-[560px]:min-h-[120px] max-[560px]:col-span-10">
                  
                </ImageBG>
              </form>
          </ImageBG>

        </div>

    </ImageBG>
  )
}

export default Login
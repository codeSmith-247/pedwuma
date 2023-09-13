import {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImageBG, Loading } from "../../components/";
import { read, create, urls } from "../../databank";
import Swal from 'sweetalert2';

const SendVerify = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {data, isLoading, isError} = read.useInfo();

  // eslint-disable-next-line react/prop-types
  const { id } = useParams();

  useEffect(() => {

      if(typeof(id) !== 'undefined' && id !== '' && id !== null) {
        setLoading(true);
    
        read.verfiyCode(id).then((response) => {
            setLoading(false);
            // console.log(response);
            Swal.fire({
              icon: response?.data?.user_status !== 'unverified' ? response?.data?.status : 'warning',
              title: response?.data?.user_status !== 'unverified' ? response?.data?.title : 'Unverified Account',
              text: response?.data?.user_status !== 'unverified' ? response?.data?.message : 'Please verify your account to access your account.',
            })
      
            if(response?.data?.status === 'success' && typeof(response?.data?.token) !== 'undefined')
            {
              create.setItem('status', response?.data?.user_status);
      
              if(parseInt(read.getItem('role')) == 1) navigate(`${urls.url}/employer`);
              else if(parseInt(read.getItem('role')) == 2) navigate(`${urls.url}/skilled`);
            }
      
          })
      }

  }, [navigate, id])


  const handleSubmit = (submit_event) => {
    setLoading(true);
    submit_event.preventDefault();

    if(data)
    create.sendVerification(data?.data?.email).then((response) => {
      setLoading(false);
      // console.log(response);
      Swal.fire({
        icon: response?.data?.user_status !== 'unverified' ? response?.data?.status : 'warning',
        title: response?.data?.user_status !== 'unverified' ? response?.data?.title : 'Unverified Account',
        text: response?.data?.user_status !== 'unverified' ? response?.data?.message : 'Please verify your account to access your account.',
      })

      if(response?.data?.status === 'success' && typeof(response?.data?.token) !== 'undefined')
      {
        create.setItem('status', response?.data?.user_status);

        if(parseInt(read.getItem('role')) == 1) navigate(`${urls.url}/employer`);
        else if(parseInt(read.getItem('role')) == 2) navigate(`${urls.url}/skilled`);
      }

    })
  } 

  return (
    <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
        <Loading load={loading || isLoading || isError} />
        <div className="backdrop-blur-3xl flex items-center justify-center min-h-screen py-10 max-[560px]:p-0">

          <ImageBG image="/images/login_bg1.jpg" classname="max-w-[400px] w-full mx-auto rounded-md overflow-hidden shadow-2xl scale-95 max-[560px]:scale-100 max-[560px]:rounded-none">
              <form onSubmit={handleSubmit} className="form-container backdrop-blur-3xl w-full">

                <div className="input-area bg-white  p-5 flex flex-col justify-center max-[560px]:p-5">
                    <h2 className="text-center font-black text-3xl">Email Verification</h2>

                    <div className="form-control w-full my-1 mt-3">
                        <p className="pops text-center ">Please check your email for a verification link, if you have not received a verification link, click the button bellow to resend the link</p>
                    </div>

                    <div className="form-control w-full mt-5">
                      <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">Verify Email</button>
                    </div>

                    <Link to='/login' className="text-blue-600 text-center pt-3 pops font-md underline ">Log In</Link>

                </div>

              </form>
          </ImageBG>

        </div>

    </ImageBG>
  )
}

export default SendVerify;
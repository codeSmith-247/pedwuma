import { useState } from 'react';
import { Link , useNavigate} from "react-router-dom";
import { ImageBG, SmartTelInput, Loading, PasswordInput } from "../../components/";
import { create, read, urls } from "../../databank";
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';

import SelectPlan from './selectPlan';


const Signup = () => {

    const navigate = useNavigate();

    const [submit, setSubmit] = useState({
        isLoading: false,
        isError: false,
    });

    const [showPlan, setShowPlan] = useState(false);
    // const [plan, setPlan] = useState(null);
    const [form, setForm] = useState(null);

    const [avatar, setAvatar] = useState('/images/avatar.gif');

    const {isLoading, isError} = submit;

    let roles_result = read.useRoles();

    const [roles, isLoadingRoles, isErrorRoles] = [roles_result.data, roles_result.isLoading, roles_result.isError]

    const handleAvatar = (change_event) => {
        let url = URL.createObjectURL(change_event.target.files[0]);
        setAvatar(url);
    }


    const handleSubmit = (submit_event) => {
        submit_event.preventDefault();

        let formData = new FormData(submit_event.target);
        handleCreateUser(formData);
        
        // console.log(formData);
    }

    const handleCreateUser = (data) => {
        setSubmit(
            {
                isLoading: true,
                isError: true,
            }
        );

        create.createUser(data).then((response) => {
            console.log(response);
            setSubmit(
                {
                    isLoading: false,
                    isError: false,
                    data: response.data?.data,
                }
            );

            if(response.data.status !== 'notSubmited') {
                Swal.fire({
                    icon:  response.data?.status,
                    title: response.data?.title,
                    text:  response.data?.message
                }).then(() => {
                    if(response.data?.status === 'success') {
                        navigate(`${urls.url}/login`);
                    }
                });

            }
            else {
                setShowPlan(true)
                setForm(data);
            }
            
        }).catch((error) => {
            console.log(error);
        });
    }

    const handlePlan = (plan) => {

        let data = form;
        form.append('plan', plan);
        setForm(data);

        handleCreateUser(form);


    }

    if(showPlan) return (
        <>
            <Loading load={(isLoading || isError)}/>
            <SelectPlan email={form.get('email')} name={form.get('name')} phone={form.get('number')} setPlan={handlePlan}/>
        </>
    )


    return (
        <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
            
            <div className="backdrop-blur-3xl min-h-screen py-10 max-[560px]:p-0">

                <Loading load={(isLoading || isError)}/>
                <ImageBG image="images/left_image.png" classname="mx-auto max-w-[900px]  rounded-md overflow-hidden shadow-2xl scale-95 max-[560px]:scale-100 max-[560px]:rounded-none">
                    <form onSubmit={handleSubmit} className="form-container backdrop-blur-3x grid grid-cols-10 min-h-[550px] w-full p-1 gap-1">

                        <div className="input-area bg-white p-10 flex flex-col justify-center col-span-5 max-[760px]:col-span-10 max-[560px]:p-5 rounded-md">
                            <h2 className="text-center font-black text-3xl">Sign Up</h2>

                            <div className="form-control w-full my-1">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input required name="name" type="text" placeholder="Type here" className={`input input-bordered w-full `} />

                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input required name="email" type="text" placeholder="Type here" className={`input input-bordered w-full ${submit?.data?.email && 'input-error'}`} />
                                {
                                    submit?.data?.email && 
                                    <label className="label">
                                        <span className="label-text-alt">{submit?.data?.email}</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full ">
                                <SmartTelInput />
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <PasswordInput required name="password"  placeholder="Type here" className={`input input-bordered w-full ${submit?.data?.password  && 'input-error'}`} />
                                {
                                    submit?.data?.password && 
                                    <label className="label">
                                        <span className="label-text-alt">{submit?.data?.password}</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Repeat Password</span>
                                </label>
                                <PasswordInput required name="repeat-password"  placeholder="Type here" className={`input input-bordered w-full ${submit?.data && submit?.data['repeat-password']  && 'input-error'}`} />
                                {
                                    (submit?.data && submit?.data['repeat-password']) && 
                                    <label className="label">
                                        <span className="label-text-alt">{submit?.data['repeat-password']}</span>
                                    </label>
                                }
                            </div>

                        </div>
                        <div className="input-area bg-white p-10 pt-2 flex flex-col justify-center col-span-5 max-[760px]:col-span-10 max-[560px]:p-5 rounded-md">
                            <div className="form-control w-full my-1 mt-0">
                                <div className="border-2 border-neutral-800 rounded-full h-[150px] w-[150px] mx-auto">
                                    <img src={avatar} alt="" className="object-cover h-full w-full scale-95 rounded-full" />
                                </div>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label my-1">
                                    <span className="label-text mx-auto text-center font-bold">click browse below to upload a profile picture</span>
                                </label>
                                <input name="avatar" type="file" className={`file-input file-input-bordered w-full ${submit?.data?.avatar  && 'input-error'}`} onInput={handleAvatar}/>
                                {
                                    submit?.data?.avatar && 
                                    <label className="label">
                                        <span className="label-text-alt">{submit?.data?.avatar}</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full mt-2 mb-2">
                                {
                                    (isLoadingRoles || isErrorRoles) && <Skeleton height={50} />
                                }
                                {!(isLoadingRoles || isErrorRoles) &&
                                    <select name="role" className={`select select-bordered w-full ${submit?.data?.role  && 'input-error'}`}>
                                        <option value='' disabled selected>Role (Employer / Service Provider)</option>
                                        {roles?.data?.map(item => 
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )}
                                    </select>
                                }

                                {
                                    submit?.data?.role && 
                                    <label className="label">
                                        <span className="label-text-alt">{submit?.data?.role}</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control text-center">
                                <label className="cursor-pointer label block">
                                    <input name="agree" type="checkbox" className={`checkbox checkbox-success ${submit?.data?.agree  && 'input-error'}`} />
                                    <span className="ml-1 label-text">I agree to the terms and conditions</span>
                                </label>

                                {
                                    submit?.data?.agree && 
                                    <label className="label">
                                        <span className="label-text-alt">{submit?.data?.agree}</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full mt-5">
                                <button className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">Sign Up</button>
                            </div>

                            <span className="text-center font-bold text-sm my-2">
                            Already have an account? <Link to="/login" className="text-green-500 underline">Click Me</Link> to log in!
                            </span>

                        </div>
                        
                    </form>
                </ImageBG>

            </div>

        </ImageBG>
    )
}

export default Signup
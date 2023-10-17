import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Loading, LocationInput, SkillPicker } from '../../components/'
import {read, update} from '../../databank';
import Swal from 'sweetalert2';

const Settings = () => {

    const {data, isLoading, isError} = read.useInfo();

    const queryClient = useQueryClient();

    const[userData, setUserData] = useState(null);
    const[loading, setLoading] = useState(false);

    if(data && userData === null) {

        setUserData({...data?.data, avatar: `${data?.image_endpoint}/${data?.data?.media}`});
    }

    const skills = userData?.skills?.map(skill => skill.title);

    const handleAvatar = (e) => {
        let file = e.target.files[0];

        let url = URL.createObjectURL(file);

        setUserData({...userData, avatar: url});
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true);

        let data = new FormData(e.target);

        update.updateSkilled(data).then((response) => {
            console.log(response);
            queryClient.invalidateQueries('info')
            setLoading(false);
            Swal.fire({
                icon: response?.data?.status,
                title: response?.data?.title,
                text: response?.data?.message,
            })
        })

    }

  return (
    <>
        <Loading load={(isLoading || isError || loading)} />
        
        <div className="flex flex-col items-center justify-center py-5">
            <div className="avatar h-[150px] w-[150px] rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={userData?.avatar} alt="avatar" />
            </div>

            <div className="form-control w-full max-w-sm">
                <label className="label my-1">
                    <span className="label-text mx-auto text-center font-bold">click browse below to change your profile picture</span>
                </label>
                <input name='avatar' type="file" className="file-input file-input-bordered w-full " accept='image/*' onInput={handleAvatar}/>
            </div>

        </div>

        <div className="backdrop-blur-3xl ">

            <form onSubmit={handleSubmit} className="mx-auto max-w-[900px] rounded-md overflow-hidden max-[560px]:scale-100 max-[560px]:rounded-none w-full">
                <div className="form-container backdrop-blur-3x grid grid-cols-10  w-full p-1 gap-3">

                    <div className="input-area bg-white flex flex-col justify-center col-span-5 max-[760px]:col-span-10 rounded-md">
                        

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input required name="fullname" type="text" placeholder="Type here" className="input input-bordered w-full " value={userData?.fullname} onChange={(e) => setUserData({...userData, fullname: e.target.value})}/>
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input required name={'email'} type="text" placeholder="Type here" className="input input-bordered w-full " value={userData?.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                        </div>

                    </div>
                    <div className="input-area bg-white flex flex-col justify-center col-span-5 max-[760px]:col-span-10 rounded-md">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Tel Number</span>
                            </label>
                            <input required name='number' type="text" placeholder="Type here" className="input input-bordered w-full " value={userData?.number} onChange={(e) => setUserData({...userData, number: e.target.value})}/>
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Your Location</span>
                            </label>
                            <LocationInput location={userData?.location} lat={userData?.lat} lng={userData?.lng} onSelectLocation={(data) => setUserData({...userData, lat: data.lat, lng: data.lng, location: data.location})} name="location" placeholder="Type in here to change your location" className="input input-bordered w-full "/>
                        </div>

                    </div>

                    <div className="col-span-10">
                        <SkillPicker oldskills={skills} />
                    </div>
                
                </div>
                <div className="flex justify-end mt-5">
                    <button className="btn bg-green-400 text-white hover:bg-green-500">Update Profile</button>
                </div>
            </form>

        </div>
    </>
  )
}

export default Settings
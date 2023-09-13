// import { ImageBG } from '../../components/'

const Settings = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center py-5">
            <div className="avatar h-[150px] w-[150px] rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src="/images/avatar.gif" alt="avatar" />
            </div>

            <div className="form-control w-full max-w-sm">
                <label className="label my-1">
                    <span className="label-text mx-auto text-center font-bold">click browse below to change your profile picture</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full " />
            </div>

        </div>

        <div className="backdrop-blur-3xl ">

            <div className="mx-auto max-w-[900px] rounded-md overflow-hidden max-[560px]:scale-100 max-[560px]:rounded-none w-full">
                <div className="form-container backdrop-blur-3x grid grid-cols-10  w-full p-1 gap-3">

                <div className="input-area bg-white flex flex-col justify-center col-span-5 max-[760px]:col-span-10 rounded-md">
                    

                    <div className="form-control w-full ">
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

                </div>
                <div className="input-area bg-white flex flex-col justify-center col-span-5 max-[760px]:col-span-10 rounded-md">
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
                </div>
                
                </div>
            </div>

        </div>
    </>
  )
}

export default Settings
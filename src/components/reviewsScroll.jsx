import  {  SideScroll }  from "./";

import {read} from '../databank';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReviewsScroll = () => {
    const { data, isLoading, isError } = read.useJobs();

    if(isLoading || isError || typeof(data?.data?.map) == 'undefined' || data?.data?.length <= 0) {
        return (
            <SideScroll>
                {[0, 0, 0, 0, 0, 0].map((item, index) => 
                    <div className={`card w-[350px] col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={index}>
                        <div className="top flex items-center">
                            
                            <Skeleton circle={true} height={50} width={50} />
                            
                            <div className="titles px-2" style={{width: "calc(100% - 50px)"}}>
                                <Skeleton  height={10}  />
                                <Skeleton  height={20}  />
                                <Skeleton  height={10}  />
                            </div>
                        </div>

                        <p className="pops my-2 text-sm">
                            <Skeleton  height={100}  />
                        </p>
                    </div>
                )}
            </SideScroll>
        );
    }

  return (
    <SideScroll>
        {data?.data?.map((item, index) => 
            <div className={`card w-[350px] col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={index}>
                <div className="top flex items-center">
                    <div className={`avatar rounded-full border-2 border-orange-100 h-[50px] w-[50px] shadow`}>
                        <img src="/images/man.avif" alt="avatar" className="object-cover h-full w-full rounded-full" />
                    </div>
                    <div className="titles px-2" style={{width: "calc(100% - 50px)"}}>
                        <div className=" text-xs text-neutral-600 pops my-1 leading-none">
                            <i className="bi bi-geo-alt"></i>
                            <span>Ghana, Ashanti, Kumasi, KNUST</span>
                        </div>
                        <div className="font-bold text-sm my-2 leading-none">This is where the job descriptive title goes</div>
                        <div className=" text-xs text-neutral-600 pops my-1 leading-none">
                            <i className="bi bi-stopwatch "></i>
                            <span className="mx-1">the Rocksons Project</span>
                        </div>
                    </div>
                </div>
                <p className="pops my-2 text-sm">
                    This is where a short description for the posted job is displayed I hope to use AI to shorten a description
                    to a specific set of words  to a specific set of words to a specific set of words
                </p>
            </div>
        )}
    </SideScroll>
  )
}

export default ReviewsScroll
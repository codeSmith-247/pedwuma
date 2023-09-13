import  { Link }  from "react-router-dom";
import  { ImageBG, SideScroll }  from "./";

import {read} from '../databank';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkillsScroll = () => {
    const { data, isLoading, isError } = read.useSkills();

    if(isLoading || isError || data?.data?.length <= 0) {
        return (
            <SideScroll>
                {[0,0,0,0].map((item, index) =>
                    <div className={`w-[300px] card col-span-3 rounded-md overflow-hidden hover:shadow`} key={index}>
                        <div className=" h-[420px]  bg-opacity-30 p-2 flex flex-col justify-end text-center">
                            <Skeleton height={200} />
                            <h3 className="font-bold text-xl ">
                                <Skeleton height={30} />
                            </h3>
                            <p className="pops text-sm my-2">
                                <Skeleton height={10} />
                                <Skeleton height={10} />
                                <Skeleton height={10} />
                                <Skeleton height={10} />
                            </p>
                            <Skeleton height={40} />
                            
                        </div>
                    </div>
                )}
            </SideScroll>
        );
    }

  return (
    <SideScroll>
        {data?.data?.map((item, index) =>
            <ImageBG image={`/images/carpenter.jpg`} classname={`max-w-[300px] card col-span-3 rounded-md overflow-hidden hover:shadow`} key={index}>
                <div className=" h-[420px]  bg-overlay bg-opacity-30 p-2 flex flex-col justify-end text-center">
                    <h3 className="font-bold text-xl ">{item.title}</h3>
                    <p className="pops text-sm my-2">
                        {item.description.slice(0, 160)}...
                    </p>
                    <Link to="/people" className="btn text-white flex items-center justify-center hover:bg-green-500 bg-green-400 p-2 font-bold rounded-md w-full">View Skills</Link>
                </div>
            </ImageBG>
        )}
    </SideScroll>
  )
}

export default SkillsScroll
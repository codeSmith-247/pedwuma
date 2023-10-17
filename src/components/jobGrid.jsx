import {read, encrypt} from '../databank';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const JobGrid = ({limit=9}) => {

    const { data, isLoading, isError } = read.useJobs();

    console.log('data', data);

    const spliced_array = data?.data?.slice(0, limit);

    if(isLoading || isError || typeof(data?.data?.map) == 'undefined'  || data?.data?.length <= 0)
        return (
            <div className="grid grid-cols-9 max-[1000px]:grid-cols-6 max-[690px]:grid-cols-3 gap-3 max-[525px]:gap-0 ">
                {[0, 0, 0, 0, 0, 0].map((item, index) => 
                    <div className={`card col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={index}>
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

                        <Skeleton  height={40}  />
                    </div>
                )}
            </div>
        )

    else 
        return (
            <div className="grid grid-cols-9 max-[1000px]:grid-cols-6 max-[690px]:grid-cols-3 gap-3 max-[525px]:gap-0 ">
                {spliced_array?.map(item => 
                    <div className={`card col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={item.title}>
                        <div className="top flex items-center">
                            <div className={`avatar rounded-full border-2 border-orange-100 h-[50px] w-[50px] shadow`}>
                                <img src={`${data?.image_endpoint}/${item.image}`} alt="avatar" className="object-cover h-full w-full rounded-full" />
                            </div>
                            <div className="titles px-2" style={{width: "calc(100% - 50px)"}}>
                                <div className=" text-xs text-neutral-600 pops my-1 leading-none">
                                    <i className="bi bi-geo-alt"></i>
                                    <span>{item.location}</span>
                                </div>
                                <div className="font-bold text-sm my-2 leading-none">{item.title}</div>
                                <div className=" text-xs text-neutral-600 pops my-1 leading-none">
                                    <i className="bi bi-stopwatch "></i>
                                    <span className="mx-1">{item.created_at}</span>
                                </div>
                            </div>
                        </div>
                        <p className="pops my-2 text-sm leading-relaxed min-h-[120px]">
                            {item.description.slice(0,250)}{ item.description.length > 250 ? '...' : ''}
                        </p>
                        <Link to={`/job/${encrypt(`${item.id}`)}`} className="btn text-white flex items-center justify-center hover:bg-green-500 bg-green-400 p-2 font-bold rounded-md w-full">View Requirements</Link>

                    </div>
                )}
            </div>
        )
    
}

export default JobGrid;
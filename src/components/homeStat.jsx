import {read} from '../databank';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const HomeStat = () => {

    const { data, isLoading, isError } = read.useTotals();

    if(isLoading || isError || typeof(data?.data) == 'undefined' || Object.keys(data?.data ?? {}).length <= 0) {
        return (
            <div className="grid grid-cols-8 max-[820px]:grid-cols-4 max-[400px]:grid-cols-2 gap-5 max-[525px]:gap-0 p-10 ">
                {[0,0,0,0].map((item, index) => 
                    <div className={`card col-span-2  text-slate-800  bg-opacity-30 max-[525px]:bg-opacity-0 max-[525px]:shadow-none text-center py-10 rounded-md hover:shadow`} key={index}>
                        <div className={`icon octagon text-5xl  text-slate-700 h-[100px] w-[100px] flex items-center justify-center mx-auto shadow`}>
                            <Skeleton height={100} width={100}/>
                        </div>
                        <h3 className="font-black text-md max-[525px]:text-sm pops my-1 leading-none">
                            <Skeleton height={20} width={100} />
                        </h3>
                        <div className="value font-black orb text-3xl max-[525px]:text-xl">
                            <Skeleton height={30} width={150} />    
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const result = data?.data;

    const stats = [
        {
            name: "Jobs Recieved",
            value: result?.jobs,
            icon: "wrench-adjustable-circle",
            color: "bg-orange-100"
        },
    
        {
            name: "Jobs Completed",
            value: result?.completed_jobs,
            icon: "patch-check",
            color: "bg-green-100"
        },
    
        {
            name: "Reviews",
            value: result?.reviews,
            icon: "stars",
            color: "bg-yellow-100"
        },
    
        {
            name: "Employers",
            value: result?.employers,
            icon: "people",
            color: "bg-red-100"
        },
    
    ]

  return (
    <div className="grid grid-cols-8 max-[820px]:grid-cols-4 max-[400px]:grid-cols-2 gap-5 max-[525px]:gap-0 p-10 ">
        {stats?.map(item => 
            <div className={`card col-span-2  text-slate-800 ${item.color} bg-opacity-30 max-[525px]:bg-opacity-0 max-[525px]:shadow-none text-center py-10 rounded-md hover:shadow`} key={item.name}>
                <div className={`icon octagon text-5xl  text-slate-700 ${item.color} h-[100px] w-[100px] flex items-center justify-center mx-auto shadow`}>
                    <i className={`bi bi-${item.icon}`}></i>
                </div>
                <h3 className="font-black text-md max-[525px]:text-sm pops my-1 leading-none">{item.name}</h3>
                <div className="value font-black orb text-3xl max-[525px]:text-xl">{item.value}</div>
            </div>
        )}
    </div>
  )
}

export default HomeStat
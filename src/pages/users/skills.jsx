import { useState } from 'react'
import  { Link, useNavigate}  from "react-router-dom";
import  { ImageBG , Pagination, SearchSkill}  from "../../components/";
import { read } from '../../databank';
import Skeleton from 'react-loading-skeleton';

const Skills = () => {

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const {data, isLoading, isError} = read.useSkills(page);

  return (
    <>
        <ImageBG image="/images/job.png" classname="bg-green-100 bg-opacity-30 text-white rounded-2xl transform scale-95 my-5 overflow-hidden shadow">
            <div className="wrapper backdrop-blur-md h-[260px] flex flex-col text-center justify-center items-center p-3 ">
                <h1 className="capitalize text-9xl font-black max-[835px]:text-8xl">Skills</h1>
                <p className="max-w-[500px] pops my-3 text-sm sm:text-base">Browse our list of skills, find skilled workers with specific skills by clicking on your skill of choice, get jobs done with Pedwuma</p>
            </div>
        </ImageBG>

        <SearchSkill searchCallback={(title) => navigate(`/people/${title}`)} inputclass="text-xl" btnclass="text-xl" classname="mx-auto w-[95%] max-[835px]:transform max-[835px]:scale-95" placeholder="Type your search here..."/>

        <section className="p-10">
            {
                (isLoading || isError) &&

                <div className="items-center text-white text-center justify-items-center grid-box gap-3" style={{"--width": "300px"}}>
                    {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((item, index) =>
                        <div className={`max-w-[300px] card rounded-md overflow-hidden hover:shadow`} key={index}>
                            <div className=" h-[420px]  bg-overlay bg-opacity-30 p-2 flex flex-col justify-end">
                                <Skeleton height={30} />
                                <Skeleton height={150} />
                                <Skeleton height={50} />
                            </div>
                        </div>
                    )}
                </div>
            }
            <div className="items-center text-white text-center justify-items-center grid-box-fit gap-3" style={{"--width": "300px"}}>
                {data && data?.data?.map(item =>
                    <ImageBG image={`/images/${item?.media}`} classname={`min-w-[300px] w-full card rounded-md overflow-hidden hover:shadow`} key={item.title}>
                        <div className=" h-[420px]  bg-overlay bg-opacity-30 p-2 flex flex-col justify-end">
                            <h3 className="font-bold text-xl ">{item.title}</h3>
                            <p className="pops text-sm my-2">
                                {item.description}
                            </p>
                            <Link to={`/people/${item.title}`}className="btn text-white hover:bg-green-500 text-center bg-green-400 font-bold rounded-md w-full">View Skills</Link>
                        </div>
                    </ImageBG>
                )}
            </div>
            <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />
        </section>



    </>
  )
}

export default Skills
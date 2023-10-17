import {useState} from "react"
import { Link } from "react-router-dom"
import  { ImageBG, SearchJob, SearchSkill, Pagination, EmptyBox}  from "../../components/";
import Skeleton from "react-loading-skeleton";
import { encrypt, read } from "../../databank";


const Jobs = () => {
    const [filterPos, setFilterPos] = useState("-top-[200vh]");
    const [page, setPage] = useState(1);
    const [latlng, setLatlng] = useState({
        lat: 0,
        lng: 0,
    });
    if(latlng.lat == 0 && latlng.lng == 0)
    read.ipInfo().then((result) =>{ 
        setLatlng({lat: result.lat, lng: result.lng});
    }).catch(() => setLatlng({lat: 0, lng: 0}));

    

    const [skill, setSkill] = useState('');
    const [searchType, setSearchType] = useState('recent');

    const {data, isLoading, isError} = read.useJobs(page, searchType, skill, latlng.lat, latlng.lng);

    const skills = read.useSkills();



    return (
        <>
            <ImageBG image="/images/vector_workers.png" classname="bg-green-100 bg-opacity-30 text-slate-800 rounded-2xl transform scale-95 my-5 overflow-hidden shadow">
                <div className="wrapper backdrop-blur-md h-[260px] flex flex-col text-center justify-center items-center p-3 ">
                    <h1 className="capitalize text-5xl font-black text-slate-900 max-[835px]:text-5xl">SEARCH FOR JOBS IN YOUR AREA</h1>
                    <p className="max-w-[500px] pops my-3 text-sm sm:text-base">Are you a skilled worker? browse our list of jobs, send proposals and start making money on pedwuma today!</p>
                    {/* <p className="max-w-[500px] pops my-3 text-sm sm:text-base">Are you a skilled worker? browse our list of jobs, send proposals and start making money on pedwuma today!</p> */}
                </div>
            </ImageBG>

            <SearchJob />
            

            <section className="p-5 sm:p-10">

                <button className="bg-green-400 rounded-md p-4 py-2 text-white max-[1000px]:block hidden" onClick={() => setFilterPos("top-1/2")}>Filters</button>

                <div className="grid grid-cols-8 max-[1000px]:block gap-7 min-h-screen">

                    <div className="col-span-6 shadow-xl rounded-xl overflow-hidden h-min">
                        <EmptyBox title={`No "${skill}" Jobs Yet`} text="There are no jobs available for this skill, please check again later" load={(typeof(data?.data?.length) !== 'undefined' && data?.data?.length <= 0)}/>
                        {(isLoading || isError) && [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((item, index) =>    
                        <div className="card grid max-[760px]:block grid-cols-8 gap-3 min-h-[200px] p-5 border-b " key={index}>
                            <div className="left col-span-6">
                                <div className="top">
                                    <div className="location text-neutral-500 flex gap-1">
                                        <i className="bi bi-geo-alt"></i>
                                        <span className="pops text-extrabold text-sm"><Skeleton height={12} width={100}/></span>
                                    </div>

                                    <h3 className="font-bold text-3xl text-neutral-800"><Skeleton height={42}/></h3>

                                    <div className="duration-type pops text-extrabold text-neutral-600 text-sm flex gap-1">
                                    <i className="bi bi-coin"></i> <Skeleton height={12} width={100}/> | <i className="bi bi-stopwatch"></i> <Skeleton height={12} width={100}/>
                                    </div>
                                </div>

                                <p className="my-5 pops text-neutral-800"> <Skeleton height={150}/></p>

                                <div className="skills flex items-center flex-wrap gap-2">
                                    {[0,0,0,0,0].map(skill => 
                                        <div className="skill  bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill}>
                                            <Skeleton height={30} width={100}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Skeleton containerClassName="col-span-2" className="h-full"/>
                        </div>
                        )}
                        {data && data?.data?.map((item, index) => 
                            <div className="card grid max-[760px]:block grid-cols-8 gap-3 min-h-[200px] p-5 border-b " key={index}>
                                <div className="left col-span-6">
                                    <div className="top">
                                        <div className="location text-neutral-500">
                                            <i className="bi bi-geo-alt"></i>
                                            <span className="pops text-extrabold text-sm">{item.location}</span>
                                        </div>

                                        <h3 className="font-bold text-3xl text-neutral-800">{item.title}</h3>

                                        <div className="duration-type pops text-extrabold text-neutral-600 text-sm flex gap-1 flex-wrap">
                                        <i className="bi bi-car-front"></i> 
                                        {(latlng.lat == 0 && latlng.lng == 0) && <Skeleton height={10} width={60} /> }
                                        {!(latlng.lat == 0 && latlng.lng == 0) && <span className='pops'> {parseInt(item?.distance)} km from your current location</span> } | <i className="bi bi-stopwatch"></i> Posted 3 hours ago
                                        </div>
                                    </div>

                                    <p className="my-5 pops text-neutral-800">{item.description}</p>

                                    <div className="skills flex items-center flex-wrap gap-2">
                                        {item?.skills?.map(skill => 
                                            <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill?.skill}>
                                                {skill?.skill}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="right grid grid-rows-6 max-[760px]:block max-[760px]:mt-5 col-span-2 rounded-md bg-green-100 bg-opacity-40 overflow-hidden">
                                    <div className="row-span-5 flex flex-col items-center justify-center p-5 text-center">
                                        <div className="price">
                                            <span className="orb">Ghc</span>
                                            <span className="text-4xl font-bold orb">{item.minimum_pay}</span>
                                        </div>

                                        <div className="proposals">
                                            <span className="orb  font-medium">{item.proposals}</span>
                                            <span className="orb px-1">Proposals</span>
                                        </div>
                                    </div>

                                    <Link to={`/job/${encrypt(`${item.id}`)}`} className=" btn text-white hover:bg-green-500 text-center px-3 w-full bg-green-400 underline font-bold text-xs">
                                        View Details
                                    </Link>

                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`col-span-2 shadow-lg rounded-xl overflow-hidden h-min p-5 max-[1000px]:fixed ${filterPos} left-1/2 max-[1000px]:transform max-[1000px]:-translate-x-1/2 max-[1000px]:-translate-y-1/2 w-full max-[1000px]:h-[100vh] z-20 overflow-y-scroll scrollbar-thin bg-white`}>
                        <div className="flex justify-end items-center">
                            <div className="h-[30px] w-[30px] rounded-md bg-red-500 text-white hidden max-[1000px]:flex items-center justify-center" onClick={() => setFilterPos("-top-[200vh]")}>
                                <i className="bi bi-x-lg"></i>
                            </div>
                        </div>
                        <h2 className="font-bold text-lg">Filters</h2>

                        <select className="w-full p-2 rounded-md my-3 shadow bg-white" name="frequence" onChange={(e) => {setSearchType(e.target.value)}}>
                            <option value="recent">Latest</option>
                            <option value="high">High Budget</option>
                            <option value="low">Low Budget</option>
                        </select>

                        <SearchSkill searchCallback={setSkill}/>

                        <div className="my-5">
                            <div className="font-bold text-lg">Skills/Categories</div>
                            <div className="h-screen overflow-y-scroll scrollbar-thin">
                                <div className={`skill p-2 px-3 my-3 ${skill === '' ? 'bg-green-400 text-white' : 'bg-green-100 bg-opacity-40'}  text-neutral-600 font-bold rounded-md`} onClick={() => setSkill('')}>All Skills</div>

                                {skills?.data?.data?.map( (skillss, index) => 
                                    <div className={`skill p-2 px-3 my-3 ${skillss.title === skill ? 'bg-green-400 text-white' : 'bg-green-100 bg-opacity-40'}  text-neutral-600 font-bold rounded-md`} key={index} onClick={() => setSkill(skillss.title)}>{skillss.title}</div>
                                )}

                                {(skills.isLoading || skills.isError) &&
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((item, index) => <Skeleton height={40} key={index}/> )
                                }
                            </div>
                            
                        </div>

                    </div>
                </div>

                <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />


            </section>

        </>
    )
}

export default Jobs
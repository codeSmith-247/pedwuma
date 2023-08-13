import {useState} from "react"
import  { Link }  from "react-router-dom";
import  { ImageBG , Nav, Search, Pagination}  from "../../components/";


const skills = [
    "Plumbing",
    "Electrical Work",
    "Carpentry",
    "Web Development",
    "Graphic Design",
    "Data Analysis",
    "Content Writing",
    "Mobile App Development",
    "Photography",
    "Video Editing",
    "Social Media Marketing",
    "UI/UX Design",
    "Project Management",
    "Digital Marketing",
    "Illustration",
    "Animation",
    "Copywriting",
    "SEO",
  ];

const SkilledPeople = () => {
    const [filterPos, setFilterPos] = useState("-top-[200vh]");

    return (
        <>
            <Nav />
            <ImageBG image="/images/job2.png" classname="bg-green-100 bg-opacity-30 text-slate-800 rounded-2xl transform scale-95 my-5 overflow-hidden shadow">
                <div className="wrapper backdrop-blur-3xl h-[190px] flex flex-col text-center justify-center items-center p-3 ">
                    <h1 className="capitalize text-9xl font-black text-white max-[835px]:text-8xl">CARPAINTRY</h1>
                </div>
            </ImageBG>

            <Search classname="mx-auto w-[95%] max-[835px]:transform max-[835px]:scale-95" placeholder="Type your search here..."/>

            <section className="p-5 sm:p-10">

                <button className="bg-green-400 rounded-md p-4 py-2 text-white max-[1000px]:block hidden" onClick={() => setFilterPos("top-1/2")}>Filters</button>

                <div className="grid grid-cols-8 max-[1000px]:block gap-7 min-h-screen">

                    <div className="col-span-6 shadow-xl rounded-xl overflow-hidden h-min">
                        {[0,0,0,0,0,0,0,0].map(item => 
                            <div className="card grid max-[760px]:block grid-cols-10 gap-3 min-h-[200px] p-5 border-b " key={item}>
                                <ImageBG image="/images/nurse.avif" classname="max-[760px]:mb-3 left col-span-2 overflow-hidden rounded-md " min={false}>
                                    <div className="backdrop-blur-2xl h-full w-full flex items-center justify-center py-3">
                                        <div className="image h-[190px] w-[130px] rounded-md overflow-hidden">
                                            <img className="h-full w-full object-cover" src="/images/nurse.avif" alt="avatar" />
                                        </div>
                                    </div>
                                </ImageBG>
                                <div className="middle col-span-6">
                                    <div className="top">
                                        <div className="location text-neutral-500">
                                            <i className="bi bi-geo-alt"></i>
                                            <span className="pops text-extrabold text-sm">Accra, Spintex Ghana commercial bank</span>
                                        </div>

                                        <h3 className="font-bold text-3xl text-neutral-800">The titel for the job goes here</h3>

                                        <div className="duration-type pops text-extrabold text-neutral-600 text-sm">
                                        <i className="bi bi-coin"></i> Fixed Price | <i className="bi bi-stopwatch"></i> Posted 3 hours ago
                                        </div>
                                    </div>

                                    <p className="my-5 pops text-neutral-800 text-sm"> Thi is going to contain a breif description about the job nothing much nothing less you get it? Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                                    <div className="skills flex items-center flex-wrap gap-2">
                                        {[0,0,0,0,0].map(skill => 
                                            <div className="skill p-2 px-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold text-xs rounded-md" key={skill}>
                                                skill name here
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="right grid grid-rows-6 max-[760px]:block max-[760px]:mt-5 col-span-2 rounded-md bg-green-100 bg-opacity-40 overflow-hidden">
                                    <div className="row-span-5 flex flex-col items-center justify-center p-5 text-center">
                                        <div className="price">
                                            <span className="orb">Ghc</span>
                                            <span className="text-3xl font-bold orb">123</span>
                                        </div>

                                        <div className="proposals">
                                            <span className="orb px-1">minimum pay</span>
                                        </div>
                                    </div>

                                    <Link to="/person" className="p-2 px-3 w-full bg-green-400 text-white underline font-bold text-xs text-center self-end">
                                        View Details
                                    </Link>

                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`col-span-2 shadow-lg rounded-xl overflow-hidden h-min p-5 max-[1000px]:fixed ${filterPos} left-1/2 max-[1000px]:transform max-[1000px]:-translate-x-1/2 max-[1000px]:-translate-y-1/2 w-full max-[1000px]:h-[100vh] z-20 overflow-y-scroll bg-white`}>
                        <div className="flex justify-end items-center">
                            <div className="h-[30px] w-[30px] rounded-md bg-red-500 text-white hidden max-[1000px]:flex items-center justify-center" onClick={() => setFilterPos("-top-[200vh]")}>
                                <i className="bi bi-x-lg"></i>
                            </div>
                        </div>
                        <h2 className="font-bold text-lg">Filters</h2>

                        <select className="w-full p-2 rounded-md my-3 shadow bg-white" name="frequence">
                            <option value="latest">Latest</option>
                            <option value="popular">Popular</option>
                            <option value="high">High Budget</option>
                            <option value="low">Low Budget</option>
                        </select>

                        <Search classname="w-full h-[45px] my-3" inputclassName="text-sm" btnnclassName="text-sm w-[45px]" placeholder="search for a skill here..."/>

                        <div className="my-5">
                            <div className="font-bold text-lg">Skills/Categories</div>

                            {skills.map( skill => 
                                <div className="skill p-2 px-3 my-3 bg-green-100 bg-opacity-40 text-neutral-600 font-bold rounded-md" key={skill}>{skill}</div>
                            )}
                            
                        </div>

                    </div>
                </div>

                <Pagination />

            </section>

        </>
    )
}

export default SkilledPeople;
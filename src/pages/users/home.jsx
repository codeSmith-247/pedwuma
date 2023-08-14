import  { Link }  from "react-router-dom";
import  { ImageBG , Nav, Search}  from "../../components/";

const stats = [
    {
        name: "Jobs Recieved",
        value: 112345,
        icon: "wrench-adjustable-circle",
        color: "bg-orange-100"
    },

    {
        name: "Jobs Completed",
        value: 52345,
        icon: "patch-check",
        color: "bg-green-100"
    },

    {
        name: "Reviews",
        value: 234545,
        icon: "stars",
        color: "bg-yellow-100"
    },

    {
        name: "Employers",
        value: 2345,
        icon: "people",
        color: "bg-red-100"
    },

]

const Home = () => {

    return (
        <>
            <ImageBG classname="bg-orange-100 bg-opacity-30 text-slate-800">
                <div className="wrapper backdrop-blur-3xl">
                    <Nav />
                    <div className="grid grid-cols-5 min-h-[85vh] max-[950px]:min-h-[500px]">
                        <div className="col-span-3 max-[670px]:col-span-5 flex flex-col justify-center p-10">
                            <h1 className="capitalize text-5xl font-black text-slate-900 max-[835px]:text-3xl">experience top-notch service from skilled individuals</h1>
                            <p className="max-w-[400px] pops my-3">Elevate with expert services tailored for you, trust our dedicated proffessionals for top-tier quality and satisfaction</p>
                            <Search />
                        </div>
                        <div className="col-span-2 max-[670px]:col-span-5 flex flex-col justify-center items-center pr-10 max-[670px]:pr-0">
                            <div className="image h-full w-full max-[670px]:h-[90%] max-[670px]:w-[90%] tranform scale-110">
                                <img className="object-contain h-full w-full" src="/images/workers.png" alt="hero image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </ImageBG>

            <section>
                <div className="grid grid-cols-8 max-[820px]:grid-cols-4 max-[400px]:grid-cols-2 gap-5 max-[525px]:gap-0 p-10 ">
                    {stats.map(item => 
                        <div className={`card col-span-2  text-slate-800 ${item.color} bg-opacity-30 max-[525px]:bg-opacity-0 max-[525px]:shadow-none text-center py-10 rounded-md hover:shadow`} key={item.name}>
                            <div className={`icon octagon text-5xl  text-slate-700 ${item.color} h-[100px] w-[100px] flex items-center justify-center mx-auto shadow`}>
                                <i className={`bi bi-${item.icon}`}></i>
                            </div>
                            <h3 className="font-black text-md max-[525px]:text-sm pops my-1 leading-none">{item.name}</h3>
                            <div className="value font-black orb text-3xl max-[525px]:text-xl">{item.value}</div>
                        </div>
                    )}
                </div>
            </section>

            <section className="p-10">
                <h1 className="capitalize text-3xl font-bold text-slate-900 max-[835px]:text-3xl py-5  border-b">Popular Skills <i className="bi bi-gear"></i></h1>
                <p className="my-5 pops max-w-[500px] text-xs">Our platform boasts a vast, handpicked community of individuals proficient in a wide array of skills. From technical wizards to creative maestros, our talent pool is a treasure trove of expertise waiting to elevate your projects.</p>
                
                <div className="w-screen overflow-x-scroll px-2">
                    <div className="w-max flex items-center gap-5 text-white text-center justify-items-center">
                        {stats.map(item =>
                            <ImageBG image={`/images/carpenter.jpg`} classname={`max-w-[300px] card col-span-3 rounded-md overflow-hidden hover:shadow`} key={item.name}>
                                <div className=" h-[420px]  bg-overlay bg-opacity-30 p-2 flex flex-col justify-end">
                                    <h3 className="font-bold text-xl ">CARPAINTRY</h3>
                                    <p className="pops text-sm my-2">
                                        With a passion for transforming wood into functional artistry, dedicated to delivering top-quality workmanship that exceeds expectations.
                                    </p>
                                    <Link to="/people" className="btnn bg-green-400 p-2 font-bold rounded-md w-full">View Skills</Link>
                                </div>
                            </ImageBG>
                        )}
                    </div>
                </div>

            </section>

            <ImageBG classname="bg-green-100 bg-opacity-30 text-slate-800">
                <div className="wrapper backdrop-blur-3xl">
                    <div className="grid grid-cols-5 min-h-[85vh] max-[950px]:min-h-[500px] justify-items-center">
                        <div className="col-span-2 max-[670px]:col-span-5 flex flex-col justify-center items-center pr-10 max-[670px]:pr-0">
                            <div className="image h-full w-full max-[670px]:h-[90%] max-[670px]:w-[90%]">
                                <img className="object-contain h-full w-full" src="/images/shield_guy.png" alt="hero image"/>
                            </div>
                        </div>
                        <div className="col-span-3 max-[670px]:col-span-5 flex flex-col justify-center p-10">
                            <h1 className="capitalize text-5xl font-black text-slate-900 max-[835px]:text-3xl">your security is our <br /> number one priority</h1>
                            <p className="max-w-[400px] pops mt-3"> <i className="bi bi-check-circle text-2xl"></i> Elevate with expert services tailored for you, trust our dedicated proffessionals for top-tier quality and satisfaction</p>
                            <p className="max-w-[400px] pops mt-3"> <i className="bi bi-check-circle text-2xl"></i> Elevate with expert services tailored for you, trust our dedicated proffessionals for top-tier quality and satisfaction</p>
                        </div>
                    </div>
                </div>
            </ImageBG>

            <section className="p-10 ">
                <h1 className="capitalize text-3xl font-bold text-slate-900 max-[835px]:text-3xl py-5  border-b mb-5">Recent Jobs <i className="bi bi-wrench-adjustable-circle"></i></h1>
                
                <div className="grid grid-cols-9 max-[1000px]:grid-cols-6 max-[690px]:grid-cols-3 gap-3 max-[525px]:gap-0 ">
                    {[0, 0, 0, 0, 0, 0].map(item => 
                        <div className={`card col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={item}>
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
                                        <span className="mx-1">2 days ago</span>
                                    </div>
                                </div>
                            </div>
                            <p className="pops my-2 text-sm">
                                This is where a short description for the posted job is displayed I hope to use AI to shorten a description
                                to a specific set of words  to a specific set of words to a specific set of words
                            </p>
                            <button className="btnn bg-green-400 p-2 font-bold rounded-md w-full">View Skills</button>

                        </div>
                    )}
                </div>
            </section>

            <section className="p-10  text-slate-800">
                <div className="wrapper backdrop-blur-3xl bg-red-100 bg-opacity-30 rounded-md">
                    <div className="grid grid-cols-4 min-h-[35vh] justify-items-center">
                        
                        <div className="col-span-2 max-[670px]:col-span-5 flex flex-col justify-center p-5">
                            <h1 className="capitalize text-5xl font-black text-slate-900 max-[835px]:text-3xl">testimonials from <br /> some of our clients</h1>
                        </div>

                        <div className="col-span-2 max-[670px]:col-span-5 flex flex-col justify-center items-center px-5">
                            <div className="image h-full w-full max-[670px]:h-[95%] max-[670px]:w-[95%]">
                                <img className="object-contain h-full w-full" src="/images/happy_lady.png" alt="hero image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-10 py-0 pb-10">
                <div className="w-screen overflow-x-scroll px-2">
                    <div className="w-max flex items-center gap-5 ">
                        {[0, 0, 0, 0, 0, 0].map(item => 
                            <div className={`card w-[350px] col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={item}>
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
                    </div>
                </div>

            </section>
        </>
    );
}

export default Home;

import  { ImageBG , Nav, SearchJob, SkillsScroll, ReviewsScroll, JobGrid, HomeStat }  from "../../components/";

// import { read } from '../../databank';



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
                            <SearchJob  classname="" />
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
                <HomeStat />
            </section>

            <section className="p-10">
                <h1 className="capitalize text-3xl font-bold text-slate-900 max-[835px]:text-3xl py-5  border-b">Popular Skills <i className="bi bi-gear"></i></h1>
                <p className="my-5 pops max-w-[500px] text-xs">Our platform boasts a vast, handpicked community of individuals proficient in a wide array of skills. From technical wizards to creative maestros, our talent pool is a treasure trove of expertise waiting to elevate your projects.</p>
                
                <SkillsScroll />

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
                
                <JobGrid />
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
                <ReviewsScroll />
            </section>
        </>
    );
}

export default Home;
// import React from 'react'
import  { Link }  from "react-router-dom";
import  { ImageBG , Search, Pagination}  from "../../components/";

const Skills = () => {
  return (
    <>
        <ImageBG image="/images/job.png" classname="bg-green-100 bg-opacity-30 text-white rounded-2xl transform scale-95 my-5 overflow-hidden shadow">
            <div className="wrapper backdrop-blur-md h-[260px] flex flex-col text-center justify-center items-center p-3 ">
                <h1 className="capitalize text-9xl font-black max-[835px]:text-8xl">Skills</h1>
                <p className="max-w-[500px] pops my-3 text-sm sm:text-base">Elevate with expert services tailored for you, trust our dedicated proffessionals for top-tier quality and satisfaction</p>
            </div>
        </ImageBG>

        <Search classname="mx-auto w-[95%] max-[835px]:transform max-[835px]:scale-95" placeholder="Type your search here..."/>

        <section className="p-10">
            <div className="items-center text-white text-center justify-items-center grid-box" style={{"--width": "300px"}}>
                {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(item =>
                    <ImageBG image={`/images/carpenter.jpg`} classname={`max-w-[300px] card rounded-md overflow-hidden hover:shadow`} key={item.name}>
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
        </section>

        <Pagination classname="mb-10" />

    </>
  )
}

export default Skills
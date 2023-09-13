// import React from 'react'
import  {Pagination}  from "../../components";

const Portfolio = () => {
  return (
    <section className="p-10 pt-0">
        <div className="grid-box-fit rounded-md overflow-hidden gap-3" style={{"--width": "320px"}}>
            {[0,0,0,0,0,0,0,0].map((item, index) => 
                <div className="card h-[450px] p-2 shadow rounded-md transform hover:scale-105 hover:shadow-md" key={index}>
                    <div className="image h-1/2 overflow-hidden rounded-md">
                        <img className="object-cover h-full w-full" src="/images/help.jpeg" alt="portfolio image" />
                    </div>
                    <div className="content text-neutral-700 p-2">
                        <div className="title font-bold text-xl text-neutral-800">This is a short descriptive title</div>
                        <p className="pops text-sm py-2">This is where you a short description about the job done is going to be placed nothing too much just a fiew nice and convincing words, yep convincing</p>
                        <div className="flex items-center justify-between pb-2">
                            <div className="div font-bold mr-2">
                                <span>Budget: </span>
                                <span className="orb">Ghc <span className="text-xl orb ">2345</span></span>
                            </div>

                            <div className="div font-bold">
                                <span>Duration: </span>
                                <span className="orb"><span className="text-xl orb ">6</span> Months</span>
                            </div>

                        </div>
                        <button className="btn flex items-center justify-center  text-center bg-green-400 hover:bg-green-500 border-2 border-green-500 p-2 px-3 w-full rounded-md text-white" onClick={()=>window.my_modal_3.showModal()}>View Images</button>
                    </div>
                </div>
            )}
        </div>
        <Pagination />

        <dialog id="my_modal_3" className="modal">
            <div method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black" onClick={()=>window.my_modal_3.close()}>✕</button>
                <div className="carousel w-full h-[400px]">
                    <div id="item1" className="carousel-item w-full">
                        <img src="/images/nurse.avif" className="w-full object-contain h-full" />
                    </div> 
                    <div id="item2" className="carousel-item w-full">
                        <img src="/images/man.avif" className="w-full object-contain h-full" />
                    </div> 
                    <div id="item3" className="carousel-item w-full">
                        <img src="/images/help.jpeg" className="w-full object-contain h-full" />
                    </div> 
                    <div id="item4" className="carousel-item w-full">
                        <img src="/images/job.png" className="w-full object-contain h-full" />
                    </div>
                </div> 
                <div className="flex justify-center w-full py-2 gap-2">
                    <a href="#item1" className="btn btn-xs text-black">1</a> 
                    <a href="#item2" className="btn btn-xs text-black">2</a> 
                    <a href="#item3" className="btn btn-xs text-black">3</a> 
                    <a href="#item4" className="btn btn-xs text-black">4</a>
                </div>
            </div>
        </dialog>
    </section>
  )
}

export default Portfolio
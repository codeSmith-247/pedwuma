import { ImageBG, Pagination } from "../../components/"

const Reviews = () => {
  return (
    <>
        <section className="p-10 pt-0">
            {[0,0,0,0,0,0,0,0,0].map((item, index) => 
                <div key={index} className="card grid max-[760px]:block grid-cols-10 gap-3 min-h-[200px] p-5 border-b max-w-[900px]">
                    <ImageBG image="" classname="max-[760px]:mb-3 left col-span-2 overflow-hidden rounded-md " min={false}>
                        <div className="backdrop-blur-2xl h-full w-full flex items-center justify-center py-3">
                            <div className="image h-[130px] w-[130px] rounded-full overflow-hidden">
                                <img className="h-full w-full object-cover" src="/images/nurse.avif" alt="avatar" />
                            </div>
                        </div>
                    </ImageBG>
                    <div className="right col-span-8 py-5">
                        <div className="top">
                            <div className="location text-yellow-400 flex gap-2 items-center">
                                {[0,0,0,0,0].map((item, index) => 
                                    <i className="bi bi-star-fill" key={index}></i>
                                )}
                            </div>

                            <h3 className="font-bold text-2xl text-neutral-800">The titel for the job goes here</h3>

                            <div className="duration-type pops text-extrabold text-neutral-600 text-sm">
                            <i className="bi bi-coin"></i> Fixed Price | <i className="bi bi-stopwatch"></i> Posted 3 hours ago
                            </div>
                        </div>

                        <p className="my-5 pops text-neutral-800 text-sm"> Thi is going to contain a breif description about the job nothing much nothing less you get it? Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                    </div>
                </div>
            )}
            <Pagination />
        </section>
    </>
  )
}

export default Reviews
import  {  SideScroll }  from "./";

import {read} from '../databank';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReviewsScroll = () => {
    const { data, isLoading, isError } = read.useJobs();

    const testimonials = [
        {
          location: "New York",
          name: "Sarah J.",
          image: "sarah.jpg",
          testimonial: "Pedwuma has been a game-changer for my freelance business. The platform connects me with amazing clients and provides a seamless experience!",
          project: "Marketing Campaign"
        },
        {
          location: "Los Angeles",
          name: "Michael R.",
          image: "michael.jpg",
          testimonial: "I never thought finding talented freelancers could be this easy. Pedwuma has a pool of exceptional professionals!",
          project: "Website Design"
        },
        {
          location: "London",
          name: "Emily M.",
          image: "emily.jpg",
          testimonial: "Pedwuma helped me discover hidden talents. The quality of work I received exceeded my expectations!",
          project: "Logo Redesign"
        },
        {
          location: "San Francisco",
          name: "David L.",
          image: "david.jpg",
          testimonial: "Pedwuma is a true gem for freelancers and businesses alike. The process is straightforward, and the results are outstanding!",
          project: "App Development"
        },
        {
          location: "Chicago",
          name: "Jennifer S.",
          image: "jennifer.jpg",
          testimonial: "I've been using Pedwuma for years, and it consistently delivers top-notch service. Kudos to the team!",
          project: "Content Writing"
        },
        {
          location: "Toronto",
          name: "Alex B.",
          image: "alex.jpg",
          testimonial: "Pedwuma exceeded my expectations. The quality of work and the professionalism of the freelancers are unmatched!",
          project: "Social Media Management"
        }
    ];

    if(isLoading || isError || typeof(data?.data?.map) == 'undefined' || data?.data?.length <= 0) {
        return (
            <SideScroll>
                {[0, 0, 0, 0, 0, 0].map((item, index) => 
                    <div className={`card w-[350px] col-span-3  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={index}>
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
                    </div>
                )}
            </SideScroll>
        );
    }

  return (
    <SideScroll>
        {data && testimonials.map((item, index) => 
            <div className={`card w-[350px] col-span-3 flex-grow h-full  text-slate-800 bg-white max-[525px]:bg-opacity-0 max-[525px]:shadow-none p-3 rounded-md shadow`} key={index}>
                <div className="top flex items-center">
                    <div className={`avatar rounded-full border-2 border-orange-100 h-[50px] w-[50px] shadow`}>
                        <img src="/images/man.avif" alt="avatar" className="object-cover h-full w-full rounded-full" />
                    </div>
                    <div className="titles px-2" style={{width: "calc(100% - 50px)"}}>
                        <div className=" text-xs text-neutral-600 pops my-1 leading-none">
                            <i className="bi bi-geo-alt"></i>
                            <span>{item.location}</span>
                        </div>
                        <div className="font-bold text-sm my-2 leading-none">{item.name}</div>
                        <div className=" text-xs text-neutral-600 pops my-1 leading-none">
                            <i className="bi bi-stopwatch "></i>
                            <span className="mx-1">{item.project}</span>
                        </div>
                    </div>
                </div>
                <p className="pops my-2 text">
                    {item.testimonial}
                </p>
            </div>
        )}
    </SideScroll>
  )
}

export default ReviewsScroll
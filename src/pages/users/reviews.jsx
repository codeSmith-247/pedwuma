import { useState } from 'react';
import { ImageBG, Pagination, EmptyBox } from "../../components/";
import { decrypt, timeAgo } from "../../databank/";
import { useParams } from "react-router-dom";

import { read } from '../../databank';
import Skeleton from 'react-loading-skeleton';

const Reviews = () => {
    const [ page, setPage ] = useState(1);

    const { id } = useParams();
    const { data, isLoading, isError } = read.useSkilledReviews(decrypt(id), page);
    
    console.log(data);

  return (
    <>
        <section className="p-10 pt-0">
            {data && data?.data?.map((item, index) => 
                <div key={index} className="card grid max-[760px]:block grid-cols-10 gap-3 min-h-[200px] p-5 border-b max-w-[900px]">
                    <ImageBG image="" classname="max-[760px]:mb-3 left col-span-2 overflow-hidden rounded-md " min={false}>
                        <div className="backdrop-blur-2xl h-full w-full flex items-center justify-center py-3">
                            <div className="image h-[130px] w-[130px] rounded-full overflow-hidden">
                                <img className="h-full w-full object-cover" src={data?.image_endpoint + '/' + item?.image} alt="avatar" />
                            </div>
                        </div>
                    </ImageBG>
                    <div className="right col-span-8 py-5">
                        <div className="top">
                            <div className="location text-yellow-400 flex gap-2 items-center">
                                {Array.from({length: item?.rank}, (item, index) => 
                                    <i className="bi bi-star-fill" key={index}></i>
                                )}
                            </div>

                            <h3 className="font-bold text-2xl text-neutral-800">{item?.name}</h3>

                            <div className="duration-type pops text-extrabold text-neutral-600 text-sm">
                                <i className="bi bi-stopwatch"></i> Posted {timeAgo(item?.updated_at)}
                            </div>
                        </div>

                        <p className="my-5 pops text-neutral-800 text-sm">{item?.review}</p>

                    </div>
                </div>
            )}

            {
                (isLoading || isError ) && 
                <div className="card grid max-[760px]:block grid-cols-10 gap-3 min-h-[200px] p-5 border-b max-w-[900px]">
                    <div className="max-[760px]:mb-3 left col-span-2 overflow-hidden rounded-md " min={false}>
                        <div className="backdrop-blur-2xl h-full w-full py-3">
                            <Skeleton className="h-full w-full" />
                        </div>
                    </div>
                    <div className="right col-span-8 py-5">
                        <div className="top">
                            <div className="location text-gray-400 flex gap-2 items-center">
                                {[0,0,0,0,0].map((item, index) => 
                                    <i className="bi bi-star-fill" key={index}></i>
                                )}
                            </div>

                            <h3 className="font-bold text-2xl text-neutral-800">
                                <Skeleton height={40} className='w-full' />
                            </h3>

                            <div className="duration-type pops text-extrabold text-neutral-600 text-sm">
                                <Skeleton height={10} className='w-full' />
                            </div>
                        </div>

                        <p className="my-5 pops text-neutral-800 text-sm"> 
                            <Skeleton height={70} className='w-full' />
                        </p>

                    </div>
                </div>
            }

            <EmptyBox load={typeof(data?.data) !== 'undefined' && (typeof(data?.data[0]) == 'undefined' || (data?.data?.length <= 0 && page <= 1)) && !(isLoading || isError) } title="No Reviews Yet" text="" />
            <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />

        </section>
    </>
  )
}

export default Reviews
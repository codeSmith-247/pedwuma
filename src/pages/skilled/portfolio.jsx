import { useState } from 'react'
import AddPortfolio from "./addPortfolio";
import EditPortfolio from "./editPortfolio";
import { read } from '../../databank';
import { EmptyBox, Pagination } from '../../components';
import Skeleton from 'react-loading-skeleton';

const Portfolio = () => {

    const { data, isLoading, isError } = read.usePortfolios();

    const [ editId, setEditId ] = useState(null);
    
    const [page, setPage] = useState(1);

    let group_of_four = [[], [], [], []];

    if(data && data?.data) {
        
        let counter = 0;
        let init_count = 0;

        data?.data?.forEach((item, index) => {

            let count = index + 1;

            group_of_four[counter].push(item);
            counter++;

            if(count % 4 == 0) {
                counter = init_count
            }

        })
    }

    const triggerEdit = (id) => {
        setEditId(id);
        window.edit_portfolio.showModal();
    }

    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const handleSearch = (e) => {

        setSearch(e.target.value);
        setSearchResult([]);
        setSearchLoading(true);

        if (search.replaceAll(' ', '') === '') {
            setSearchLoading(false);
            return false;
        }

        read.searchPortfolios(e.target.value).then((response) => {
            console.log('search_response', response, 'search ', e.target.value);
            setSearchLoading(false);

            if (response?.data?.status !== 'success') return false;

            // console.log(response?.data);

            setSearchResult(response?.data);
        })
    }

  return (
    <>
        <h2 className="font-bold text-2xl mb-3">Your Portfolio</h2>

        <div className="grid grid-cols-10 gap-5 mb-5">
            
                <div className="col-span-8 flex gap-2 relative">
                    <input type="text" placeholder="Type here" className="input input-bordered w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400 " onInputCapture={handleSearch} />
                    <button className="btn w-[50px] h-[40px] flex items-center justify-center bg-green-400 hover:bg-green-500 text-xl text-white">
                        <i className="bi bi-search"></i>
                    </button>

                    <div className="results absolute top-full left-0 w-full h-max-[500px] overflow-y-scroll bg-white shadow cursor-pointer rounded mt-1 z-50">
                        {searchLoading && <div className="text-center">
                            <span className="loading loading-bars loading-lg text-green-200"></span>
                        </div>}

                        {
                            (searchResult?.data?.length <= 0 && search.replaceAll(' ', '') !== '' && !searchLoading) &&
                            <div className="text-center pops p-3 full-w bg-orange-100  bg-opacity-50">No Results found for {search}</div>
                        }

                        {
                            searchResult?.data?.map((item, index) =>
                                <div onClick={() => triggerEdit(item.id)} className="result flex items-center p-1 bg-orange-100 hover:bg-green-100  bg-opacity-50 max-h-[300px] overflow-y-scroll" key={index}>
                                    {/* <img src={(item.image !== '' && item.image !== null)? `${searchResult.image_endpoint}/${item.image}` : "/images/avatar.gif"} className="h-[45px] w-[45px] rounded-full" /> */}
                                    <div className="ml-2">
                                        <p className="pops ">{item.title}</p>
                                        <div className="flex items-center text-sm ">
                                            
                                            <span className='orb'> <span className="orb text-xs">Ghc</span> {item.budget}</span>
                                            <span className='orb'>, {item.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

            <button className="btn text-white col-span-2 bg-green-400 hover:bg-green-500" onClick={()=>window.my_modal_2.showModal()}>Add new</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {(isLoading || isError) && group_of_four.map((item, index) => 
                
                <div className="grid gap-4" key={index}>
                    {Array.from({length: 5}, (item, index) => 
                        <Skeleton height={100 + (15 * index)} />
                    )}
                </div>

            )}

            {data && group_of_four.map((item, index) => 
            
                <div className="grid gap-4" key={index}>
                    {item.map((item, index) => 
                        <div key={index} className="relative h-max overflow-hidden">
                            <img className="h-auto max-w-full rounded-lg" src={`${data?.image_endpoint}/${item?.media}`} />
                            <div className="btn-box absolute bottom-0 right-0 p-2">
                            <button onClick={() => triggerEdit(item?.id)} className="btn btn-sm flex items-center justify-center bg-orange-400 hover:bg-orange-500">
                                <i className="bi bi-pencil-square text-white"></i>
                            </button>
                            </div>
                        </div>
                    )}
                </div>

            )}


        </div>

        <EmptyBox load={typeof(data?.data) !== 'undefined' && (typeof(data?.data[0]) == 'undefined' || (data?.data?.length <= 0 && page <= 1)) && !(isLoading || isError) } title="Empty Portfolio" text="Click the 'Add New' button to add a new item to your portfolio" />
        <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />

        <EditPortfolio id={editId} />


        <AddPortfolio />
    </>
  )
}

export default Portfolio
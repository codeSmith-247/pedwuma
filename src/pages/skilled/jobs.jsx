// import { Search } from "../../components/"
import {useState} from 'react';
import { useNavigate }  from 'react-router-dom';
import { read, create }  from '../../databank';
import { TableLoading, EmptyBox, Pagination }  from '../../components';

const Jobs = () => {
    
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const {data, isLoading, isError} = read.useSkilledJobs(page, searchType);

    const handleEdit = (id) => {
        create.setItem('job_id', `${id}`);
        navigate('/chat');
    }

    const handleSearch = () => {
        setSearchResult([]);
        setSearchLoading(true);

        if(search.replaceAll(' ', '') === '') {
            setSearchLoading(false);
            return false;
        }

        read.searchSkilledJobs(search).then( (response) => {
            // console.log('search_response', response);
            setSearchLoading(false);

            if(response?.data?.status !== 'success')  return false;

            // console.log(response?.data);

            setSearchResult(response?.data);
        })
    }

    // console.log(data);

    return (
      <>
        <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-2xl mb-3">Your Jobs</h2>
        </div>
        <div className="grid grid-cols-10 gap-5 mb-5">
            
            <div className="col-span-8 flex gap-2 relative">
                <input type="text" placeholder="Type here" className="input input-bordered w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400 " onChange={(input_event) => {setSearch(input_event.target.value,handleSearch())}}/>
                <button className="btn w-[50px] h-[40px] flex items-center justify-center bg-green-400 hover:bg-green-500 text-xl text-white">
                    <i className="bi bi-search"></i>
                </button>

                <div className="results absolute top-full left-0 w-full bg-white shadow cursor-pointer rounded mt-1 z-50">
                    {searchLoading && <div className="text-center">
                        <span className="loading loading-bars loading-lg text-green-200"></span>
                    </div>}

                    {
                        (searchResult?.data?.length <= 0 && search.replaceAll(' ', '') !== '' && !searchLoading) &&
                        <div className="text-center pops p-3 full-w bg-orange-100  bg-opacity-50">No Results found for {search}</div>
                    }

                    {
                        searchResult?.data?.map((item, index) => 
                            <div onClick={()=>handleEdit(item.id)} className="result flex items-center p-1 bg-orange-100 hover:bg-green-100  bg-opacity-50 max-h-[300px] overflow-y-scroll" key={index}>
                                {/* <img src={(item.image !== '' && item.image !== null)? `${searchResult.image_endpoint}/${item.image}` : "/images/avatar.gif"} className="h-[45px] w-[45px] rounded-full" /> */}
                                <div className="ml-2">
                                    <p className="pops ">{item.title}</p>
                                    <div className="flex items-center text-sm ">
                                        <i className="bi bi-geo-alt"></i>
                                        <span className=''>{item.location}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <select className="select select-bordered w-full max-w-xs col-span-2 outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400" onChange={(change_event) => {setSearchType(change_event.target.value, handleSearch())}}>
                <option value='recent' selected>Recent</option>
                <option value='older'>Older</option>
                <option value='ongoing'>Ongoing</option>
                <option value='suspended'>Suspended</option>
            </select>
            
        </div>

        {!(data?.data?.length <= 0) &&
            <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Minimum Pay
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {data?.data?.map(item => 
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="text-base font-semibold">{item.title}</div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.minimum_pay}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span onClick={() => handleEdit(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <TableLoading load={(isLoading || isError || data?.status === 'error')}/>
                    </table>

                    
                </div>
            </>

        }

        <EmptyBox load={data?.data?.length <= 0 && page <= 1} title='No Jobs Yet' text='Visit the jobs page and add send proposals to recieve new jobs!' link={['Jobs', '/jobs']}/>

        <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && data?.data?.length > 0 ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />
      </>
    )
  }
  
  export default Jobs
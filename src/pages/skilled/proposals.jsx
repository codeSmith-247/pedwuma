// import { Search } from "../../components/"
import { useState } from 'react';
import { read } from '../../databank';
import { TableLoading, EmptyBox, Pagination } from '../../components';

import ProposalModal from './proposalModal';

const Proposals = () => {

    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [proposalId, setProposalId] = useState(2);
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = read.useSkilledProposals(page, searchType);

    const handleEdit = (id) => {
        setProposalId(id);
        window.my_modal_2.showModal();
    }

    const handleSearch = (e) => {

        setSearch(e.target.value);

        setSearchResult([]);
        setSearchLoading(true);

        if (search.replaceAll(' ', '') === '') {
            setSearchLoading(false);
            return false;
        }

        read.searchProposals(e.target.value).then((response) => {
            console.log('search_response', response, 'search ', e.target.value);
            setSearchLoading(false);

            if (response?.data?.status !== 'success') return false;

            // console.log(response?.data);

            setSearchResult(response?.data);
        })
    }

  


    console.log(data);
    
    return (
        <>
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-2xl mb-3">Your Proposals</h2>
                {/* <Link to="/employer/job" className="btn h-[40px] text-white bg-green-400 hover:bg-green-500">New Job</Link> */}
            </div>
            <div className="grid grid-cols-10 gap-5 mb-5">

                <div className="col-span-8 flex gap-2 relative">
                    <input type="text" placeholder="Type here" className="input input-bordered w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400 " onInputCapture={handleSearch} />
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
                                <div onClick={() => handleEdit(item.id)} className="result flex items-center p-1 bg-orange-100 hover:bg-green-100  bg-opacity-50 max-h-[300px] overflow-y-scroll" key={index}>
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

                <select className="select select-bordered w-full max-w-xs col-span-2 outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400" onChange={(change_event) => { setSearchType(change_event.target.value) }}>
                    <option value='recent' selected>Recent</option>
                    <option value='older'>Older</option>
                    <option value='accepted'>Accepted</option>
                    <option value='ongoing'>Ongoing</option>
                    <option value='rejected'>Rejected</option>
                </select>

            </div>

            
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
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
                            {!(typeof(data?.data) == "undefined" || data?.data?.length <= 0 || typeof(data?.data[0]) == 'undefined') && 
                                data?.data?.map && data?.data?.map(item =>
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="text-base font-semibold">
                                            <img src={`${data?.image_endpoint}/${item.image}`} className="object-cover h-[50px] w-[50px] rounded-md" />
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span onClick={() => { handleEdit(item.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Proposal</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <TableLoading load={(isLoading || isError || data?.status === 'error' || typeof(data.data) === 'undefined')} />
                    </table>
                </div>
                
            



                <ProposalModal id={proposalId} />
            


            <EmptyBox load={typeof(data?.data) !== 'undefined' && (typeof(data?.data[0]) == 'undefined' || (data?.data?.length <= 0 && page <= 1)) && !(isLoading || isError) } link={['New Job', '/employer/job']} text="Click the 'New Job' button to create a new job" />

            <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />
        </>
    )
}

export default Proposals
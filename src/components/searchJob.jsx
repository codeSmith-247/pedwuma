import { useState } from 'react';
import { read, encrypt } from '../databank';
import { Link } from 'react-router-dom';
import Search from './search';

const SearchJob = ({classname = "mx-auto"}) => {

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const handleSearch = () => {
        setSearchResult([]);
        setSearchLoading(true);

        if(search.replaceAll(' ', '') === '') {
            setSearchLoading(false);
            return false;
        }

        read.searchJobs(search).then( (response) => {
            // console.log('search_response', response);
            setSearchLoading(false);

            if(response?.data?.status !== 'success')  return false;

            // console.log(response?.data);

            setSearchResult(response?.data);
        })
    }

  return (
    <Search classname={`${classname} w-[95%] relative max-[835px]:transform max-[835px]:scale-95`} placeholder="Enter an address, city , country or job title to narrow your search " onChange={(e) => {setSearch(e.target.value); handleSearch()}} onClick={handleSearch}>
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
                    <Link to={`/job/${encrypt(`${item.id}`)}`} className="result flex items-center p-1 bg-orange-100 hover:bg-green-100  bg-opacity-30 border-b" key={index}>
                        {/* <img src={(item.image !== '' && item.image !== null)? `${searchResult.image_endpoint}/${item.image}` : "/images/avatar.gif"} className="h-[45px] w-[45px] rounded-full" /> */}
                        <div className="ml-2">
                            <p className="pops font-bold ">{item.title}</p>
                            <p className="orb text-xs">BUDGET: Ghc {item.minimum_pay}, PROPOSALS: {item.proposals}</p>
                            {/* <p className="orb text-xs">PROPOSALS: {item.proposals}</p> */}
                            <div className="flex items-center text-sm font-bold ">
                                <i className="bi bi-geo-alt"></i>
                                <span className=''>{item.location}</span>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    </Search>
  )
}

export default SearchJob
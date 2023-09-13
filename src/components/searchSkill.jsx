import { useState } from 'react';
import { read } from '../databank';
import Search from './search';

// eslint-disable-next-line react/prop-types
const SearchSkill = ({searchCallback = () => {}, ...props}) => {

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

        read.searchSkills(search).then( (response) => {
            // console.log('search_response', response);
            setSearchLoading(false);

            if(response?.data?.status !== 'success')  return false;

            // console.log(response?.data);

            setSearchResult(response?.data);
        })
    }

  return (
    <Search classname="w-full h-[45px] my-3" inputclass="text-sm"  btnclass="text-base w-[45px] btn hover:bg-green-500 flex items-center justify-center" placeholder="search for a skill here..." {...props}  onChange={(e) => {setSearch(e.target.value); handleSearch()}} onClick={handleSearch}>
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
                    <div onClick={() => {searchCallback(item.title); setSearchResult([])}} className="result flex items-center p-1 bg-orange-100 hover:bg-green-100  bg-opacity-30 border-b" key={index}>
                        {/* <img src={(item.image !== '' && item.image !== null)? `${searchResult.image_endpoint}/${item.image}` : "/images/avatar.gif"} className="h-[45px] w-[45px] rounded-full" /> */}
                        <div className="ml-2">
                            <p className="pops font-bold ">{item.title}</p>
                        </div>
                    </div>
                )
            }
        </div>
    </Search>
  )
}

export default SearchSkill
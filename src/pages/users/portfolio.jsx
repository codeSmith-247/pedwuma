import { useState } from 'react';
import EditPortfolio from "./editPortfolio";
import { read } from '../../databank';
import { EmptyBox, Pagination } from '../../components';
import Skeleton from 'react-loading-skeleton';

const Portfolio = () => {

    const { data, isLoading, isError } = read.useSkilledPortfolios();

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


  return (
    <div className="p-12">
        <h2 className="font-bold text-2xl mb-3">My Portfolio</h2>

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

        <EmptyBox load={typeof(data?.data) !== 'undefined' && (typeof(data?.data[0]) == 'undefined' || (data?.data?.length <= 0 && page <= 1)) && !(isLoading || isError) } title="No Items in Portfolio" text="" />
        <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />

        <EditPortfolio id={editId} />

    </div>
  )
}

export default Portfolio
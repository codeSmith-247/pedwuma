/* eslint-disable react/prop-types */


const Pagination = ({classname = "mt-10", pages = 5, page = 1,  handlePage = (page) => console.log(page), props}) => {
    let pagination = [];
    let page_count = pages;
    while(pages > 0) {
        pagination.push(0);
        pages -= 1;
    }

    // if(pages > 1)
  return (
    <div className={`pagination flex items-center justify-center ${classname}`} {...props}>
        <div className="links flex gap-2">
            <div className="link border-x p-2 px-3 hover:bg-green-400 hover:text-white cursor-pointer hover:border-green-500 bg-white rounded-md shadow"  onClick={() => handlePage(page - 1 > 0 ? page - 1 : page)}>
                <i className="bi bi-chevron-left"></i>
            </div>

            {pagination.map((value, index) => 
                <div className="link border-x p-2 px-4 hover:bg-green-400 hover:text-white cursor-pointer hover:border-green-500 bg-white rounded-md shadow" onClick={() => handlePage(index + 1)} key={index}>
                    {index + 1}
                </div>
            )}

            <div className="link border-x p-2 px-3 hover:bg-green-400 hover:text-white cursor-pointer hover:border-green-500 bg-white rounded-md shadow" onClick={() => handlePage(page + 1 < page_count ? page + 1 : page)}>
                <i className="bi bi-chevron-right"></i>
            </div>
        </div>
    </div>
  )
}

export default Pagination
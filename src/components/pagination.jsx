/* eslint-disable react/prop-types */


const Pagination = ({classname = "mt-10", props}) => {
  return (
    <div className={`pagination flex items-center justify-center ${classname}`} {...props}>
        <div className="links flex gap-2">
            <div className="link border-x p-2 px-3 hover:bg-green-400 hover:text-white cursor-pointer hover:border-green-500 bg-white rounded-md shadow">
                <i className="bi bi-chevron-left"></i>
            </div>

            {[0,0,0,0,0].map((value, index) => 
                <div className="link border-x p-2 px-4 hover:bg-green-400 hover:text-white cursor-pointer hover:border-green-500 bg-white rounded-md shadow" key={index}>
                    {index}
                </div>
            )}

            <div className="link border-x p-2 px-3 hover:bg-green-400 hover:text-white cursor-pointer hover:border-green-500 bg-white rounded-md shadow">
                <i className="bi bi-chevron-right"></i>
            </div>
        </div>
    </div>
  )
}

export default Pagination
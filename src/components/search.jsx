/* eslint-disable react/prop-types */

const Search = ({classname, inputclass = 'text-xl', btnnclass, placeholder, props}) => {
  return (
    <div className={`search-box bg-white border-2 border-green-400 rounded-md h-[60px] w-[80%] max-[835px]:w-full shadow-lg flex overflow-hidden ${classname}`} {...props}>
        <input className={`w-full h-full p-5 ring-0 outline-none ${inputclass}`} type="text" placeholder={placeholder} />
        <button className={`bg-green-500 text-white p-5 h-full w-[60px] transform scale-95 rounded-md flex justify-center items-center text-2xl ${btnnclass}`}>
            <i className="bi bi-search "></i>
        </button>
    </div>
  )
}

export default Search
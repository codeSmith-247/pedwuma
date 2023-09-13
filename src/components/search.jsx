/* eslint-disable react/prop-types */

const Search = ({classname, inputclass = 'text-xl', btnclass, placeholder, onChange = () => {}, onClick = () => {}, children, ...props}) => {
  return (
    <div className={`search-box relative bg-white border-2 border-green-400 rounded-md h-[60px] w-[80%] max-[835px]:w-full shadow-lg flex  ${classname}`} {...props}>
        <input className={`w-full h-full p-5 ring-0 border-0 hover:border-0 hover:ring-0 hover:outline-none rounded-md ${inputclass}`} type="text" placeholder={placeholder} onChange={onChange}/>
        <button className={`bg-green-500 border-0 hover:border-0 text-white p-5 h-full w-[60px] transform scale-95 rounded-md flex justify-center items-center text-2xl ${btnclass}`} onClick={onClick}>
            <i className="bi bi-search "></i>
        </button>

        {children}
    </div>
  )
}

export default Search



// eslint-disable-next-line react/prop-types
const SideScroll = ({ children }) => {
  return (
    <div className="w-screen overflow-x-scroll px-2">
        <div className="w-max flex items-center gap-5 text-white  justify-items-center">
            {children}
        </div>
    </div>
  )
}

export default SideScroll
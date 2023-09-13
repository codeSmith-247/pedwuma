

// eslint-disable-next-line react/prop-types
const Loading = ({load = false}) => {
  
  if(load)
    return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-80 " style={{zIndex: 65050}}>
        <span className="loading loading-bars loading-lg text-white"></span>
    </div>
  )
}

export default Loading